const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

[54, 55, 56, 57, 58, 59, 60, 61, 62, 63].forEach(idx => {
    const node = data.nodes[idx];
    const mesh = data.meshes[node.mesh];
    const acc = data.accessors[mesh.primitives[0].attributes.POSITION];
    console.log(`Node ${idx} (${node.name}): Min=[${acc.min.map(v=>v.toFixed(2)).join(',')}] Max=[${acc.max.map(v=>v.toFixed(2)).join(',')}]`);
});
