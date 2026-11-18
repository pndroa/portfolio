import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
}

const TimelineSegment = ({ last }: { last: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-17 left-8 w-0.5 -translate-x-1/2 overflow-hidden bg-neutral-700 md:top-49",
        last
          ? "bottom-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
          : "-bottom-11 md:-bottom-43",
      )}
    >
      <motion.div
        style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
        className="absolute inset-0 origin-top bg-linear-to-b from-(--accent-from) to-(--accent-to)"
      />
    </div>
  );
};

const TimelineRing = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <span
      ref={ref}
      className="absolute top-12 left-8 size-4 -translate-x-1/2 rounded-full border-2 border-neutral-500 md:top-44"
    >
      <motion.span
        style={{ opacity: reduceMotion ? 1 : scrollYProgress }}
        className="absolute -inset-0.5 rounded-full border-2 border-(--ring-color) shadow-[0_0_12px_var(--ring-color)] [--ring-color:color-mix(in_srgb,var(--accent-from),var(--accent-to))]"
      />
    </span>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="relative mx-auto w-full max-w-7xl pb-20 font-sans">
      {data.map((item, index) => (
        <div
          key={`${item.period}-${item.role}`}
          className="relative flex justify-start pt-10 md:gap-10 md:pt-40"
        >
          <TimelineRing />

          <TimelineSegment last={index === data.length - 1} />

          <div className="hidden self-start md:block md:w-full md:max-w-xs lg:max-w-sm">
            <p className="pl-20 text-5xl font-bold text-neutral-500">
              {item.period}
            </p>
          </div>

          <div className="relative w-full pr-4 pl-20 md:pl-4">
            <p className="mb-4 block text-2xl font-bold text-neutral-500 md:hidden">
              {item.period}
            </p>
            <h3 className="text-xl font-semibold text-white">{item.role}</h3>
            <p className="mt-1 text-(--accent-from)">{item.company}</p>

            {item.description && (
              <p className="mt-4 text-sm text-neutral-300">
                {item.description}
              </p>
            )}

            {item.bullets && (
              <ul className="mt-4 space-y-2">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm text-neutral-400"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-(--accent-from)" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {item.tags && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-(--accent-from)/40 bg-(--accent-from)/10 px-3 py-1 text-xs text-(--accent-from)"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
