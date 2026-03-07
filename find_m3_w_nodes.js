
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

[64, 74, 84, 94].forEach(idx => {
    const node = data.nodes[idx];
    console.log(`Node ${idx} (${node.name}): translation=${JSON.stringify(node.translation)}`);
});
