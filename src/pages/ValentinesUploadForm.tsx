import ValentinesParticles from "../components/particles/ValentinesDayParticlesBackground";
import ValentinesUpload from "../components/valentines/ValentinesUpload";

export default function ValentinesUploadForm() {
return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col items-center">
      <h1 className="text-4xl font-bold z-10 font-gakruli my-10">შექმენი კოლაჟი</h1>
      <div className="absolute inset-0 animate-anime"></div>
      <div className="absolute inset-0 z-0">
        <ValentinesParticles />
      </div>
      <ValentinesUpload />
    </main>
  );
}
