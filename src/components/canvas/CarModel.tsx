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
}

const COLOR_MAP: Record<string, string> = {
    white: "#f8fafc",
    gray: "#94a3b8",
    black: "#111111",
    red: "#990000",
    orange: "#f97316",
    yellow: "#facc15",
    green: "#0a5c2e",
    lime: "#a3e635",
    lightblue: "#38bdf8",
    blue: "#001f5c",
    pink: "#ec4899",
    purple: "#4c1d95",
};

export function CarModel({ brand, model, color, wheel }: CarModelProps) {
    const modelPath = useMemo(() => "/models/bmw/bmw_m5_f90.gltf", []);
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

    useEffect(() => {
        const currentColor = color && COLOR_MAP[color] ? COLOR_MAP[color] : "#333333";

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

                const current = (Array.isArray(mesh.material) ? mesh.material[i] : mesh.material) as THREE.MeshStandardMaterial;
                const name = mesh.name.toLowerCase();
                const matName = (current.name || "").toLowerCase();

                // Определение ролей
                const isBodyPart =
                    (name.includes("paint") || name.includes("body") || name.includes("_119_") || name.includes("_026_") || name.includes("_087_") || name.includes("_118_") || name.includes("_010_") || matName.includes("paint") || matName.includes("body") || matName.includes("coloured")) &&
                    !name.includes("frame") && !name.includes("mirror") && !name.includes("window") && !name.includes("pillar") && !name.includes("_int_") && !name.includes("badge") && !name.includes("carbon") && !matName.includes("carbon") && !name.includes("diffuser") && !name.includes("silverside") && !name.includes("chromeblack");

                const isTrim =
                    (name.includes("trim") || name.includes("frame") || name.includes("window") || name.includes("shadowline") || name.includes("grille") || name.includes("pillar") || name.includes("mirror") || matName.includes("chrome") || matName.includes("blackshiny") || matName.includes("carbon")) && !isBodyPart;

                const isGlass = name.includes("glass") || matName.includes("glass") || name.includes("rearligh");
                const isWheel = (name.includes("wheel") || name.includes("rim") || name.includes("brake")) && !name.includes("tire");

                // Применение стилей
                if (isBodyPart) {
                    current.color.set(currentColor);
                    current.map = null;
                    if (current.emissive) current.emissive.set("#000000");
                    current.roughness = 0.15;
                    current.metalness = 0.7;
                } else if (isTrim && !isGlass && !isWheel) {
                    current.color.set("#0a0a0a");
                    current.map = null;
                    if (current.emissive) current.emissive.set("#000000");
                    current.roughness = 0.3;
                    current.metalness = 0.2;
                } else if (isGlass) {
                    current.transparent = true;
                    current.opacity = 0.35;
                    current.color.set("#050505");
                } else if (isWheel) {
                    if (currentWheelTexture) {
                        current.map = currentWheelTexture;
                        current.color.set("#ffffff");
                    } else if (!name.includes("brake")) {
                        current.color.set("#222222");
                    }
                }

                current.needsUpdate = true;
            });
        });
    }, [clonedScene, color, wheel, currentWheelTexture]);

    return (
        <group>
            <primitive object={clonedScene} scale={1.4} position={[0, -1.2, 0]} />
        </group>
    );
}

useGLTF.preload("/models/bmw/bmw_m5_f90.gltf");
