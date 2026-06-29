"""
Parchea el GLB original sin reexportar geometría:
- Pintura y phong1: baseColorFactor en JSON
- Texturas amarillas (Image_5, Image_6, Image_47): hue-shift y reemplazo en buffer
"""
import colorsys
import json
import os
import struct
import sys
import zlib

try:
    import bpy
except ImportError:
    print("Run with Blender: blender --background --python scripts/blender-patch-glb-purple.py")
    sys.exit(1)

SRC = r"C:\Users\mario\Downloads\2025_chevrolet_corvette_zr1.glb"
OUT = r"C:\Users\mario\Documents\GitHub\Meralux Garage\public\models\hero-car.glb"
TMP_DIR = r"C:\Users\mario\Documents\GitHub\Meralux Garage\scripts\.glb-patch-tmp"

BODY = (0.52, 0.02, 0.92, 1.0)
CALIPER = (0.68, 0.08, 0.98, 1.0)
YELLOW_IMAGE_NAMES = {"Image_5", "Image_6", "Image_47"}


def is_yellow_rgb(r, g, b):
    h, s, v = colorsys.rgb_to_hsv(r, g, b)
    return s >= 0.12 and 0.05 <= h <= 0.18 and v > 0.08


def hue_shift_image(img, hue_delta=0.58):
    if img is None or img.size[0] == 0:
        return 0
    px = list(img.pixels)
    changed = 0
    for i in range(0, len(px), 4):
        r, g, b, a = px[i], px[i + 1], px[i + 2], px[i + 3]
        if a < 0.02 or not is_yellow_rgb(r, g, b):
            continue
        h, s, v = colorsys.rgb_to_hsv(r, g, b)
        h = (h + hue_delta) % 1.0
        s = min(1.0, s * 1.08)
        nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
        px[i : i + 4] = [nr, ng, nb, a]
        changed += 1
    if changed:
        img.pixels[:] = px
        img.update()
    return changed


def set_solid(mat, rgba):
    if not mat.use_nodes:
        mat.use_nodes = True
    bsdf = next((n for n in mat.node_tree.nodes if n.type == "BSDF_PRINCIPLED"), None)
    if not bsdf:
        return False
    base = bsdf.inputs.get("Base Color")
    if base is None:
        return False
    if base.is_linked:
        for link in list(base.links):
            mat.node_tree.links.remove(link)
    base.default_value = rgba
    return True


# --- 1) Blender: procesar texturas y guardar PNG parcheados ---
os.makedirs(TMP_DIR, exist_ok=True)
bpy.ops.wm.read_homefile(use_empty=True, use_factory_startup=True)
for block in (bpy.data.objects, bpy.data.meshes, bpy.data.materials, bpy.data.images):
    for item in list(block):
        block.remove(item, do_unlink=True)

bpy.ops.import_scene.gltf(filepath=SRC)

for mat in bpy.data.materials:
    low = mat.name.lower()
    if "paint_material" in low:
        set_solid(mat, BODY)
    elif "phong1" in low:
        set_solid(mat, CALIPER)

patched_pngs = {}
patches_applied = []
for img in bpy.data.images:
    if img.name not in YELLOW_IMAGE_NAMES:
        continue
    n = hue_shift_image(img)
    if n == 0:
        continue
    out_path = os.path.join(TMP_DIR, f"{img.name}.png")
    img.file_format = "PNG"
    img.save(filepath=out_path)
    patched_pngs[img.name] = out_path
    print(f"Patched {img.name}: {n} pixels -> {out_path}")

# --- 2) Leer GLB original y parchear JSON + buffers ---
with open(SRC, "rb") as f:
    data = bytearray(f.read())

json_len = struct.unpack_from("<I", data, 12)[0]
json_start = 20
gltf = json.loads(data[json_start : json_start + json_len].decode("utf8"))
bin_start = json_start + json_len
bin_chunk_header = 8
bin_data = bytearray(data[bin_start + bin_chunk_header :])

# Pintura y pinzas en JSON
for mat in gltf.get("materials", []):
    name = mat.get("name", "")
    low = name.lower()
    pbr = mat.setdefault("pbrMetallicRoughness", {})
    if "paint_material" in low:
        pbr["baseColorFactor"] = list(BODY)
        pbr.pop("baseColorTexture", None)
    elif "phong1" in low:
        pbr["baseColorFactor"] = list(CALIPER)
        pbr.pop("baseColorTexture", None)

# Mapear image index -> nombre (import order matches Image_N)
image_index_to_name = {}
for i, img_def in enumerate(gltf.get("images", [])):
    image_index_to_name[i] = f"Image_{i}"

# Reemplazar buffers PNG parcheados (rebuild si cambia el tamaño)
view_replacements = {}
for img_idx, img_def in enumerate(gltf.get("images", [])):
    img_name = f"Image_{img_idx}"
    if img_name not in patched_pngs:
        continue
    with open(patched_pngs[img_name], "rb") as pf:
        new_png = pf.read()
    bv_idx = img_def.get("bufferView")
    if bv_idx is None:
        continue
    view_replacements[bv_idx] = new_png
    patches_applied.append(img_name)


def rebuild_bin_chunk(gltf, bin_data, view_replacements):
    new_bin = bytearray()
    new_views = []
    for i, bv in enumerate(gltf["bufferViews"]):
        if i in view_replacements:
            chunk = view_replacements[i]
        else:
            start = bv.get("byteOffset", 0)
            end = start + bv["byteLength"]
            chunk = bytes(bin_data[start:end])
        offset = len(new_bin)
        new_bin.extend(chunk)
        pad = (4 - (len(chunk) % 4)) % 4
        new_bin.extend(b"\x00" * pad)
        new_views.append(
            {"buffer": bv.get("buffer", 0), "byteOffset": offset, "byteLength": len(chunk)}
        )
    gltf["bufferViews"] = new_views
    gltf["buffers"][0]["byteLength"] = len(new_bin)
    return new_bin


if view_replacements:
    bin_data = rebuild_bin_chunk(gltf, bin_data, view_replacements)

new_json = json.dumps(gltf, separators=(",", ":")).encode("utf8")
json_pad = (4 - (len(new_json) % 4)) % 4
new_json_padded = new_json + b" " * json_pad

bin_pad = (4 - (len(bin_data) % 4)) % 4
bin_data_padded = bin_data + b"\x00" * bin_pad

total_len = 12 + 8 + len(new_json_padded) + 8 + len(bin_data_padded)
out_buf = bytearray(total_len)
o = 0
struct.pack_into("<I", out_buf, o, 0x46546C67)
o += 4
struct.pack_into("<I", out_buf, o, 2)
o += 4
struct.pack_into("<I", out_buf, o, total_len)
o += 4
struct.pack_into("<I", out_buf, o, len(new_json_padded))
o += 4
struct.pack_into("<I", out_buf, o, 0x4E4F534A)
o += 4
out_buf[o : o + len(new_json_padded)] = new_json_padded
o += len(new_json_padded)
struct.pack_into("<I", out_buf, o, len(bin_data_padded))
o += 4
struct.pack_into("<I", out_buf, o, 0x004E4942)
o += 4
out_buf[o : o + len(bin_data_padded)] = bin_data_padded

with open(OUT, "wb") as f:
    f.write(out_buf)

print("JSON patched: Paint + phong1")
print("Texture patches:", patches_applied)
print(f"Output: {OUT} ({len(out_buf)} bytes), source: {os.path.getsize(SRC)} bytes")
