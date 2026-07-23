import { useCallback, useEffect, useRef, useState } from 'react';

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  alt?: string;
};

export default function BeforeAfterSlider({ before, after, alt = '' }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const draggingRef = useRef(false);

  const setPositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return;
      setPositionFromClientX(event.clientX);
    };

    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [setPositionFromClientX]);

  return (
    <div
      className="before-after"
      ref={containerRef}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        draggingRef.current = true;
        setPositionFromClientX(event.clientX);
      }}
    >
      <img src={before} loading="lazy" alt={alt} className="before-after__image before-after__before" />
      <div className="before-after__after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={after} loading="lazy" alt={alt} className="before-after__image" />
      </div>
      <div
        className="before-after__handle"
        style={{ left: `${position}%` }}
        onPointerDown={(event) => {
          event.stopPropagation();
          if (event.button !== 0) return;
          draggingRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') setPosition((value) => Math.max(0, value - 2));
          if (event.key === 'ArrowRight') setPosition((value) => Math.min(100, value + 2));
        }}
      />
    </div>
  );
}
