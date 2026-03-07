
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Searching for interior nodes:");
data.nodes.forEach((node, i) => {
    if (node.name && (node.name.toLowerCase().includes('int') || node.name.toLowerCase().includes('interior'))) {
        console.log(`Node ${i}: ${node.name} (Mesh: ${node.mesh})`);
        if (node.mesh !== undefined) {
             const mesh = data.meshes[node.mesh];
             mesh.primitives.forEach(p => {
                 console.log(`  Primitive Material: ${data.materials[p.material].name}`);
             });
        }
    }
});
