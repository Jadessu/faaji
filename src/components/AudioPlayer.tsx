interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function AudioPlayer({ isPlaying, onToggle }: AudioPlayerProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      className="audio-toggle"
      onClick={handleClick}
      onTouchEnd={handleClick}
      aria-label="Toggle music"
    >
      {isPlaying ? (
        <div className="audio-waves">
          <span className="audio-wave"></span>
          <span className="audio-wave"></span>
          <span className="audio-wave"></span>
        </div>
      ) : (
        <svg
          className="audio-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
}
