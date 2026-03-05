"use client";

import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BRANDS = [
  "AUDI",
  "MERCEDES",
  "BMW",
  "PORSCHE",
  "TOYOTA",
];

const LOGOS: Record<string, string> = {
  "AUDI": "/logos/audi-logo.png",
  "MERCEDES": "/logos/mercedes-logo.png",
  "BMW": "/logos/bmw-logo.png",
  "PORSCHE": "/logos/porsche-logo.png",
  "TOYOTA": "/logos/toyota-logo.png",
};

// Configuration
const ARC_RADIUS = 200; // Size of the circular arc (radius)
const ARC_OFFSET_X = -320; // How far left the container is
const ANGLE_STEP = 20; // Degrees between each item

interface ArcMenuProps {
  onSelect?: (brand: string) => void;
}

export function ArcMenu({ onSelect }: ArcMenuProps) {
  const [activeIndex, setActiveIndex] = useState(2); // Start with BMW as center

  // rotation is the global rotation of the entire arc.
  const rotation = useMotionValue(-2 * ANGLE_STEP);

  const handleDragEnd = (event: PointerEvent | MouseEvent | TouchEvent, info: { offset: { x: number, y: number }, velocity: { x: number, y: number } }) => {
    const currentRot = rotation.get();
    const projectedRot = currentRot + info.velocity.y * 0.05;

    let newIndex = Math.round(-projectedRot / ANGLE_STEP);
    newIndex = Math.max(0, Math.min(BRANDS.length - 1, newIndex));

    setActiveIndex(newIndex);
    if (onSelect) onSelect(BRANDS[newIndex]);

    animate(rotation, -newIndex * ANGLE_STEP, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1
    });
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) onSelect(BRANDS[index]);

    animate(rotation, -index * ANGLE_STEP, {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 1
    });
  };

  useEffect(() => {
    if (onSelect) onSelect(BRANDS[activeIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute left-0 top-[50%] -translate-y-1/2 w-full md:w-[70%] h-[70vh] pointer-events-none flex items-center z-0 overflow-hidden">

      <motion.div
        className="absolute rounded-full border-r border-slate-200 dark:border-slate-800 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center left-0"
        style={{
          width: ARC_RADIUS * 2,
          height: ARC_RADIUS * 2,
          left: ARC_OFFSET_X,
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-full pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{ rotate: rotation }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onDrag={(e, info) => {
            rotation.set(rotation.get() + info.delta.y * 0.1);
          }}
          onDragEnd={handleDragEnd}
        >
          {BRANDS.map((brand, index) => {
            const itemAngle = index * ANGLE_STEP;
            return (
              <ArcMenuItem
                key={brand}
                brand={brand}
                itemAngle={itemAngle}
                globalRotation={rotation}
                isActive={index === activeIndex}
                onClick={() => handleItemClick(index)}
                radius={ARC_RADIUS}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

interface ArcMenuItemProps {
  brand: string;
  itemAngle: number;
  globalRotation: MotionValue<number>;
  isActive: boolean;
  onClick: () => void;
  radius: number;
}

function ArcMenuItem({ brand, itemAngle, globalRotation, isActive, onClick, radius }: ArcMenuItemProps) {
  const absoluteAngle = useTransform(globalRotation, (rot: number) => {
    return rot + itemAngle;
  });

  const opacity = useTransform(
    absoluteAngle,
    [-ANGLE_STEP * 2.5, 0, ANGLE_STEP * 2.5],
    [0.0, 1, 0.0]
  );

  const scale = useTransform(
    absoluteAngle,
    [-ANGLE_STEP, 0, ANGLE_STEP],
    [0.8, 1, 0.8]
  );

  return (
    <div
      className="absolute left-full top-1/2 -translate-y-1/2 flex items-center pointer-events-none whitespace-nowrap"
      style={{
        transformOrigin: `-${radius + 0}px 50%`,
        transform: `rotate(${itemAngle}deg)`,
      }}
    >
      <div
        className={cn(
          "w-1.5 h-1.5 rounded-full absolute -left-[3px] transition-all duration-300",
          isActive ? "bg-slate-900 dark:bg-black scale-[1.5]" : "bg-slate-400 dark:bg-slate-600"
        )}
      />

      <motion.div
        className="ml-8 pointer-events-auto cursor-pointer flex items-center gap-6"
        style={{ opacity, scale, transformOrigin: "left center" }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {LOGOS[brand] && (
          <div className="relative w-6 h-6 md:w-11 md:h-11 flex-shrink-0">
            <Image
              src={LOGOS[brand]}
              alt={`${brand} logo`}
              fill
              className={cn(
                "object-contain transition-all duration-300 drop-shadow-md",
                !isActive && "grayscale opacity-50"
              )}
            />
          </div>
        )}

      </motion.div>
    </div>
  );
}
