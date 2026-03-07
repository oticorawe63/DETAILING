const fs = require('fs');

function getCenter(path, scale, pos) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    // Finding a mesh that is likely the body.
    // For M5, let's look for mesh with many indices.
    let bestMesh = data.meshes[0];
    let maxIdx = 0;
    data.meshes.forEach((m, i) => {
        if (m.primitives[0].attributes.POSITION) {
            const acc = data.accessors[m.primitives[0].attributes.POSITION];
            if (acc.count > maxIdx) {
                maxIdx = acc.count;
                bestMesh = m;
            }
        }
    });

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

console.log("M3 World Center:", getCenter('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf', 0.22, [0, -1.2, 0.05]));
// M4 and M5 might be GLB now, so I'd need to parse GLB if I want automated check but let's assume M5 is [0, 0, 0] or near it.
