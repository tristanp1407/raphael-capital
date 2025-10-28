export function OfficeLocationMap() {
  const mapSrc =
    "https://maps.google.com/maps?q=18%20Jacob%E2%80%99s%20Well%20Mews%2C%20London%20W1U%203DR&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius-card)] border border-border-subtle/70 bg-white/95 shadow-sm">
      <div className="relative aspect-[4/3] sm:aspect-[5/3]">
        <iframe
          src={mapSrc}
          title="Raphael Capital office location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
          allowFullScreen
        />
      </div>
      <div className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-rc-navy">
        18 Jacob’s Well Mews, London W1U 3DR
      </div>
    </div>
  );
}

export default OfficeLocationMap;
