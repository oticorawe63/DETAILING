
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

data.nodes.forEach((node, idx) => {
    if (node.translation && (node.translation[0] > 0.4 || node.translation[0] < -0.4)) {
        console.log(`Node ${idx} (${node.name}): translation=${JSON.stringify(node.translation)}`);
        if (node.mesh !== undefined) {
             console.log(`  Mesh: ${data.meshes[node.mesh].name}`);
        }
    }
});
