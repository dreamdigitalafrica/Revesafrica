"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const video = videoRef.current;
      if (!video) return;
      if (preference.matches) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <section className="reves-home-hero" aria-labelledby="reves-hero-title">
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="reves-gate" clipPathUnits="objectBoundingBox">
            <path d="M .04 0 H .96 V .07 Q 1 .07 1 .14 V .86 Q 1 .93 .96 .93 V 1 H .04 V .93 Q 0 .93 0 .86 V .14 Q 0 .07 .04 .07 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="reves-hero-stage">
        <video
          ref={videoRef}
          className="reves-hero-video"
          src="/videos/reves-community-hero.mp4"
          poster="/videos/reves-community-hero.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        />
        <div className="reves-hero-shade" aria-hidden="true" />
        <div className="reves-hero-content">
          <h1 id="reves-hero-title">Driving Africa&apos;s sustainable communities.</h1>
        </div>
        <div className="reves-gate-reveal" aria-hidden="true" />
        {!failed && (
          <button
            type="button"
            className="reves-hero-play"
            aria-label={playing ? "Pause background video" : "Play background video"}
            onClick={togglePlayback}
          >
            <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
          </button>
        )}
      </div>
    </section>
  );
}
