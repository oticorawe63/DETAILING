"use client";
// @ts-nocheck

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment, Html, useProgress } from "@react-three/drei";
import { CarModel } from "@/components/canvas/CarModel";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

interface ConfiguratorCanvasProps {
    brand: string;
    model: string;
    color: string | null;
    wheel: string | null;
    detail: string | null;
    isInteriorView: boolean;
    coating?: string;
}



const INTERIOR_FOV = 15; // Зум объектива

interface CameraRigProps {
    isInteriorView: boolean;
    controlsRef: any;
    isMoving: boolean;
    setIsMoving: (v: boolean) => void;
    intPos: [number, number, number];
    extPos: [number, number, number];
    intFocus: [number, number, number];
    extFocus: [number, number, number];
    intFov: number;
}

export function CameraRig({ isInteriorView, controlsRef, isMoving, setIsMoving, intPos, extPos, intFocus, extFocus, intFov }: CameraRigProps) {
    const vec = new THREE.Vector3();

    useFrame((state) => {
        const step = 0.10; // Быстрой зум/проезд (было 0.05)
        const camera = state.camera as THREE.PerspectiveCamera;

        // --- ЗУМ (FOV) ---
        const targetFov = isInteriorView ? intFov : 30;
        if (Math.abs(camera.fov - targetFov) > 0.05) {
            camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, step);
            camera.updateProjectionMatrix();
        }

        if (isMoving) {
            const targetPosArr = isInteriorView ? intPos : extPos;
            const targetFocusArr = isInteriorView ? intFocus : extFocus;

            const targetPos = vec.set(targetPosArr[0], targetPosArr[1], targetPosArr[2]);
            const targetFocus = new THREE.Vector3(targetFocusArr[0], targetFocusArr[1], targetFocusArr[2]);

            // Плавно двигаем камеру
            state.camera.position.lerp(targetPos, step);

            // Плавно двигаем целевую фокус-точку
            if (controlsRef.current) {
                controlsRef.current.target.lerp(targetFocus, step);
                controlsRef.current.update();
            }
        }
    });

    return null;
}


// Выносим лоадер в отдельный компонент
function Loader({ model }: { model: string }) {
    const { progress } = useProgress();
    const [shownProgress, setShownProgress] = useState(0);

    useEffect(() => {
        setShownProgress(Math.round(progress));
    }, [progress]);

    return (
        <Html center className="pointer-events-none">
            <div className="flex flex-col items-center justify-center gap-6 p-10 bg-white/20 backdrop-blur-2xl rounded-[40px] border border-white/30 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                <div className="relative flex items-center justify-center">
                    {/* Элегантный спиннер */}
                    <div className="w-24 h-24 border-[3px] border-slate-100/30 border-t-slate-900 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-black text-slate-900 tracking-tighter">{shownProgress}%</span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <div className="w-48 h-1 bg-slate-900/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-slate-900 transition-all duration-700 ease-in-out"
                            style={{ width: `${shownProgress}%` }}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-900/40 mb-1">
                            Loading Detailing Model
                        </p>
                        <p className="text-xs font-bold text-slate-900 tracking-widest uppercase">
                            BMW {model}
                        </p>
                    </div>
                </div>
            </div>
        </Html>
    );
}

