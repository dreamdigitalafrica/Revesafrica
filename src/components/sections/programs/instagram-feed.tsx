"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { FaInstagram } from "react-icons/fa6";

type Post = { id: string; imageUrl: string; permalink: string; caption: string };
const profileUrl = "https://www.instagram.com/revesfoundation/";
const fetchFeed = async (url: string): Promise<{ posts: Post[] }> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Feed unavailable");
  return response.json();
};

export default function InstagramFeed() {
  const { data } = useSWR("/api/instagram", fetchFeed, { refreshInterval: 3600000, revalidateOnFocus: false, shouldRetryOnError: false });
  const posts = data?.posts ?? [];
  const track = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (section.current) observer.observe(section.current);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (paused || hovered || reduced || !visible || posts.length < 2) return;
    const timer = window.setInterval(() => {
      const list = track.current;
      if (!list || document.hidden) return;
      const step = (list.firstElementChild?.getBoundingClientRect().width ?? 0) + 20;
      const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 2;
      list.scrollTo({ left: atEnd ? 0 : list.scrollLeft + step, behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, reduced, visible, posts.length]);

  const move = (direction: number) => {
    setPaused(true);
    const list = track.current;
    if (!list) return;
    const step = (list.firstElementChild?.getBoundingClientRect().width ?? 0) + 20;
    list.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={section} className="reves-instagram reves-work-wrap" aria-labelledby="instagram-heading">
      <div className="reves-instagram-heading">
        <div><p className="reves-work-eyebrow">Follow our journey</p><h2 id="instagram-heading">On Instagram</h2></div>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer"><FaInstagram aria-hidden="true" /> @revesfoundation <span aria-hidden="true">↗</span></a>
      </div>
      {posts.length > 0 && <>
        <ul ref={track} className="reves-instagram-track" aria-label="Recent Instagram posts" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPaused(true)} onTouchStart={() => setPaused(true)}>
          {posts.map(post => <li key={post.id}><a href={post.permalink} target="_blank" rel="noopener noreferrer" aria-label={`${post.caption || "Reves Foundation post"} — view on Instagram`}>
            {/* Instagram serves expiring CDN URLs; load the current URL directly. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.imageUrl} alt={post.caption || "Reves Foundation on Instagram"} width={480} height={480} loading="lazy" referrerPolicy="no-referrer" />
            <span>View on Instagram <span aria-hidden="true">↗</span></span>
          </a></li>)}
        </ul>
        {posts.length > 1 && <div className="reves-instagram-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous Instagram photos">←</button>{!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play Instagram carousel" : "Pause Instagram carousel"}>{paused ? "Play" : "Pause"}</button>}<button type="button" onClick={() => move(1)} aria-label="Next Instagram photos">→</button></div>}
      </>}
    </section>
  );
}
