import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Importa tus imágenes directamente desde assets
import bgImage from '../assets/paisaje.png';
import portraitImage from '../assets/sujeto.png';

const premiumEase = [0.19, 1, 0.22, 1];

interface ProfileSectionProps {
  isDark: boolean;
  title: string;
  body: string;
  headingStyle: React.CSSProperties;
}

export default function ProfileSection({ isDark, title, body, headingStyle }: ProfileSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Velocidades del Parallax ajustadas matemáticamente para evitar cortes
  const yBackground = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yCard = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={sectionRef} id="perfil" className="relative flex h-screen w-full items-center justify-center overflow-hidden snap-center">
      
      {/* ==========================================
          CAPA 0: PAISAJE (Fondo Parallax sin filtro)
          ========================================== */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-x-0 w-full h-[120vh] -top-[10vh] z-0 pointer-events-none"
      >
        <img 
          src={bgImage} 
          alt="Paisaje de fondo" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ==========================================
          CAPA 1: TIPOGRAFÍA (Atrapada detrás)
          ========================================== */}
      <motion.div 
        style={{ y: yText }}
        className="absolute left-6 md:left-12 top-[15%] z-20 pointer-events-none select-none"
      >
        <h2 className={`text-[90px] md:text-[180px] font-thin tracking-tighter leading-[0.8] transition-colors duration-1000 ${
          isDark ? 'text-white/30' : 'text-black/20'
        }`} style={headingStyle}>
          RODRIGO<br/>MACÍAS.
        </h2>
      </motion.div>

      {/* ==========================================
          CAPA 2: TARJETA UI (Cristal redondeado, detrás de ti)
          ========================================== */}
      <motion.div
        style={{ y: yCard }}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: premiumEase, delay: 0.2 }}
        viewport={{ once: false, amount: 0.4 }}
        className="absolute left-6 md:left-24 bottom-24 md:bottom-1/4 z-30 max-w-lg md:max-w-xl"
      >
        <div className={`p-8 md:p-12 backdrop-blur-2xl rounded-3xl border transition-colors duration-1000 ${
          isDark ? 'bg-[#030303]/40 border-white/10' : 'bg-[#F9F9F9]/50 border-black/10'
        }`}>
          <h3 className={`text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6 font-mono transition-colors duration-1000 ${
            isDark ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            {title}
          </h3>
          
          <p className={`text-xl md:text-2xl font-light leading-relaxed transition-colors duration-1000 ${
            isDark ? 'text-zinc-200' : 'text-zinc-800'
          }`}>
            {body}
          </p>
        </div>
      </motion.div>

      {/* ==========================================
          CAPA 3: RETRATO (Tú al frente de todo)
          ========================================== */}
      <motion.div
        style={{ y: yPortrait }}
        className="absolute bottom-0 right-0 md:right-12 w-full md:w-auto h-[65vh] md:h-[90vh] z-40 pointer-events-none flex items-end justify-end md:justify-center origin-bottom"
      >
        <div className="relative w-full md:w-auto h-full flex items-end justify-end md:justify-center">
          <img 
            src={portraitImage} 
            alt="Rodrigo Macías" 
            className="h-full w-auto object-contain object-bottom md:object-right-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
          />
        </div>
      </motion.div>

    </section>
  );
}