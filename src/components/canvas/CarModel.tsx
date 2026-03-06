"use client";
// @ts-nocheck

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

interface CarModelProps {
    brand: string;
    model: string;
    color: string | null;
    wheel: string | null;
    detail: string | null;
    coating?: string;
}

const COLOR_MAP: Record<string, string> = {
    white: "#ffffff",
    gray: "#a1a1aa",
    black: "#111111",
    red: "#cc0000",
    orange: "#f97316",
    yellow: "#facc15",
    green: "#0a5c2e",
    lime: "#a3e635",
    lightblue: "#38bdf8",
    blue: "#0a358c",
    pink: "#ec4899",
    purple: "#4c1d95",
};

const INTERIOR_COLOR_MAP: Record<string, string> = {
    bs1: "#111111", // Black
    bs2: "#71717a", // Gray
    bs3: "#ffffff", // White
    bs5: "#cc0000", // Red
    bs4: "#f97316", // Orange
    bs6: "#facc15", // Yellow
    bs7: "#0a5c2e", // Green
    bs8: "#a3e635", // Lime
    bs9: "#38bdf8", // Lightblue
    bs10: "#0a358c", // Blue
    bs11: "#ec4899", // Pink
    bs12: "#4c1d95", // Purple
};

export function CarModel({ brand, model, color, wheel, detail, coating }: CarModelProps) {
    const modelPath = useMemo(() => "/models/bmw/bmw_m5_f90_opt.glb", []);
    const { scene } = useGLTF(modelPath);
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    const [currentWheelTexture, setCurrentWheelTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
        if (!wheel || wheel.startsWith("w")) {
            setCurrentWheelTexture(null);
            return;
        }
        const brandLower = brand.toLowerCase();
        const match = wheel.match(/\d+/);
        if (match) {
            const texturePath = `/wheels/${brandLower}/wheel${match[0]}.png`;
            const loader = new THREE.TextureLoader();
            loader.load(texturePath, (texture) => {
                texture.flipY = false;
                texture.anisotropy = 16;
                texture.colorSpace = THREE.SRGBColorSpace;
                setCurrentWheelTexture(texture);
            });
        }
    }, [brand, wheel]);

    const fabricTexture = useMemo(() => {
        if (typeof document === "undefined") return null;
        const size = 128;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Создаем легкий шум для эффекта ткани/алькантары
        ctx.fillStyle = "#eeeeee";
        ctx.fillRect(0, 0, size, size);
        for (let i = 0; i < 15000; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const col = Math.floor(Math.random() * 60) + 150;
            ctx.fillStyle = `rgb(${col},${col},${col})`;
            ctx.fillRect(x, y, 1, 1);
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(30, 30); // Очень мелкая сетка
        return tex;
    }, []);

    useEffect(() => {
        const currentColor = color && COLOR_MAP[color] ? COLOR_MAP[color] : "#111111";
        const currentInteriorColor = detail && INTERIOR_COLOR_MAP[detail] ? INTERIOR_COLOR_MAP[detail] : "#7a5c43"; // Default beige/tan interior

        clonedScene.traverse((node) => {
            if (!(node as any).isMesh) return;
            const mesh = node as THREE.Mesh;

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m, i) => {
                const mat = m as THREE.MeshStandardMaterial;

                // Клонирование
                if (!mat.userData.cloned) {
                    const cloned = mat.clone();
                    cloned.userData.cloned = true;
                    if (Array.isArray(mesh.material)) mesh.material[i] = cloned;
                    else mesh.material = cloned;
                }

                let current = (Array.isArray(mesh.material) ? mesh.material[i] : mesh.material) as THREE.MeshStandardMaterial;
                const name = mesh.name.toLowerCase();
                const matName = (current.name || "").toLowerCase();

                // Определение ролей
                const isBodyPart =
                    (name.includes("paint") || name.includes("body") || name.includes("_119_") || name.includes("_026_") || name.includes("_087_") || name.includes("_118_") || name.includes("_010_") || matName.includes("paint") || matName.includes("body") || matName.includes("coloured")) &&
                    !name.includes("frame") && !name.includes("mirror") && !name.includes("window") && !name.includes("pillar") && !name.includes("_int_") && !name.includes("badge") && !name.includes("carbon") && !matName.includes("carbon") && !name.includes("diffuser") && !name.includes("silverside") && !name.includes("chromeblack");

                // Конвертируем материал кузова в MeshPhysicalMaterial для поддержки clearcoat (лака)
                if (isBodyPart && !(current as any).isMeshPhysicalMaterial) {
                    const physMat = new THREE.MeshPhysicalMaterial();
                    physMat.name = current.name;
                    physMat.normalMap = current.normalMap;
                    if (current.normalScale && physMat.normalScale) {
                        physMat.normalScale.copy(current.normalScale);
                    }
                    physMat.envMap = current.envMap;
                    physMat.envMapIntensity = current.envMapIntensity;
                    physMat.side = current.side;
                    physMat.transparent = current.transparent;
                    physMat.opacity = current.opacity;
                    physMat.userData = { ...current.userData };

                    if (Array.isArray(mesh.material)) mesh.material[i] = physMat;
                    else mesh.material = physMat;
                    current = physMat;
                }

                const isInteriorLeather =
                    (name.includes("leather2") || name.includes("coloured") || matName.includes("leather2") || matName.includes("coloured")) &&
                    !name.includes("stitche") && !name.includes("leather1");

                const isSeatPart = name.includes("seat") || matName.includes("seat");

                const isBlackLeatherPart =
                    (name.includes("leather1") || name.includes("topleather") || name.includes("steerleather") || name.includes("door_int_leathertop") || matName.includes("leather1") || matName.includes("top")) && !isSeatPart;

                const isTrim =
                    (name.includes("trim") || name.includes("frame") || name.includes("window") || name.includes("shadowline") || name.includes("grille") || name.includes("pillar") || name.includes("mirror") || matName.includes("chrome") || matName.includes("blackshiny") || matName.includes("carbon") || isBlackLeatherPart) && !isBodyPart && !isInteriorLeather && !isSeatPart;

                const isGlass = name.includes("glass") || matName.includes("glass") || name.includes("rearligh");

                // Исправлено: исключаем "trim" из поиска "rim", чтобы не скрывать детали бампера
                const isRim = (name.includes("wheel") || (name.includes("rim") && !name.includes("trim"))) && !name.includes("tire") && !name.includes("brake");
                const isBrake = name.includes("brake");

                // Применение стилей
                if (isBodyPart) {
                    const physCurrent = current as THREE.MeshPhysicalMaterial;
                    physCurrent.color.set(currentColor);
                    physCurrent.map = null;
                    if (physCurrent.emissive) physCurrent.emissive.set("#000000");

                    if (coating === "GLOSSY") {
                        // Обычная автомобильная краска
                        physCurrent.roughness = 0.5;
                        physCurrent.metalness = 0.1;
                        physCurrent.clearcoat = 1.0;
                        physCurrent.clearcoatRoughness = 0.05;
                    } else if (coating === "MATTE") {
                        // Точные значения из референсной матовой 3D модели с шероховатым лаком
                        physCurrent.roughness = 0.334;
                        physCurrent.metalness = 0.297;
                        physCurrent.clearcoat = 1.0;
                        physCurrent.clearcoatRoughness = 0.492;
                    } else {
                        // METALLIC - металлическая крошка
                        physCurrent.roughness = 0.3;
                        physCurrent.metalness = 0.8;
                        physCurrent.clearcoat = 1.0;
                        physCurrent.clearcoatRoughness = 0.1;
                    }

                    mesh.visible = true;
                } else if (isInteriorLeather || isSeatPart) {
                    // Если это цветная часть - красим, если черная основа сиденья - делаем темно-серой/черной
                    const seatBaseColor = isInteriorLeather ? currentInteriorColor : "#050505";
                    current.color.set(seatBaseColor);

                    // Добавляем текстуру ткани
                    if (fabricTexture) {
                        current.map = fabricTexture;
                    }
                    current.roughness = 0.95;
                    current.metalness = 0.05;
                    mesh.visible = true;
                } else if (isTrim && !isGlass && !isRim && !isBrake) {
                    current.color.set("#0a0a0a");
                    current.map = null;
                    if (current.emissive) current.emissive.set("#000000");
                    current.roughness = 0.3;
                    current.metalness = 0.2;
                    mesh.visible = true;
                } else if (isGlass) {
                    current.transparent = true;
                    current.opacity = 0.35;
                    current.color.set("#050505");
                    mesh.visible = true;
                } else if (isRim) {
                    if (currentWheelTexture) {
                        mesh.visible = false;
                    } else {
                        mesh.visible = true;
                        current.color.set("#222222");
                        current.map = null;
                    }
                } else if (isBrake) {
                    mesh.visible = true;
                } else {
                    mesh.visible = true;
                }

                current.needsUpdate = true;
            });
        });
    }, [clonedScene, color, wheel, detail, coating, currentWheelTexture, fabricTexture]);

    // Следим за аспектом текстуры, чтобы она не растягивалась
    const [textureAspect, setTextureAspect] = useState(1);
    useEffect(() => {
        if (currentWheelTexture && currentWheelTexture.image) {
            const img = currentWheelTexture.image as HTMLImageElement;
            if (img.width && img.height) {
                setTextureAspect(img.width / img.height);
            }
        }
    }, [currentWheelTexture]);

    return (
        <group>
            <primitive object={clonedScene} scale={1.1} position={[0, -1.2, 0]} />

            {/* Рендерим 2D PNG колеса поверх машины на оригинальных метриках */}
            {currentWheelTexture && (
                <group scale={1.1} position={[0, -1.2, 0]}>
                    {/* Переднее правое (X+) */}
                    <mesh position={[0.88, 0.370, 1.58]} rotation={[0, Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[0.295, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                    {/* Заднее правое (X+) */}
                    <mesh position={[0.88, 0.370, -1.372]} rotation={[0, Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[0.295, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                    {/* Переднее левое (X-) */}
                    <mesh position={[-0.93, 0.370, 1.58]} rotation={[0, -Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[0.295, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                    {/* Заднее левое (X-) */}
                    <mesh position={[-0.93, 0.370, -1.372]} rotation={[0, -Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[0.295, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                </group>
            )}
        </group>
    );
}

useGLTF.preload("/models/bmw/bmw_m5_f90_opt.glb");
