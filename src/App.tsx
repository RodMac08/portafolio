import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun } from 'lucide-react';
import PillNav from './components/PillNav';
import GradualBlur from './components/GradualBlur';
import TextType from './components/TextType';
import ProjectDial from './components/ProjectDial';
import ProfileSection from './components/ProfileSection';
import logoBlanco from './assets/logo.png';
import logoNegro from './assets/logo claro.png';
import introVideo from './assets/intro.mp4';

const HEADING = { fontFamily: 'Biko, sans-serif' };
const premiumEase = [0.19, 1, 0.22, 1];

const TRANSLATIONS = {
  es: {
    nav: { home: 'Inicio', profile: 'Perfil', projects: 'Proyectos', contact: 'Contacto' },
    intro: ['Ingeniería en Automatización.', 'Rodrigo Macías.'],
    scroll: 'Desliza',
    profile: {
      title: 'Perfil',
      body: 'Desarrollador enfocado en la automatización de procesos. Transformo flujos de trabajo manuales en arquitecturas eficientes utilizando herramientas como Python y plataformas de RPA.'
    },
    projects: { title: 'Proyectos' },
    contact: { title: 'Contacto' }
  },
  en: {
    nav: { home: 'Home', profile: 'Profile', projects: 'Projects', contact: 'Contact' },
    intro: ['Automation Engineering.', 'Rodrigo Macías.'],
    scroll: 'Scroll',
    profile: {
      title: 'Profile',
      body: 'Developer focused on process automation. I transform manual workflows into efficient architectures using tools like Python and RPA platforms.'
    },
    projects: { title: 'Projects' },
    contact: { title: 'Contact' }
  }
};

export default function App() {
  const [videoFinished, setVideoFinished] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    
    // Interceptor global para forzar el smooth scroll en anclas sin romper el snap-y
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href');
        const element = document.querySelector(id!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', id);
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <main
      className={`relative h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory transition-colors duration-1000 selection:bg-zinc-700 selection:text-white ${
        isDark ? 'bg-[#030303] text-[#EDEDED]' : 'bg-[#F9F9F9] text-[#09090B]'
      }`}
    >
      <div className="fixed top-8 left-1/2 z-50 -translate-x-1/2 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          animate={videoFinished ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.2, ease: premiumEase, delay: 0.3 }}
          className="pointer-events-auto"
        >
          <PillNav
            logo={isDark ? logoNegro : logoBlanco}
            logoAlt="Rodrigo Macías"
            logoHref="#inicio"
            items={[
              { label: t.nav.home, href: '#inicio' },
              { label: t.nav.profile, href: '#perfil' },
              { label: t.nav.projects, href: '#proyectos' },
              { label: t.nav.contact, href: '#contacto' },
              { ariaLabel: 'lang', label: lang === 'es' ? 'ES' : 'EN', icon: <Globe size={14} strokeWidth={1.5} /> },
              { ariaLabel: 'theme', label: '', icon: isDark ? <Moon size={14} strokeWidth={1.5} /> : <Sun size={14} strokeWidth={1.5} /> }
            ] as any[]}
            onItemClick={(item: any) => {
              if (item.ariaLabel === 'lang') setLang(lang === 'es' ? 'en' : 'es');
              if (item.ariaLabel === 'theme') setTheme(isDark ? 'light' : 'dark');
            }}
            theme={theme}
            layout="split"
            itemStyle="plain"
            hoverEffect="glide"
            indicator="dot"
            surface="glass"
            bounce={0.5}
            stretch={0.4}
            intro={false}
          />
        </motion.div>
      </div>

      <section id="inicio" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden snap-center">
        <video
          src={introVideo}
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoFinished(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <motion.div
          className={`absolute inset-0 backdrop-blur-sm ${isDark ? 'bg-[#030303]/50' : 'bg-[#F9F9F9]/50'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoFinished ? 1 : 0 }}
          transition={{ duration: 2, ease: premiumEase }}
        />

        <div className="relative z-10 text-center px-6 flex flex-col items-center h-[120px] justify-center">
          {videoFinished && (
            <TextType
              key={lang}
              text={t.intro}
              typingSpeed={70}
              deletingSpeed={45}
              pauseDuration={1800}
              deleteMode="backspace"
              typeEffect="blur"
              cursorStyle="bar"
              cursorGlide
              showCursor
              loop={false}
              className="text-5xl md:text-7xl font-light tracking-tight"
              style={HEADING}
            />
          )}
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 40 }}
        transition={{ duration: 1.5, ease: premiumEase, delay: 0.8 }}
        className="relative z-10"
      >
        <ProfileSection 
          isDark={isDark} 
          title={t.profile.title} 
          body={t.profile.body} 
          headingStyle={HEADING} 
        />

        <section id="proyectos" className="w-full h-screen relative snap-center overflow-hidden">
          
          {/* Título pegado absolutamente al fondo derecho */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center opacity-20 pointer-events-none select-none mix-blend-difference z-0">
            <h2 
              className="text-[60px] md:text-[90px] font-thin tracking-[0.1em] uppercase whitespace-nowrap" 
              style={{ ...HEADING, writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {t.projects.title}
            </h2>
          </div>

          <ProjectDial isDark={isDark} />
        </section>

        <section id="contacto" className="flex h-screen flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto snap-center">
          <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12" style={HEADING}>
            {t.contact.title}
          </h2>
          <a
            href="mailto:tu@correo.com"
            className={`w-fit text-2xl font-light tracking-tight underline underline-offset-8 transition-all duration-700 ${
              isDark
                ? 'text-zinc-400 decoration-white/20 hover:text-white hover:decoration-white/60'
                : 'text-zinc-600 decoration-black/20 hover:text-black hover:decoration-black/60'
            }`}
          >
            tu@correo.com
          </a>
        </section>
      </motion.div>

      <div className="fixed top-0 left-0 right-0 pointer-events-none z-40">
        <GradualBlur position="top" target="page" height="8rem" strength={3} layers={8} curve="ease-in-out" tint={isDark ? "rgba(3, 3, 3, 0.95)" : "rgba(249, 249, 249, 0.95)"} autoHide={false} zIndex={40} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-40">
        <GradualBlur position="bottom" target="page" height="4rem" strength={3} layers={8} curve="ease-in-out" tint={isDark ? "rgba(3, 3, 3, 1)" : "rgba(249, 249, 249, 1)"} autoHide={false} zIndex={40} />
      </div>
    </main>
  );
}