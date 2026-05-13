import Aboutme from "@/component/Aboutme";
import Navbar from "@/component/navbar/navbar";
import Profile from "@/component/Profile";
import Contact from "@/component/Contact";
import Footer from "@/component/Footer";
import Project from "@/component/Project";
import Experience from "@/component/Experience";
import Education from "@/component/Education";
import Certification from "@/component/Certification";
import Stack from "@/component/Stack";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex  justify-center px-4">
        <div className="max-w-2xl mx-auto">
          <Navbar />
          <Profile />
          <section id="about"><Aboutme /></section>
          <section id="work"><Project /></section>
          <section id="skills"><Stack /></section>
          <section id="experience"><Experience /></section>
          <section id="education">
            <Education />
            <Certification />
          </section>
          <section id="contact"><Contact /></section>
          <Footer />
        </div>
      </div>
    </>
  );
}
