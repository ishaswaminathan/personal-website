import dynamic from "next/dynamic";
import Intro from "@/components/ui/Intro";
import Hero from "@/components/sections/Hero";
import NameSignature from "@/components/sections/NameSignature";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";

// Below-the-fold, interaction-heavy sections ship as separate chunks (still server-rendered for SEO)
const Constellation = dynamic(() => import("@/components/sections/Constellation"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Leadership = dynamic(() => import("@/components/sections/Leadership"));
const Education = dynamic(() => import("@/components/sections/Education"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Intro />
      <main id="main">
        <Hero />
        <NameSignature />
        <About />
        <Experience />
        <Projects />
        <Constellation />
        <Skills />
        <Leadership />
        <Education />
        <Contact />
      </main>
    </>
  );
}
