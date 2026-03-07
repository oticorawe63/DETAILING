const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

// Mesh 22 is Object_28 (the main high-poly body)
const mesh = data.meshes[22];
const prim = mesh.primitives[0];
const acc = data.accessors[prim.attributes.POSITION];

console.log(`Mesh 22 BBox: Min=[${acc.min.join(',')}] Max=[${acc.max.join(',')}]`);

const center = [
    (acc.min[0] + acc.max[0]) / 2,
    (acc.min[1] + acc.max[1]) / 2,
    (acc.min[2] + acc.max[2]) / 2
];

console.log(`Center of Mesh 22: [${center.join(',')}]`);

// Now let's calculate the world position after scale [0.22, 0.22, 0.22] and translation [0.0, -1.2, 0.05]
const scale = 0.22;
const translation = [0.0, -1.2, 0.05];

const worldCenter = [
    center[0] * scale + translation[0],
    center[1] * scale + translation[1],
    center[2] * scale + translation[2]
];

console.log(`World Center of M3: [${worldCenter.join(',')}]`);
