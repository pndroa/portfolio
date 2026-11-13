import "@/styles/TrueFocus.css";
import { motion, useReducedMotion, type Transition } from "motion/react";
import {
    Fragment,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type FC,
} from "react";

interface TrueFocusProps {
  text: string;
  easing?: "smooth" | "spring";
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  cornerSize?: number;
  borderWidth?: number;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNERS: Corner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const FRAME_GAP_X = 3;
const FRAME_GAP_Y = 4;
const SMOOTH_EASE = [0.65, 0, 0.35, 1] as const;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TrueFocus: FC<TrueFocusProps> = ({
  text,
  easing = "spring",
  borderColor = "var(--accent-from)",
  glowColor = "transparent",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1.5,
  cornerSize = 10,
  borderWidth = 2,
}) => {
  const parts = text.split(/\*(.+?)\*/);
  const wordCount = Math.floor(parts.length / 2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusRect, setFocusRect] = useState<FocusRect | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : animationDuration;
  const transition: Transition =
    easing === "spring" && !reduceMotion
      ? { type: "spring", visualDuration: duration, bounce: 0.38 }
      : { duration, ease: SMOOTH_EASE };

  useEffect(() => {
    if (wordCount < 2) return;
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % wordCount),
      (animationDuration + pauseBetweenAnimations) * 1000,
    );
    return () => clearInterval(interval);
  }, [wordCount, animationDuration, pauseBetweenAnimations]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const word = wordRefs.current[activeIndex];
    if (!container || !word) return;

    const measure = () => {
      const next = {
        x: word.offsetLeft,
        y: word.offsetTop,
        width: word.offsetWidth,
        height: word.offsetHeight,
      };
      setFocusRect((prev) =>
        prev &&
        prev.x === next.x &&
        prev.y === next.y &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next,
      );
    };

    measure();
    document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [activeIndex, text]);

  const corners: Record<Corner, { x: number; y: number }> | null =
    focusRect && {
      "top-left": {
        x: focusRect.x - FRAME_GAP_X,
        y: focusRect.y - FRAME_GAP_Y,
      },
      "top-right": {
        x: focusRect.x + focusRect.width + FRAME_GAP_X - cornerSize,
        y: focusRect.y - FRAME_GAP_Y,
      },
      "bottom-left": {
        x: focusRect.x - FRAME_GAP_X,
        y: focusRect.y + focusRect.height + FRAME_GAP_Y - cornerSize,
      },
      "bottom-right": {
        x: focusRect.x + focusRect.width + FRAME_GAP_X - cornerSize,
        y: focusRect.y + focusRect.height + FRAME_GAP_Y - cornerSize,
      },
    };

  const frameStyle = {
    "--border-color": borderColor,
    "--glow-color": glowColor,
    "--corner-size": `${cornerSize}px`,
    "--border-width": `${borderWidth}px`,
  } as CSSProperties;

  return (
    <span className="focus-container" ref={containerRef} style={frameStyle}>
      {parts.map((part, index) => {
        if (index % 2 === 0) return <Fragment key={index}>{part}</Fragment>;
        const wordIndex = (index - 1) / 2;
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[wordIndex] = el;
            }}
            className="focus-word gradient-text"
          >
            {part}
          </span>
        );
      })}

      {corners && (
        <span className="focus-frame" aria-hidden="true">
          {CORNERS.map((corner) => (
            <motion.span
              key={corner}
              className={`corner ${corner}`}
              initial={{ ...corners[corner], opacity: 0 }}
              animate={{ ...corners[corner], opacity: 1 }}
              transition={transition}
            />
          ))}
        </span>
      )}
    </span>
  );
};

export default TrueFocus;
