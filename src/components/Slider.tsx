"use client";

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "./MaterialIcon";

export interface SliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforePosition?: string; // Настройка выравнивания для фото До
  afterPosition?: string;  // Настройка выравнивания для фото После
  className?: string;
  onDragStateChange?: (isDragging: boolean) => void;
}

export function Slider({
  beforeImage,
  afterImage,
  beforeLabel = "До",
  afterLabel = "После",
  beforePosition = "center",
  afterPosition = "center",
  className,
  onDragStateChange,
}: SliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onDragStateChange?.(isDragging);
  }, [isDragging, onDragStateChange]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: globalThis.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden select-none", className)}
    >
      {/* After Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: afterPosition }}
          draggable={false}
        />
        {afterLabel && (
          <div
            className="absolute top-0 right-0 h-full flex justify-end p-4 pointer-events-none"
          >
            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase h-fit whitespace-nowrap">
              {afterLabel}
            </span>
          </div>
        )}
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: beforePosition }}
          draggable={false}
        />
        {beforeLabel && (
          <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase z-10 whitespace-nowrap">
            {beforeLabel}
          </span>
        )}
      </div>

      {/* Vertical Split Line */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-20 -ml-10 cursor-col-resize flex items-center justify-center z-30"
        style={{ left: `${sliderPosition}%` }}
        onMouseDownCapture={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        onPointerDownCapture={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
        onTouchStartCapture={(e) => {
          e.stopPropagation();
          setIsDragging(true);
        }}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-2xl border border-white/50 transition-transform duration-200 active:scale-110 pointer-events-none">
          <MaterialIcon name="swap_horiz" className="text-2xl md:text-3xl" />
        </div>
      </div>
    </div>
  );
}
