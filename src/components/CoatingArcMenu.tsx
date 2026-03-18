"use client";

import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const COATINGS = [
    "MATTE",
    "GLOSSY",
    "METALLIC",
];

const COATING_LABELS: Record<string, string> = {
    "METALLIC": "МЕТАЛЛИК",
    "GLOSSY": "ГЛЯНЕЦ",
    "MATTE": "МАТОВЫЙ",
};

const ARC_RADIUS = 200;
const ARC_OFFSET_X = -320;
const ANGLE_STEP = 20;

interface CoatingArcMenuProps {
    onSelect?: (coating: string) => void;
}

export function CoatingArcMenu({ onSelect }: CoatingArcMenuProps) {
    const [activeIndex, setActiveIndex] = useState(1); // Start with MATTE as center

    // rotation is the global rotation of the entire arc.
    const rotation = useMotionValue(-1 * ANGLE_STEP);

    const handleDragEnd = (event: PointerEvent | MouseEvent | TouchEvent, info: { offset: { x: number, y: number }, velocity: { x: number, y: number } }) => {
        const currentRot = rotation.get();
        const projectedRot = currentRot - info.velocity.y * 0.05;

        let newIndex = Math.round(-projectedRot / ANGLE_STEP);
        newIndex = Math.max(0, Math.min(COATINGS.length - 1, newIndex));

        setActiveIndex(newIndex);
        if (onSelect) onSelect(COATINGS[newIndex]);

        animate(rotation, -newIndex * ANGLE_STEP, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
        });
    };

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        if (onSelect) onSelect(COATINGS[index]);

        animate(rotation, -index * ANGLE_STEP, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
        });
    };

    useEffect(() => {
        if (onSelect) onSelect(COATINGS[activeIndex]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="absolute right-0 top-[50%] -translate-y-1/2 w-full md:w-[70%] h-[70vh] pointer-events-none flex items-center justify-end z-0 overflow-hidden">

            <motion.div
                className="absolute rounded-full border-l border-black/80 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center right-0"
                style={{
                    width: ARC_RADIUS * 2,
                    height: ARC_RADIUS * 2,
                    right: ARC_OFFSET_X,
                }}
            >
                <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-full pointer-events-auto cursor-grab active:cursor-grabbing"
                    style={{ rotate: rotation }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    onDrag={(e, info) => {
                        rotation.set(rotation.get() - info.delta.y * 0.1);
                    }}
                    onDragEnd={handleDragEnd}
                >
                    {COATINGS.map((coating, index) => {
                        const itemAngle = index * ANGLE_STEP;
                        return (
                            <CoatingArcMenuItem
                                key={coating}
                                coating={coating}
                                label={COATING_LABELS[coating]}
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

interface CoatingArcMenuItemProps {
    coating: string;
    label: string;
    itemAngle: number;
    globalRotation: MotionValue<number>;
    isActive: boolean;
    onClick: () => void;
    radius: number;
}

function CoatingArcMenuItem({ coating, label, itemAngle, globalRotation, isActive, onClick, radius }: CoatingArcMenuItemProps) {
    const absoluteAngle = useTransform(globalRotation, (rot: number) => {
        return rot + itemAngle;
    });

    const opacity = 1; // Always fully opaque

    const scale = useTransform(
        absoluteAngle,
        [-ANGLE_STEP, 0, ANGLE_STEP],
        [0.8, 1, 0.8]
    );

    return (
        <div
            className="absolute right-full top-1/2 -translate-y-1/2 flex flex-row-reverse items-center pointer-events-none whitespace-nowrap"
            style={{
                transformOrigin: `calc(100% + ${radius}px) 50%`,
                transform: `rotate(${itemAngle}deg)`,
            }}
        >
            <div
                className={cn(
                    "w-1.5 h-1.5 rounded-full absolute -right-[3px] transition-all duration-300 bg-black dark:bg-black",
                    isActive ? "scale-[1.5]" : "opacity-100"
                )}
            />

            <motion.div
                className="mr-8 pointer-events-auto cursor-pointer flex flex-row-reverse items-center gap-6"
                style={{ opacity, scale, transformOrigin: "right center" }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                <span className={cn(
                    "text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase transition-colors text-black dark:text-black",
                )}>
                    {label}
                </span>
            </motion.div>
        </div>
    );
}
