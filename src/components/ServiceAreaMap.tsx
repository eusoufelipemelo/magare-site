"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Map as MapLibreMap, Marker, Popup } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/lib/format";

export type Region = { name: string; lat: number; lng: number };

const CENTER: [number, number] = [-47.955, -15.79];

/**
 * Mapa das regiões atendidas (MapLibre + mapa base OpenFreeMap, sem chave de API).
 * Carrega só quando a seção chega perto da tela. A lista ao lado leva o mapa até cada região.
 */
export function ServiceAreaMap({ regions, whatsapp }: { regions: Region[]; whatsapp: string }) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markers = useRef<{ marker: Marker; popup: Popup; el: HTMLElement }[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !box.current) return;
        maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
        const map = new maplibregl.Map({
          container: box.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          center: CENTER,
          zoom: 10.3,
          minZoom: 8,
          maxZoom: 15,
          scrollZoom: false,
          cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
          attributionControl: { compact: true },
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        mapRef.current = map;
        markers.current = regions.map((r, i) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.setAttribute("aria-label", r.name);
          dot.className = "region-dot";
          const popupEl = document.createElement("div");
          const title = document.createElement("p");
          title.className = "region-popup-title";
          title.textContent = r.name;
          const link = document.createElement("a");
          link.href = whatsappUrl(whatsapp, `Olá! Moro em ${r.name} e gostaria de conversar sobre um projeto com a Magare.`) ?? "#";
          link.target = "_blank";
          link.rel = "noopener";
          link.className = "region-popup-link";
          link.textContent = "Conversar sobre um projeto aqui";
          popupEl.append(title, link);
          const popup = new maplibregl.Popup({ offset: 18, closeButton: false }).setDOMContent(popupEl);
          const marker = new maplibregl.Marker({ element: dot }).setLngLat([r.lng, r.lat]).setPopup(popup).addTo(map);
          dot.addEventListener("click", () => setActive(i));
          return { marker, popup, el: dot };
        });
        map.on("load", () => {
          setReady(true);
          const bounds = new maplibregl.LngLatBounds();
          regions.forEach((r) => bounds.extend([r.lng, r.lat]));
          map.fitBounds(bounds, { padding: 70, duration: 0 });
        });
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [regions, whatsapp]);

  useEffect(() => {
    markers.current.forEach((m, i) => m.el.classList.toggle("is-active", i === active));
  }, [active]);

  function focus(i: number) {
    setActive(i);
    const map = mapRef.current;
    const m = markers.current[i];
    if (!map || !m) return;
    markers.current.forEach((o) => o.popup.isOpen() && o.popup.remove());
    map.flyTo({ center: [regions[i].lng, regions[i].lat], zoom: 12.4, speed: 0.9, curve: 1.4, essential: true });
    m.marker.togglePopup();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
      <ul className="order-2 grid grid-cols-2 gap-x-6 self-start border-t border-line lg:order-1 lg:grid-cols-1">
        {regions.map((r, i) => (
          <li key={r.name} className="border-b border-line">
            <button
              type="button"
              onClick={() => focus(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={active === i}
              className={`group flex min-h-14 w-full cursor-pointer items-center justify-between gap-3 text-left font-display text-[1.25rem] transition-colors duration-300 sm:text-[1.4rem] ${
                active === i ? "text-brand" : "text-ink hover:text-brand"
              }`}
            >
              {r.name}
              <span aria-hidden className={`size-2 shrink-0 rounded-full transition-all duration-300 ${active === i ? "scale-100 bg-brand" : "scale-0 bg-brand group-hover:scale-100"}`} />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative order-1 lg:order-2">
        <div ref={box} data-lenis-prevent className="map-canvas h-[380px] w-full overflow-hidden bg-surface-alt sm:h-[480px] lg:h-[600px]" aria-label="Mapa das regiões atendidas pela Magare em Brasília" role="region" />
        {!ready ? <p className="pointer-events-none absolute inset-0 grid place-items-center text-sm text-muted">Carregando o mapa…</p> : null}
      </div>
    </div>
  );
}
