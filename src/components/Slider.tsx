"use client";

import { useState, useRef, useEffect, MouseEvent, TouchEvent } from "react";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "./MaterialIcon";

export interface SliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  onDragStateChange?: (isDragging: boolean) => void;
}

export function Slider({
  beforeImage,
  afterImage,
  beforeLabel = "До",
  afterLabel = "После",
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
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {afterLabel && (
          <div
            className="absolute top-0 right-0 h-full overflow-hidden flex justify-end p-4"
            style={{ width: `${100 - sliderPosition}%` }}
          >
            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase h-fit whitespace-nowrap">
              {afterLabel}
            </span>
          </div>
        )}
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden border-r-2 border-white"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: "100%", height: "100%", objectPosition: "left center" }}
          draggable={false}
        />
        {beforeLabel && (
          <span className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10 whitespace-nowrap">
            {beforeLabel}
          </span>
        )}
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.2)] z-20"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onTouchStart={(e: TouchEvent) => {
          setIsDragging(true);
        }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-800 shadow-md">
          <MaterialIcon name="code" />
        </div>
      </div>
    </div>
  );
}
