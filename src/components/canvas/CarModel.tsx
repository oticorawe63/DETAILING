"use client";
// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");

interface CarModelProps {
    brand: string;
    model: string;
    color: string | null;
    wheel: string | null;
    detail: string | null;
    coating?: string;
}

const COLOR_MAP: Record<string, string> = {
    white: "#ffffff", gray: "#a1a1aa", black: "#111111", red: "#cc0000",
    orange: "#f97316", yellow: "#facc15", green: "#0a5c2e", lime: "#a3e635",
    lightblue: "#38bdf8", blue: "#0036cc", pink: "#ec4899", purple: "#4c1d95",
};

const INTERIOR_COLOR_MAP: Record<string, string> = {
    bs1: "#111111", bs2: "#71717a", bs3: "#ffffff", bs5: "#990000",
    bs4: "#f97316", bs6: "#facc15", bs7: "#0a5c2e", bs8: "#a3e635",
    bs9: "#38bdf8", bs10: "#0a358c", bs11: "#ec4899", bs12: "#4c1d95",
};

const MODEL_CONFIGS: Record<string, any> = {

    "M5": {
        path: "/models/bmw/bmw_m5_f90_opt_draco.glb",
        scale: 1.1, position: [0, -1.2, 0], rotation: [0, 0, 0],
        wheelRadius: 0.295,
        wheelPositions: {
            fr: [0.88, 0.370, 1.58], br: [0.88, 0.370, -1.372],
            fl: [-0.93, 0.370, 1.58], bl: [-0.93, 0.370, -1.372]
        },
        isBodyPart: (n: string, m: string) =>
            (n.includes("paint") || n.includes("body") || m.includes("paint") || m.includes("body") || m.includes("coloured")) &&
            !n.includes("frame") && !n.includes("mirror") && !n.includes("window") && !n.includes("pillar") && !n.includes("_int_") && !n.includes("badge") && !n.includes("carbon") && !m.includes("carbon") && !n.includes("diffuser") && !n.includes("silverside") && !n.includes("chromeblack"),
        isInteriorPart: (n: string, m: string) => (m.includes("leather2") || n.includes("leather2")) && !m.includes("leather1") && !n.includes("leather1"),
        isSeatPart: (n: string, m: string) => (n.includes("seat") || m.includes("seat")) && (m.includes("leather2") || n.includes("leather2")) && !m.includes("leather1") && !n.includes("leather1"),
        isTrim: (n: string, m: string) => (n.includes("trim") || n.includes("frame") || n.includes("window") || n.includes("shadowline") || n.includes("grille") || n.includes("pillar") || n.includes("mirror") || m.includes("chrome") || m.includes("blackshiny") || m.includes("carbon") || m.includes("leather1") || n.includes("leather1")) && !m.toLowerCase().includes("badge") && !m.toLowerCase().includes("light"),
        isGlass: (n: string, m: string) => (n.includes("glass") || m.includes("glass") || n.toLowerCase().includes("rearligh")) && !m.toLowerCase().includes("red") && !m.toLowerCase().includes("orange"),
        isRim: (n: string, m: string) => (n.includes("wheel") || (n.includes("rim") && !n.includes("trim"))) && !n.includes("tire") && !n.includes("brake"),
        isLogo: (n: string, m: string) => n.includes("badge") || m.includes("logo")
    },










    "M4": {
        path: "/models/bmw/m4_v2/scene_opt.glb",
        scale: 1.15, position: [0.0, -1.2, 0.1], rotation: [0, 0, 0],
        wheelRadius: 0.30,
        wheelPositions: {
            fr: [0.86, 0.373, 1.30], fl: [-0.86, 0.373, 1.30],
            rr: [0.86, 0.373, -1.50], rl: [-0.86, 0.373, -1.50]
        },
        isBodyPart: (n: string, m: string) => (m === "arm4_main" || m === "arm4_details_d") && !n.includes("wheel"),
        isInteriorPart: (n: string, m: string) => m === "arm4_color_interior",
        isSeatPart: (n: string, m: string) => m === "arm4_color_interior",
        isTrim: (n: string, m: string) => (m.includes("black") || m.includes("carbon") || m.includes("plastic") || m.includes("interiora") || m.includes("enginea") || m.includes("chrome") || m.includes("gauges") || m.includes("inter_tcz")) && !m.toLowerCase().includes("badge") && !m.toLowerCase().includes("light") && !m.toLowerCase().includes("logo"),
        isGlass: (n: string, m: string) => (m.includes("glass") || n.includes("glass")) && !m.toLowerCase().includes("red") && !m.toLowerCase().includes("orange"),
        isRim: (n: string, m: string) => n.includes("wheel") && !n.includes("tire") && !m.includes("michelin") && !m.includes("sidewall"),
        isLogo: (n: string, m: string) => m.includes("badge") || m.includes("logo")
    },













    "M3": {
        path: "/models/bmw/m3/scene_opt.glb",
        scale: 0.22, position: [0.00, -1.2, 0.05], rotation: [0, Math.PI / 2, 0],
        wheelRadius: 1.38,
        wheelBaseRotationR: [0, Math.PI, 0],
        wheelBaseRotationL: [0, 0, 0],
        wheelPositions: {
            fr: [-8.526, 1.468, -4.753],
            fl: [-8.526, 1.468, 4.753],
            rr: [6.583, 1.468, -4.747],
            rl: [6.583, 1.468, 4.747]
        },
        isBodyPart: (n: string, m: string) => m.includes("body_color") || m === "exterior_body_paint.001",
        isInteriorPart: (n: string, m: string) => m.includes("chrome_interior") || m.includes("design_interior") || m.includes("texture_interior") || m.includes("textil_2"),
        isSeatPart: (n: string, m: string) => m.includes("chrome_interior") || m.includes("design_interior") || m.includes("texture_interior") || m.includes("textil_2"),
        isTrim: (n: string, m: string) => (m.includes("black") || m.includes("carbon") || m.includes("plastic") || m.includes("textil")) && !m.includes("exterior_body") && !m.includes("chrome_interior") && !m.includes("design_interior") && !m.includes("texture_interior") && !m.includes("textil_2") && !m.toLowerCase().includes("badge") && !m.toLowerCase().includes("light"),
        isGlass: (n: string, m: string) => (m.includes("glass") || n.includes("glass")) && !m.toLowerCase().includes("red") && !m.toLowerCase().includes("orange"),
        isRim: (n: string, m: string) => (n.includes("wheel") || n.includes("Object_71") || n.includes("Object_81") || n.includes("Object_91") || n.includes("Object_101") || m.includes("rim") || m.includes("chrome_rough")) && !m.includes("tire") && !n.includes("brake"),
        isHidden: (n: string, m: string) => m === "exterior_body",
        isLogo: (n: string, m: string) => m.includes("bmw_logo") || m.includes("badge")
    },
    "X6": {
        path: "/models/bmw/x6/scene_opt.glb",
        scale: 141.65, position: [0, -1.0, 1.0], rotation: [0, 0, 0],
        wheelRadius: 0.0029, // РАЗМЕР ДИСКОВ
        wheelPositions: {
            fr: [0.0090, 0.0014, 0.0146], br: [0.0090, 0.0014, -0.0146],
            fl: [-0.0090, 0.0014, 0.0146], bl: [-0.0090, 0.0014, -0.0146]
        },
        isBodyPart: (n: string, m: string) => m.toLowerCase().includes("paint") || n.toLowerCase().includes("carpaint"),
        isInteriorPart: (n: string, m: string) => m.toLowerCase().includes("tiled"),
        isSeatPart: (n: string, m: string) => m.toLowerCase().includes("tiled"),
        isTrim: (n: string, m: string) => (m.toLowerCase().includes("plastic") || m.toLowerCase().includes("chrome") || m.toLowerCase().includes("aluminum") || m.toLowerCase().includes("chassis") || m.toLowerCase().includes("grille") || m.toLowerCase().includes("mirror")) && !m.toLowerCase().includes("tire") && !m.toLowerCase().includes("badge") && !m.toLowerCase().includes("glass") && !m.toLowerCase().includes("window"),
        isGlass: (n: string, m: string) => m.toLowerCase().includes("glass") || m.toLowerCase().includes("window"),
        isRim: (n: string, m: string) => (m.toLowerCase().includes("rim") || n.toLowerCase().includes("wheel") || n.toLowerCase().includes("disk")) && !n.toLowerCase().includes("tire"),
        isLogo: (n: string, m: string) => m.toLowerCase().includes("badge") || m.toLowerCase().includes("logo"),
        isHeadlight: (n: string, m: string) => m === "BM_Light_Max1",
        isHidden: (n: string, m: string) => false
    },
    "X5": {
        path: "/models/bmw/x5/scene_opt.glb",
        scale: 155.35, position: [0, -1.7, 0], rotation: [0, 0, 0],
        wheelRadius: 0.0030,
        wheelPositions: {
            fr: [0.00935, 0.0040, 0.01585], br: [0.00935, 0.0040, -0.01389],
            fl: [-0.00935, 0.0040, 0.01585], bl: [-0.00935, 0.0040, -0.01389]
        },
        isBodyPart: (n: string, m: string) => m.toLowerCase().includes("paint") || n.toLowerCase().includes("carpaint"),
        isInteriorPart: (n: string, m: string) => m.toLowerCase() === "grille" || m.toLowerCase().includes("fabric"),
        isSeatPart: (n: string, m: string) => m.toLowerCase() === "grille" || m.toLowerCase().includes("fabric"),
        isTrim: (n: string, m: string) => (m.toLowerCase().includes("plastic") || m.toLowerCase().includes("int_mat") || m.toLowerCase().includes("leather") || m.toLowerCase().includes("stit") || m.toLowerCase().includes("dummy") || m.toLowerCase().includes("chrome") || m.toLowerCase().includes("chassis") || m.toLowerCase().includes("engine") || m.toLowerCase().includes("speaker") || m.toLowerCase().includes("grille_int")) && !m.toLowerCase().includes("tire") && !m.toLowerCase().includes("badge") && !m.toLowerCase().includes("light") && !n.toLowerCase().includes("light"),
        isGlass: (n: string, m: string) => (m.toLowerCase().includes("glass") || m.toLowerCase().includes("windows")) && !m.toLowerCase().includes("red") && !m.toLowerCase().includes("orange") && !n.toLowerCase().includes("light") && !m.toLowerCase().includes("light"),
        isRim: (n: string, m: string) => (m.toLowerCase().includes("rim") || m.toLowerCase().includes("disk") || n.toLowerCase().includes("rim") || n.toLowerCase().includes("disk")) && !n.toLowerCase().includes("caliper"),
        isLogo: (n: string, m: string) => m.toLowerCase().includes("badge") || m.toLowerCase().includes("emblem") || m.toLowerCase().includes("logo"),
        isHeadlight: (n: string, m: string) => n.toLowerCase().includes("light") || m.toLowerCase().includes("light"),
        isHidden: (n: string, m: string) => false
    }
};

