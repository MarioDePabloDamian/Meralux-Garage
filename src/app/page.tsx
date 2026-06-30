import { Suspense } from "react";
import { MeraluxHome } from "./_components/cinematic/MeraluxHome";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <MeraluxHome />
    </Suspense>
  );
}
