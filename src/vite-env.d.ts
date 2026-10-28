/// <reference types="vite/client" />

declare module './GlassSurface' {
  import { ReactNode, CSSProperties } from 'react';

  interface GlassSurfaceProps {
    children?: ReactNode;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    borderWidth?: number;
    brightness?: number;
    opacity?: number;
    blur?: number;
    displace?: number;
    backgroundOpacity?: number;
    saturation?: number;
    distortionScale?: number;
    redOffset?: number;
    greenOffset?: number;
    blueOffset?: number;
    xChannel?: 'R' | 'G' | 'B';
    yChannel?: 'R' | 'G' | 'B';
    mixBlendMode?: string;
    refraction?: boolean;
    renderer?: 'auto' | 'svg' | 'webgl';
    backdrop?: any;
    shape?: string;
    className?: string;
    style?: CSSProperties;
  }

  const GlassSurface: React.FC<GlassSurfaceProps>;
  export default GlassSurface;
}

declare module './GlassIcons' {
  import { ReactNode, CSSProperties } from 'react';

  interface GlassIconItem {
    icon: ReactNode;
    color?: string;
    label?: string;
    href?: string;
    target?: string;
    onClick?: () => void;
    id?: string;
    className?: string;
  }

  interface GlassIconsProps {
    items?: GlassIconItem[];
    size?: number;
    gap?: number;
    columns?: number;
    roundness?: number;
    refraction?: number;
    bevel?: number;
    dispersion?: number;
    frost?: number;
    shine?: number;
    tint?: string;
    tintOpacity?: number;
    iconColor?: string;
    plate?: 'tilt' | 'offset' | 'circle' | 'none';
    tilt?: number;
    spread?: number;
    hover?: 'lift' | 'float' | 'press' | 'none';
    parallax?: number;
    labels?: 'hover' | 'always' | 'none';
    intro?: boolean;
    theme?: 'dark' | 'light';
    className?: string;
    style?: CSSProperties;
  }

  const GlassIcons: React.FC<GlassIconsProps>;
  export default GlassIcons;
}