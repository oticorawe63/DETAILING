"use client";

import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const BRANDS = [
  "MERCEDES",
  "BMW",
  "AUDI",
  "PORSCHE",
  "LEXUS",
  "TESLA",
  "VOLVO",
  "JAGUAR",
  "BENTLEY",
  "FERRARI"
];

// Configuration
const ARC_RADIUS = 1000; // Size of the circular arc (radius)
const ARC_OFFSET_X = -1700; // How far left the container is
const ANGLE_STEP = 10; // Degrees between each item

interface ArcMenuProps {
  onSelect?: (brand: string) => void;
}

export function ArcMenu({ onSelect }: ArcMenuProps) {
  const [activeIndex, setActiveIndex] = useState(3); // Start with PORSCHE as center

  // rotation is the global rotation of the entire arc.
  const rotation = useMotionValue(-3 * ANGLE_STEP);

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
    <div className="absolute left-0 top-[50%] -translate-y-1/2 w-[400px] h-[800px] pointer-events-none flex items-center z-0 overflow-hidden md:overflow-visible">

      <motion.div
        className="absolute rounded-full border-r border-slate-200 dark:border-slate-800 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center"
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
    [-ANGLE_STEP * 3, 0, ANGLE_STEP * 3],
    [0.1, 1, 0.1]
  );

  const scale = useTransform(
    absoluteAngle,
    [-ANGLE_STEP * 1.5, 0, ANGLE_STEP * 1.5],
    [0.4, 1, 0.4]
  );

  return (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
      style={{
        transformOrigin: `-${radius - 20}px 50%`,
        transform: `rotate(${itemAngle}deg)`,
      }}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full absolute -left-[5px] transition-all duration-300",
          isActive ? "bg-slate-900 dark:bg-white scale-[1.5]" : "bg-slate-400 dark:bg-slate-600"
        )}
      />

      <motion.div
        className="ml-10 pointer-events-auto cursor-pointer"
        style={{ opacity, scale, transformOrigin: "left center" }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <span
          className={cn(
            "text-5xl md:text-6xl lg:text-[4.5rem] font-black uppercase transition-colors duration-300 tracking-tighter leading-none",
            isActive
              ? "text-slate-900 dark:text-white"
              : "text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500"
          )}
        >
          {brand}
        </span>
      </motion.div>
    </div>
  );
}
