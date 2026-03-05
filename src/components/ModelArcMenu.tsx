"use client";

import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const MODELS_DATA: Record<string, string[]> = {
    "AUDI": ["A5", "A7", "TT", "R8", "Q7"],
    "MERCEDES": ["GLE Coupe", "G-Class", "AMG GT", "C-Class", "S-Class"],
    "BMW": ["X6", "X5", "M5", "M4", "M3"],
    "PORSCHE": ["Macan", "Cayenne", "911", "Taycan", "Panamera"],
    "TOYOTA": ["Tundra", "Camry", "Supra", "Mark", "Cruiser"],
};

// Configuration
const ARC_RADIUS = 340; // Larger radius
const ARC_OFFSET_X = -470; // Adjusted offset
const ANGLE_STEP = 20; // Degrees between each item

interface ModelArcMenuProps {
    brand: string;
    onSelect?: (model: string) => void;
}

export function ModelArcMenu({ brand, onSelect }: ModelArcMenuProps) {
    const models = MODELS_DATA[brand] || [];
    const [activeIndex, setActiveIndex] = useState(2);

    const rotation = useMotionValue(-2 * ANGLE_STEP);

    // Reset active index when brand changes
    useEffect(() => {
        setActiveIndex(2);
        rotation.set(-2 * ANGLE_STEP);
        if (onSelect && models[2]) onSelect(models[2]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brand]);

    const handleDragEnd = (event: PointerEvent | MouseEvent | TouchEvent, info: { offset: { x: number, y: number }, velocity: { x: number, y: number } }) => {
        const currentRot = rotation.get();
        const projectedRot = currentRot + info.velocity.y * 0.05;

        let newIndex = Math.round(-projectedRot / ANGLE_STEP);
        newIndex = Math.max(0, Math.min(models.length - 1, newIndex));

        setActiveIndex(newIndex);
        if (onSelect) onSelect(models[newIndex]);

        animate(rotation, -newIndex * ANGLE_STEP, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
        });
    };

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
        if (onSelect) onSelect(models[index]);

        animate(rotation, -index * ANGLE_STEP, {
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
        });
    };

    return (
        <div className="absolute left-0 top-[50%] -translate-y-1/2 w-full md:w-[80%] h-[90vh] pointer-events-none flex items-center z-0 overflow-hidden">
            <motion.div
                className="absolute rounded-full border-r border-slate-100 dark:border-slate-800 pointer-events-auto cursor-grab active:cursor-grabbing flex items-center justify-center left-0"
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
                    {models.map((model, index) => {
                        const itemAngle = index * ANGLE_STEP;
                        return (
                            <ModelArcMenuItem
                                key={`${brand}-${model}`}
                                model={model}
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

interface ModelArcMenuItemProps {
    model: string;
    itemAngle: number;
    globalRotation: MotionValue<number>;
    isActive: boolean;
    onClick: () => void;
    radius: number;
}

function ModelArcMenuItem({ model, itemAngle, globalRotation, isActive, onClick, radius }: ModelArcMenuItemProps) {
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
                    isActive ? "bg-slate-900 dark:bg-blacks scale-[1.5]" : "bg-slate-400 dark:bg-slate-600"
                )}
            />

            <motion.div
                className="ml-6 pointer-events-auto cursor-pointer"
                style={{ opacity, scale, transformOrigin: "left center" }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            >
                <span
                    className={cn(
                        "text-2xl md:text-2xl lg:text-2xl font-bold uppercase transition-colors duration-300 tracking-tighter leading-none",
                        isActive
                            ? "text-slate-900 dark:text-black"
                            : "text-slate-200 dark:text-slate-700 hover:text-slate-300 dark:hover:text-slate-600"
                    )}
                >
                    {model}
                </span>
            </motion.div>
        </div>
    );
}
