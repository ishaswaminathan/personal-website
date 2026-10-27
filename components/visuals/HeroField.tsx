"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * "Data terrain": a field of points rolling like a slow wave, lit in the
 * brand gradient. The pointer pulls a soft ripple through the field and
 * gently steers the camera. Loaded lazily; skipped entirely for reduced motion.
 */
export default function HeroField() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf5efe3, 0.05);
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.set(0, 3.2, 9);
    camera.lookAt(0, 0, -2);

    const COLS = small ? 70 : 140;
    const ROWS = small ? 40 : 70;
    const SPACING = 0.32;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 2);
    const colors = new Float32Array(count * 3);
    const cA = new THREE.Color("#5b7a3a");
    const cB = new THREE.Color("#9cae81");
    const cC = new THREE.Color("#c99a3a");
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = (i % COLS) - COLS / 2;
      const z = Math.floor(i / COLS) - ROWS + 6;
      base[i * 2] = x * SPACING;
      base[i * 2 + 1] = z * SPACING;
      positions[i * 3] = x * SPACING;
      positions[i * 3 + 2] = z * SPACING;
      const t = (i % COLS) / COLS;
      tmp.copy(cA).lerp(t < 0.5 ? cB : cC, t < 0.5 ? t * 2 : (t - 0.5) * 2);
      colors.set([tmp.r, tmp.g, tmp.b], i * 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Round, soft-edged sprite
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);

    const mat = new THREE.PointsMaterial({
      size: small ? 0.09 : 0.075,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Pointer → world point on the ground plane for the ripple
    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3(999, 0, 999);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let raf = 0;
    const clock = new THREE.Clock();
    const pos = geo.attributes.position as THREE.BufferAttribute;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime() * 0.55;
      pointer.lerp(target, 0.06);
      ray.setFromCamera(pointer, camera);
      ray.ray.intersectPlane(plane, hit);

      for (let i = 0; i < count; i++) {
        const x = base[i * 2];
        const z = base[i * 2 + 1];
        let y = Math.sin(x * 0.35 + t) * 0.45 + Math.cos(z * 0.3 + t * 0.8) * 0.4 + Math.sin((x + z) * 0.15 + t * 0.5) * 0.3;
        const dx = x - hit.x;
        const dz = z - hit.z;
        const d = Math.sqrt(dx * dx + dz * dz);
        if (d < 4) y += Math.cos(d * 2.2 - t * 5) * (1 - d / 4) * 0.45;
        pos.array[i * 3 + 1] = y;
      }
      pos.needsUpdate = true;

      camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (3.2 + pointer.y * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -2);
      renderer.render(scene, camera);
    };

    frame();
    if (reduced) cancelAnimationFrame(raf); // a single still frame

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      sprite.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="absolute inset-0" aria-hidden />;
}
