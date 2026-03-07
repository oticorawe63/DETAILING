
const fs = require('fs');

function calculateCenter(gltfPath) {
    const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    let minX = Infinity, maxX = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    // Рекурсивно вычисляем мировые смещения нод (упрощенно для основных рутов)
    const nodeTransforms = new Array(data.nodes.length).fill(null).map(() => ({ x: 0, z: 0, scale: 1 }));

    function traverse(nodeIdx, parentX, parentZ, parentScale) {
        const node = data.nodes[nodeIdx];
        let x = parentX + (node.translation ? node.translation[0] : 0);
        let z = parentZ + (node.translation ? node.translation[2] : 0);
        if (node.matrix) {
            x += node.matrix[12];
            z += node.matrix[14];
        }
        let scale = parentScale * (node.scale ? node.scale[0] : 1);
        
        nodeTransforms[nodeIdx] = { x, z, scale };

        if (node.children) {
            node.children.forEach(childIdx => traverse(childIdx, x, z, scale));
        }
    }

    // Ищем рутовые ноды в сценах
    data.scenes.forEach(scene => {
        scene.nodes.forEach(nodeIdx => traverse(nodeIdx, 0, 0, 1));
    });

    data.meshes.forEach((mesh, mIdx) => {
        // Находим ноду, которая использует этот меш (упрощенно берем первую попавшуюся)
        const nodeIdx = data.nodes.findIndex(n => n.mesh === mIdx);
        if (nodeIdx === -1) return;

        const transform = nodeTransforms[nodeIdx];

        mesh.primitives.forEach(prim => {
            if (prim.attributes && prim.attributes.POSITION !== undefined) {
                const accessor = data.accessors[prim.attributes.POSITION];
                if (accessor.min && accessor.max) {
                    // Применяем масштаб и смещение ноды к границам меша
                    minX = Math.min(minX, accessor.min[0] * transform.scale + transform.x);
                    maxX = Math.max(maxX, accessor.max[0] * transform.scale + transform.x);
                    minZ = Math.min(minZ, accessor.min[2] * transform.scale + transform.z);
                    maxZ = Math.max(maxZ, accessor.max[2] * transform.scale + transform.z);
                }
            }
        });
    });

    const centerX = (minX + maxX) / 2;
    const centerZ = (minZ + maxZ) / 2;

    return {
        centerX,
        centerZ,
        suggestedOffsetX: -centerX,
        suggestedOffsetZ: -centerZ
    };
}

console.log("--- BMW M4 v2 ---");
try {
    const m4 = calculateCenter('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/NEW 3D M4/scene.gltf');
    console.log(JSON.stringify(m4, null, 2));
} catch(e) { console.log("M4 error: " + e.message); }

console.log("\n--- BMW M3 ---");
try {
    const m3 = calculateCenter('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf');
    console.log(JSON.stringify(m3, null, 2));
} catch(e) { console.log("M3 error: " + e.message); }
