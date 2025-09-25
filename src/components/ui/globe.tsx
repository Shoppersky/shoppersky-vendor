"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

interface GlobeConfig {
  pointSize: number;
  globeColor: string;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  polygonColor: string;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;
  initialPosition: { lat: number; lng: number };
  autoRotate: boolean;
  autoRotateSpeed: number;
}

export function World({
  data,
  globeConfig,
}: {
  data: any[];
  globeConfig: GlobeConfig;
}) {
  const globeRef = useRef<any>();

  useEffect(() => {
    if (globeRef.current) {
      // Set initial camera position
      globeRef.current.pointOfView(
        {
          lat: globeConfig.initialPosition.lat,
          lng: globeConfig.initialPosition.lng,
          altitude: 2,
        },
        1000
      );

      // Enable auto-rotate & disable zoom
      const controls = globeRef.current.controls();
      controls.enableZoom = false; // 🔒 disables zoom with scroll
      controls.autoRotate = globeConfig.autoRotate;
      controls.autoRotateSpeed = globeConfig.autoRotateSpeed; // smaller = slower
    }
  }, [globeConfig]);

  return (
    <Globe
      ref={globeRef}
    
      globeImageUrl="https://unpkg.com/three-globe@2.44.0/example/img/earth-night.jpg"
      arcsData={data}
      arcColor={(d: any) => d.color}
      arcDashLength={globeConfig.arcLength}
      arcDashGap={2}
      arcDashAnimateTime={globeConfig.arcTime}
    />
  );
}
