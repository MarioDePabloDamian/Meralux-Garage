export const site = {
  name: "Meralux Garage",
  tagline: "Car Wrapping & PPF Madrid",
  description:
    "Transformación exterior con precisión de taller boutique.",
  phone: "+34 711 20 78 63",
  phoneHref: "tel:+34711207863",
  email: "meraluxgarage@gmail.com",
  address: "C. el Electrodo, 66, Nave 57",
  city: "28522 Rivas-Vaciamadrid, Madrid",
  mapsUrl: "https://maps.app.goo.gl/Mmxtv8D7fw8Y5xFD6",
  instagram: "https://www.instagram.com/meraluxgarage/",
  facebook:
    "https://www.facebook.com/people/Meralux-Garage/61584390060679/",
  rating: 5,
  award: "4.º en World Wrap Masters España 2026",
  hours: [
    { day: "Lunes – Viernes", time: "9:00–14:00 · 16:00–18:30" },
    { day: "Sábado – Domingo", time: "Cerrado" },
  ],
  services: [
    {
      slug: "wrapping-integral",
      title: "Wrapping integral",
      description:
        "Cambio de color completo con acabados mate, satinado, brillo, cromado o carbono.",
      category: "Wrap",
      icon: "layers",
      featured: true,
    },
    {
      slug: "wrapping-parcial",
      title: "Wrapping parcial",
      description:
        "Techo, retrovisores, capó, difusor, franjas y detalles decorativos a medida.",
      category: "Wrap",
      icon: "scissors",
      featured: false,
    },
    {
      slug: "ppf",
      title: "PPF",
      description:
        "Película protectora transparente contra gravilla, arañazos leves y agentes externos.",
      category: "PPF",
      icon: "shield",
      featured: true,
    },
    {
      slug: "custom-color",
      title: "Custom color",
      description:
        "Color y estilo únicos definidos antes de la instalación.",
      category: "Wrap",
      icon: "palette",
      featured: false,
    },
    {
      slug: "vinilado-llantas",
      title: "Vinilado de llantas",
      description: "Personaliza tus llantas con acabado profesional y duradero.",
      category: "Wrap",
      icon: "circle-dot",
      featured: false,
    },
    {
      slug: "tintado-lunas",
      title: "Tintado de lunas",
      description: "Estética y privacidad con acabado uniforme y legal.",
      category: "Detail",
      icon: "sun-medium",
      featured: false,
    },
  ],
  process: [
    {
      step: "01",
      title: "Consulta",
      description: "Planteamos tu idea y te orientamos sobre opciones.",
    },
    {
      step: "02",
      title: "Diseño",
      description: "Definimos color, acabado y alcance del proyecto.",
    },
    {
      step: "03",
      title: "Instalación",
      description: "Preparación, aplicación y acabado con vinilo premium.",
    },
    {
      step: "04",
      title: "Entrega",
      description: "Tu coche transformado, listo para rodar.",
    },
  ],
  reviews: [
    {
      quote:
        "El acabado del vinilo es impecable y cumplieron con los plazos.",
      author: "Cliente verificado",
    },
    {
      quote:
        "Trato excepcional y acabado como de fábrica. Sin duda muy recomendable.",
      author: "Marta Barahona",
    },
    {
      quote:
        "Resultado espectacular en llantas y lunas. Gran atención al detalle.",
      author: "Noelia Arriola García",
    },
    {
      quote:
        "Cambio de color del techo fantástico. Atención y trabajo sobresalientes.",
      author: "Álvaro M.",
    },
  ],
  media: {
    logo: "/logo/meralux-garage.png",
  },
} as const;
