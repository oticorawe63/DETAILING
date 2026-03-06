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
}

export function CameraRig({ isInteriorView, controlsRef, isMoving, setIsMoving, intPos, extPos, intFocus, extFocus }: CameraRigProps) {
    const vec = new THREE.Vector3();

    useFrame((state) => {
        const step = 0.05;
        const camera = state.camera as THREE.PerspectiveCamera;

        // --- ЗУМ (FOV) ---
        const targetFov = isInteriorView ? INTERIOR_FOV : 30;
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
function Loader() {
    const { progress } = useProgress();
    const [shownProgress, setShownProgress] = useState(0);

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
            const timer = setTimeout(() => setIsMoving(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [isMoving]);

    const exteriorFocusPoint: [number, number, number] = [0, -0.5, 0];
    const interiorFocusPoint: [number, number, number] = [0.00, -0.10, -0.40]; // Взгляд смещаем правее к багажнику
    const exteriorStartPos: [number, number, number] = [8.5, 1.0, 8.5];
    const interiorStartPos: [number, number, number] = [3.22, 0.50, 1.25]; // Уменьшаем Z с 2.0 до 0.0, чтобы сместиться к багажнику (правее)окна

    // Динамический расчет параметров орбиты, чтобы НИКОГДА не было "прыжка" в конце
    const dx = interiorStartPos[0] - interiorFocusPoint[0];
    const dy = interiorStartPos[1] - interiorFocusPoint[1];
    const dz = interiorStartPos[2] - interiorFocusPoint[2];
    const intDistance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const intPolar = Math.acos(dy / intDistance);

    return (
        <div className="absolute inset-0 w-full h-full z-0">
            <Canvas shadows dpr={[1, 2]}>
                <CameraRig
                    isInteriorView={isInteriorView}
                    controlsRef={controlsRef}
                    isMoving={isMoving}
                    setIsMoving={setIsMoving}
                    intPos={interiorStartPos}
                    extPos={exteriorStartPos}
                    intFocus={interiorFocusPoint}
                    extFocus={exteriorFocusPoint}
                />
                <PerspectiveCamera makeDefault position={exteriorStartPos} fov={30} />

                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <CarModel brand={brand} model={model} color={color} wheel={wheel} detail={detail} coating={coating} />
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
