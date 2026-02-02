interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function CTAButton({ href, children, className = '' }: CTAButtonProps) {
  return (
    <a href={href} className={`cta-button ${className}`}>
      {children}
      <svg
        className="cta-arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12,5 19,12 12,19" />
      </svg>
    </a>
  );
}
