
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

data.nodes.forEach((node, idx) => {
    if (node.name && (node.name.toLowerCase().includes('wheel') || node.name.toLowerCase().includes('tire') || node.name.toLowerCase().includes('rim'))) {
        console.log(`Node ${idx} (${node.name}): translation=${JSON.stringify(node.translation)}`);
    }
});
