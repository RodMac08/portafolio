import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate, useTransform, AnimatePresence } from 'framer-motion';
import { Code, Server, BarChart, Settings } from 'lucide-react';

import tickSound from '../assets/tick2.mp3';

const PROJECTS = [
  {
    id: 'rpa',
    title: 'RPA & Bots Empresariales',
    tech: 'AUTOMATION ANYWHERE · SAP · GRAPH API',
    desc: 'Desarrollo de bots integrando sistemas corporativos para ingesta automatizada de correos y procesos de RH en tiempo récord.',
    icon: <Settings size={22} strokeWidth={1.5} />
  },
  {
    id: 'oci',
    title: 'Infraestructura en OCI',
    tech: 'ORACLE CLOUD · LOAD BALANCERS · LINUX',
    desc: 'Despliegue de aplicación en servidores Oracle Cloud con balanceador de carga público garantizando tolerancia a fallos y alta disponibilidad.',
    icon: <Server size={22} strokeWidth={1.5} />
  },
  {
    id: 'python',
    title: 'Tracking de Calibración',
    tech: 'PYTHON · PANDAS · POWER BI',
    desc: 'Scripting para automatizar el procesamiento de hojas de Excel masivas y generación de notificaciones departamentales de equipos.',
    icon: <BarChart size={22} strokeWidth={1.5} />
  },
  {
    id: 'logic',
    title: 'Resolución de Negocio',
    tech: 'ANÁLISIS · LOGÍSTICA · OPTIMIZACIÓN',
    desc: 'Optimización de flujos operativos y resolución de problemas logísticos mediante desarrollo de software a medida en Ganadería Revuelta.',
    icon: <Code size={22} strokeWidth={1.5} />
  }
];

const premiumEase = [0.19, 1, 0.22, 1];

function DialIcon({ rotation, angle, icon, isActive, isDark }: any) {
  const counterRotation = useTransform(rotation, r => -r - angle);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8"
      style={{ transform: `rotate(${angle}deg) translateX(300px)` }}
    >
      <motion.div
        style={{ rotate: counterRotation }}
        className={`w-full h-full rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isActive
            ? (isDark
                ? 'bg-white/10 border-white/60 text-white'
                : 'bg-black/5 border-black/40 text-black')
            : (isDark
                ? 'bg-transparent border-white/10 text-white/30'
                : 'bg-transparent border-black/10 text-black/35')
        }`}
      >
        {icon}
      </motion.div>
    </div>
  );
}

export default function ProjectDial({ isDark }: { isDark: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rotation = useMotionValue(0);
  const step = 360 / PROJECTS.length;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTickIndex = useRef(0);

  useEffect(() => {
    audioRef.current = new Audio(tickSound);
    audioRef.current.volume = 0.35;
  }, []);

  useEffect(() => {
    const unsubscribe = rotation.on("change", (latest) => {
      const normalized = ((latest % 360) + 360) % 360;
      const currentStepIndex = Math.round(normalized / step);

      if (currentStepIndex !== lastTickIndex.current) {
        lastTickIndex.current = currentStepIndex;
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }
    });
    return () => unsubscribe();
  }, [rotation, step]);

  const handlePan = (_: any, info: any) => {
    rotation.set(rotation.get() + info.delta.y * 0.4);
  };

  const handlePanEnd = (_: any, info: any) => {
    const velocity = info.velocity.y;
    const target = rotation.get() + velocity * 0.1;
    const nearestStep = Math.round(target / step) * step;

    animate(rotation, nearestStep, {
      type: "spring",
      stiffness: 80,
      damping: 25,
      onUpdate: (latest) => {
        const normalized = ((latest % 360) + 360) % 360;
        let idx = Math.round(normalized / step);
        if (idx === PROJECTS.length) idx = 0;
        const realIdx = idx === 0 ? 0 : PROJECTS.length - idx;
        setActiveIndex(realIdx);
      }
    });
  };

  return (
    <div className="relative w-full h-[100vh] flex items-center transition-colors duration-1000">
      
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
        isDark ? 'bg-[radial-gradient(circle_at_0%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_0%_50%,rgba(0,0,0,0.02)_0%,transparent_50%)]'
      }`} />

      <motion.div
        className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] cursor-grab active:cursor-grabbing z-20 touch-none"
        style={{ rotate: rotation }}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        <svg viewBox="0 0 800 800" className="w-full h-full pointer-events-none opacity-85 transition-colors duration-1000">
          <circle cx="400" cy="400" r="300" stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"} strokeWidth="60" fill="none" />
          <circle cx="400" cy="400" r="270" stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"} strokeWidth="10" strokeDasharray="2 12" fill="none" />
          <circle cx="400" cy="400" r="270" stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"} strokeWidth="20" strokeDasharray="4 80" fill="none" />
        </svg>

        {PROJECTS.map((proj, i) => (
          <DialIcon key={proj.id} rotation={rotation} angle={i * step} icon={proj.icon} isActive={i === activeIndex} isDark={isDark} />
        ))}
      </motion.div>

      {/* Indicador de Desliza: Desplazado a la derecha (360px) para librar el radio del dial */}
      <div className={`absolute bottom-24 md:bottom-32 left-[320px] md:left-[360px] z-10 flex items-center gap-3 pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-40'}`}>
        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isDark ? 'border-white/50' : 'border-black/50'}`}>
          <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
        </div>
        <span className={`text-[10px] uppercase tracking-[0.2em] font-mono ${isDark ? 'text-white' : 'text-black'}`}>Desliza</span>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 flex items-center justify-end h-full relative z-10 pointer-events-none">
        <div className="w-full md:w-[65%] relative flex flex-col justify-center">
          
          {/* NÚMERO GIGANTE: Mayor opacidad (0.25) para destacar más el contorno */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-0 -mr-12 text-[240px] font-thin tracking-tighter pointer-events-none select-none transition-all duration-1000 z-0"
            style={{
              WebkitTextStroke: isDark ? '2px rgba(255,255,255,0.25)' : '2px rgba(0,0,0,0.25)', 
              color: 'transparent',
              fontFamily: 'Biko, sans-serif'
            }}
          >
            0{activeIndex + 1}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(12px)' }}
              transition={{ duration: 0.8, ease: premiumEase }}
              className="relative z-10"
            >
              <p className={`text-[10px] md:text-xs mb-6 uppercase tracking-[0.2em] transition-colors duration-1000 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {PROJECTS[activeIndex].tech}
              </p>
              
              <h3 className={`text-4xl md:text-6xl font-light tracking-tight mb-8 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'Biko, sans-serif' }}>
                {PROJECTS[activeIndex].title}
              </h3>

              <p className={`text-lg md:text-xl font-light leading-relaxed max-w-lg transition-colors duration-1000 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                {PROJECTS[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}