export function CarModel({ brand, model, color, wheel, detail, coating }: CarModelProps) {
    const config = MODEL_CONFIGS[model] || MODEL_CONFIGS["M5"];

    // Зачищаем кэш моделей и выгружаем неактивные из памяти
    useEffect(() => {
        Object.values(MODEL_CONFIGS).forEach(cfg => {
            if (cfg.path !== config.path) {
                useGLTF.clear(cfg.path);
            }
        });
    }, [config.path]);

    const { scene } = useGLTF(config.path) as any;
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    const [currentWheelTexture, setCurrentWheelTexture] = useState<THREE.Texture | null>(null);

    useEffect(() => {
        if (!wheel || wheel.startsWith("w")) {
            setCurrentWheelTexture(prev => { prev?.dispose(); return null; });
            return;
        }
        const match = wheel.match(/\d+/);
        if (match) {
            let active = true;
            const texturePath = `/wheels/${brand.toLowerCase()}/wheel${match[0]}.png`;
            new THREE.TextureLoader().load(texturePath, (texture) => {
                if (!active) { texture.dispose(); return; }
                texture.flipY = false;
                texture.anisotropy = 4; // Reduced from 16 for better perf
                texture.colorSpace = THREE.SRGBColorSpace;
                setCurrentWheelTexture(prev => { prev?.dispose(); return texture; });
            });
            return () => { active = false; };
        }
    }, [brand, wheel]);

    const [leatherTexture, setLeatherTexture] = useState<THREE.Texture | null>(null);
    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load("/models/bmw/m4_v2/textures/ARm4_color_interior_normal.png", (tex) => {
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(4, 4);
            setLeatherTexture(tex);
        });
    }, []);

    useEffect(() => {
        const currentColor = color && COLOR_MAP[color] ? COLOR_MAP[color] : "#0036cc";
        const currentInteriorColor = detail && INTERIOR_COLOR_MAP[detail] ? INTERIOR_COLOR_MAP[detail] : "#111111";

        clonedScene.traverse((node: any) => {
            if (!node.isMesh) return;
            const mesh = node as THREE.Mesh;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

            mats.forEach((m, i) => {
                const mat = m as THREE.MeshStandardMaterial;
                if (!mat.userData.cloned) {
                    const cloned = mat.clone(); cloned.userData.cloned = true;
                    if (Array.isArray(mesh.material)) mesh.material[i] = cloned; else mesh.material = cloned;
                }
                let current = (Array.isArray(mesh.material) ? mesh.material[i] : mesh.material) as THREE.MeshStandardMaterial;
                const name = mesh.name.toLowerCase();
                const matName = (current.name || "").toLowerCase();

                const isHidden = config.isHidden ? config.isHidden(name, matName) : false;
                if (isHidden) {
                    mesh.visible = false;
                    return;
                }

                const isBodyPart = config.isBodyPart(name, matName);
                const isInteriorLeather = config.isInteriorPart(name, matName);
                const isSeatPart = config.isSeatPart(name, matName);
                const isGlass = config.isGlass(name, matName);
                const isHeadlight = config.isHeadlight ? config.isHeadlight(name, matName) : false;
                const isRedLight = matName.includes("red") || name.includes("rearlight") || name.includes("brakelight");

                const isLogo = config.isLogo ? config.isLogo(name, matName) : false;

                const isRim = config.isRim(name, matName);
                const isBrake = name.includes("brake");
                const isTire = name.includes("tire") || name.includes("tyre") || matName.includes("sidewall") || matName.includes("michelin") || name.includes("rubber");
                const isTrim = config.isTrim(name, matName) && !isBodyPart && !isInteriorLeather && !isSeatPart && !isGlass && !isRim && !isBrake && !isTire && !isLogo && !isHeadlight;

                if (isHeadlight) {
                    mesh.visible = true;
                    if (isRedLight) {
                        current.color.set("#cc0000"); // Насыщенный красный, но не кислотный
                        if (current.emissive) {
                            current.emissive.set("#330000"); // Очень слабое свечение для глубины
                            current.emissiveIntensity = 0.1;
                        }
                        current.transparent = true;
                        current.opacity = 0.8; // Достаточно плотно, чтобы быть красным
                        current.depthWrite = false; // Чтобы не было артефактов наложения
                        current.needsUpdate = true;
                        return;
                    }
                    // Для остальных фар (передних) оставляем оригинал
                    return;
                }

                if (isBodyPart && !(current as any).isMeshPhysicalMaterial) {
                    const physMat = new THREE.MeshPhysicalMaterial();
                    physMat.name = current.name; physMat.normalMap = current.normalMap;
                    if (current.normalScale) physMat.normalScale.copy(current.normalScale);
                    physMat.envMap = current.envMap; physMat.envMapIntensity = current.envMapIntensity;
                    physMat.side = current.side; physMat.transparent = current.transparent;
                    physMat.opacity = current.opacity; physMat.userData = { ...current.userData };
                    if (Array.isArray(mesh.material)) mesh.material[i] = physMat; else mesh.material = physMat;
                    current = physMat;
                }

                if (isBodyPart) {
                    const pc = current as THREE.MeshPhysicalMaterial;
                    pc.color.set(currentColor); pc.map = null;
                    if (pc.emissive) pc.emissive.set("#000000");
                    if (coating === "GLOSSY") {
                        pc.roughness = 0.5; pc.metalness = 0.1; pc.clearcoat = 1.0; pc.clearcoatRoughness = 0.05;
                    } else if (coating === "MATTE") {
                        pc.roughness = 0.334; pc.metalness = 0.297; pc.clearcoat = 1.0; pc.clearcoatRoughness = 0.492;
                    } else {
                        pc.roughness = 0.3; pc.metalness = 0.8; pc.clearcoat = 1.0; pc.clearcoatRoughness = 0.1;
                    }
                    mesh.visible = true;

                } else if (isInteriorLeather || isSeatPart) {
                    const isBlack = currentInteriorColor?.toLowerCase() === "#000000" ||
                        currentInteriorColor?.toLowerCase() === "#111111" ||
                        currentInteriorColor?.toLowerCase() === "#0a0a0a";

                    current.color.set(currentInteriorColor);
                    if (model === "M5" && leatherTexture) {
                        current.normalMap = leatherTexture;
                        current.normalScale.set(1.5, 1.5);
                    }
                    current.map = null;
                    current.needsUpdate = true;

                    // Усиливаем черный: убираем отражения и делаем максимально матовым
                    current.roughness = isBlack ? 1.0 : 0.6;
                    current.metalness = 0;
                    current.envMapIntensity = isBlack ? 0.1 : 1.0;
                    if (current.emissive) current.emissive.set("#000000");

                    mesh.visible = true;
                } else if (isTrim && !isGlass && !isRim && !isBrake) {
                    current.color.set("#0a0a0a"); current.map = null;
                    if (current.emissive) current.emissive.set("#000000");
                    current.roughness = 0.3; current.metalness = 0.2;
                    mesh.visible = true;
                } else if (isGlass) {
                    if (matName.includes("red")) {
                        current.color.set("#990000");
                        current.opacity = 0.7;
                        current.transparent = true;
                        current.depthWrite = false;
                        current.needsUpdate = true;
                    } else {
                        // Тот самый стиль как у M5
                        current.color.set("#050505"); 
                        current.opacity = 0.35; 
                        current.roughness = 0.05;
                        current.metalness = 0.8;
                        current.transparent = true;
                        current.depthWrite = false;
                        current.needsUpdate = true;
                    }
                    mesh.visible = true;

                } else if (isRim) {
                    if (currentWheelTexture) {
                        mesh.visible = false;
                    } else {
                        mesh.visible = true;
                        current.color.set("#111111");
                        current.map = null;
                    }


                } else if (name.includes("disc") || name.includes("caliper") || matName.includes("disc") || matName.includes("caliper") || isBrake) {
                    current.color.set("#111111");
                    current.map = null;
                    mesh.visible = true;

                } else if (isTire) {
                    current.color.set("#0a0a0a");
                    current.roughness = 1.0;
                    mesh.visible = true;
                } else if (isLogo) {
                    mesh.visible = true;
                    current.transparent = true;
                    current.opacity = 1.0;
                    current.polygonOffset = true;
                    current.polygonOffsetFactor = -1; // Pull decal forward to prevent Z-fighting with hood
                } else {
                    mesh.visible = true;
                }
                current.needsUpdate = true;
            });

        });
    }, [clonedScene, color, wheel, detail, coating, currentWheelTexture, leatherTexture, config, model]);

    const [textureAspect, setTextureAspect] = useState(1);
    useEffect(() => {
        if (currentWheelTexture && currentWheelTexture.image) {
            const img = currentWheelTexture.image as HTMLImageElement;
            if (img.width && img.height) setTextureAspect(img.width / img.height);
        }
    }, [currentWheelTexture]);

    return (
        <group>
            <primitive object={clonedScene} scale={config.scale} position={config.position} rotation={config.rotation || [0, 0, 0]} />
            {currentWheelTexture && (
                <group scale={config.scale} position={config.position} rotation={config.rotation || [0, 0, 0]}>
                    <mesh position={config.wheelPositions.fr} rotation={config.wheelBaseRotationR || [0, Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[config.wheelRadius, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                    <mesh position={config.wheelPositions.rr || config.wheelPositions.br} rotation={config.wheelBaseRotationR || [0, Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[config.wheelRadius, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                    <mesh position={config.wheelPositions.fl} rotation={config.wheelBaseRotationL || [0, -Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[config.wheelRadius, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                    <mesh position={config.wheelPositions.rl || config.wheelPositions.bl} rotation={config.wheelBaseRotationL || [0, -Math.PI / 2, 0]} scale={[textureAspect, 1, 1]}>
                        <circleGeometry args={[config.wheelRadius, 64]} />
                        <meshBasicMaterial map={currentWheelTexture} transparent={true} depthWrite={false} polygonOffset polygonOffsetFactor={-4} />
                    </mesh>
                </group>
            )}
        </group>
    );

}

// useGLTF.preload removed for on-demand loading