export function ConfiguratorCanvas({ brand, model, color, wheel, detail, isInteriorView, coating }: ConfiguratorCanvasProps) {
    const controlsRef = useRef<any>(null);
    const [isMoving, setIsMoving] = useState(false);
    const prevView = useRef(isInteriorView);

    // Синхронно обновляем стейт движения, чтобы избежать мгновенного рывка (snap) у OrbitControls
    if (prevView.current !== isInteriorView) {
        prevView.current = isInteriorView;
        setIsMoving(true);
    }

    useEffect(() => {
        if (isMoving) {
            const timer = setTimeout(() => setIsMoving(false), 1250); // Разблокируем управление в 2 раза быстрее (было 2500)
            return () => clearTimeout(timer);
        }
    }, [isMoving]);

    let interiorFocusPoint: [number, number, number] = [0.00, -0.10, -0.40];
    let interiorStartPos: [number, number, number] = [3.22, 0.50, 1.25];
    let exteriorFocusPoint: [number, number, number] = [0, -0.5, 0];
    let exteriorStartPos: [number, number, number] = [8.5, 1.0, 8.5];

    let currentInteriorFov = INTERIOR_FOV;

    // --- НАСТРОЙКИ РАКУРСА ПО МОДЕЛЯМ ---
    if (model === "M3") {
        interiorFocusPoint = [0, -0.33, 0.05];
        exteriorFocusPoint = [0, -0.5, 0.05]; // Центрируем по Z сдвигу
    }

    if (model === "M4") {
        interiorFocusPoint = [0, -0.10, 0.1];
        exteriorFocusPoint = [0, -0.5, 0.1]; // Центрируем по Z сдвигу
    }

    if (model === "X6") {
        // Внешний ракурс (обычный):
        exteriorStartPos = [9.0, 1.5, 9.0];
        // Центр вращения должен точно совпадать со сдвигом модели по позиции (Z = 1.0)
        exteriorFocusPoint = [0, -0.6, 1.0];

        // Близкий ракурс (салон / зум)
        interiorStartPos = [4.35, 1.30, 2.62];
        interiorFocusPoint = [0.0, 0.1, 0.6];

        currentInteriorFov = 18;
    }

    if (model === "X5") {
        exteriorStartPos = [9.5, 1.8, 9.5];
        exteriorFocusPoint = [0, -0.7, 0];

        interiorStartPos = [4.5, 1.4, 0.5];
        interiorFocusPoint = [0.0, 0.1, 0];

        currentInteriorFov = 18;
    }

    // Динамический расчет параметров орбиты, чтобы НИКОГДА не было "прыжка" в конце
    const dx = interiorStartPos[0] - interiorFocusPoint[0];
    const dy = interiorStartPos[1] - interiorFocusPoint[1];
    const dz = interiorStartPos[2] - interiorFocusPoint[2];
    const intDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const intPolar = Math.acos(dy / intDistance);

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas shadows={false} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: true }}>
                <CameraRig
                    isInteriorView={isInteriorView}
                    controlsRef={controlsRef}
                    isMoving={isMoving}
                    setIsMoving={setIsMoving}
                    intPos={interiorStartPos}
                    extPos={exteriorStartPos}
                    intFocus={interiorFocusPoint}
                    extFocus={exteriorFocusPoint}
                    intFov={currentInteriorFov}
                />
                <PerspectiveCamera makeDefault position={exteriorStartPos} fov={30} />

                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>


                <Suspense fallback={<Loader model={model} />}>
                    <CarModel brand={brand} model={model} color={color} wheel={wheel} detail={detail} coating={coating} />
                    {/* Тень статична, так как вращается камера, а не сама машина. Фиксация frames={1} убирает рендер 350k полигонов на каждом кадре! */}
                    <ContactShadows
                        key={model + (wheel || "default")}
                        position={[0, model === "X5" ? -1.55 : (model === "X6" ? -1.22 : -1.22), 0]}
                        opacity={0.65}
                        scale={16}
                        blur={2.5}
                        far={4}
                        resolution={512}
                        frames={1}
                    />
                </Suspense>

                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={0.8} />
                <ambientLight intensity={0.6} />

                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={false}
                    target={exteriorFocusPoint}
                    // Даем мягкие ограничения на дистанцию (зум и так отключен, значит дистанция сама сохранится).
                    // А вот высоту (PolarAngle) жестко фиксируем в режиме салона, как вы и просили.
                    minPolarAngle={isInteriorView ? (isMoving ? 0.1 : intPolar) : Math.PI / 4}
                    maxPolarAngle={isInteriorView ? (isMoving ? Math.PI - 0.1 : intPolar) : Math.PI / 2.1}
                    minDistance={2}
                    maxDistance={20}
                    autoRotate={!isInteriorView}
                    autoRotateSpeed={0.2}
                    enableDamping
                    onEnd={() => {
                        if (controlsRef.current) {
                            const p = controlsRef.current.object.position;
                            const t = controlsRef.current.target;
                            console.log(`%c [CAMERA DEBUG] `, 'background: #222; color: #bada55');
                            console.log(`interiorStartPos: [${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}]`);
                            console.log(`interiorFocusPoint: [${t.x.toFixed(2)}, ${t.y.toFixed(2)}, ${t.z.toFixed(2)}]`);
                        }
                    }}
                />
            </Canvas>
        </div>
    );
}
