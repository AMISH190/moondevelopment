import siteBg from "@/assets/site-bg.mp4.asset.json";

/**
 * Fixed full-viewport 3D-looking video background.
 * Sits behind every page. Calm, dark, low-motion so foreground stays readable.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none"
    >
      <video
        src={siteBg.url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      {/* Legibility overlay: darkens + tints toward background, fades content edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/85" />
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
}
