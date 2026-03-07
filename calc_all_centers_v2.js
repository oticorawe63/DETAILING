const fs = require('fs');

function getCenter(path, scale, pos) {
    if (!fs.existsSync(path)) return null;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    let bestMesh = null;
    let maxIdx = 0;
    
    data.meshes.forEach((m) => {
        if (m.primitives[0].attributes.POSITION !== undefined) {
            const acc = data.accessors[m.primitives[0].attributes.POSITION];
            if (acc.count > maxIdx) {
                maxIdx = acc.count;
                bestMesh = m;
            }
        }
    });

    if (!bestMesh) return null;

    const acc = data.accessors[bestMesh.primitives[0].attributes.POSITION];
    const center = [
        (acc.min[0] + acc.max[0]) / 2,
        (acc.min[1] + acc.max[1]) / 2,
        (acc.min[2] + acc.max[2]) / 2
    ];

    return [
        center[0] * scale + pos[0],
        center[1] * scale + pos[1],
        center[2] * scale + pos[2]
    ];
}

console.log("M5 Center:", getCenter('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M5/bmw_m5_f90.gltf', 1.1, [0, -1.2, 0]));
console.log("M4 Center:", getCenter('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M4/scene.gltf', 0.22, [0, -1.2, 0.25]));
console.log("M3 Center:", getCenter('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf', 0.22, [0, -1.2, 0.05]));
