"use client";
// @ts-nocheck

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment, Html, useProgress } from "@react-three/drei";
import { CarModel } from "@/components/canvas/CarModel";

interface ConfiguratorCanvasProps {
    brand: string;
    model: string;
    color: string | null;
    wheel: string | null;
}

// Выносим лоадер в отдельный компонент с защитой от обновлений во время рендера
function Loader() {
    const { progress } = useProgress();
    const [shownProgress, setShownProgress] = useState(0);

    // Используем useEffect для синхронизации прогресса, чтобы избежать ошибок setState во время рендеринга
    useEffect(() => {
        setShownProgress(Math.round(progress));
    }, [progress]);

    return (
        <Html center className="pointer-events-none">
            <div className="flex flex-col items-center gap-2">
                <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${shownProgress}%` }}
                    />
                </div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-900">
                    Загрузка {shownProgress}%
                </p>
            </div>
        </Html>
    );
}

export function ConfiguratorCanvas({ brand, model, color, wheel }: ConfiguratorCanvasProps) {
    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas shadows dpr={[1, 2]}>
                {/* Немного изменили положение камеры, чтобы смотреть чуть ниже */}
                <PerspectiveCamera makeDefault position={[5, 1.5, 8]} fov={30} />

                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <CarModel brand={brand} model={model} color={color} wheel={wheel} />

                    {/* Опустили тени на тот же уровень, что и машину (-1.2) */}
                    <ContactShadows
                        position={[0, -1.22, 0]}
                        opacity={0.5}
                        scale={12}
                        blur={2}
                        far={1.5}
                    />
                </Suspense>

                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={0.8} />
                <ambientLight intensity={0.6} />

                <OrbitControls
                    enablePan={false}
                    /* Центрируем вращение камеры на уровне машины */
                    target={[0, -0.5, 0]}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 2.1}
                    minDistance={6}
                    maxDistance={12}
                    autoRotate
                    autoRotateSpeed={0.2}
                    enableDamping
                />
            </Canvas>
        </div>
    );
}
