interface FlyerCardProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
}

export function FlyerCard({ imageSrc, imageAlt, children }: FlyerCardProps) {
  return (
    <div className="flyer-frame">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="flyer-image"
        loading="eager"
        decoding="async"
        width="380"
        height="475"
      />
      {children}
    </div>
  );
}
