/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Interactive3DBackground from './components/Interactive3DBackground';
import MouseTrail from './components/MouseTrail';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#020205] text-[#f3f4f6]">
      {/* Immersive interactive background layer */}
      <Interactive3DBackground />

      {/* Floating interactive cursor trail layer */}
      <MouseTrail />

      {/* Sticky navigation bar */}
      <Navbar />

      {/* Main vertical scrolling layout */}
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

