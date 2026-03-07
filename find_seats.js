
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

if (data.nodes) {
    data.nodes.forEach((node, i) => {
        if (node.name && node.name.toLowerCase().includes('seat')) {
            console.log(`Node ${i}: ${node.name}`);
        }
    });
}
if (data.meshes) {
    data.meshes.forEach((mesh, i) => {
        if (mesh.name && mesh.name.toLowerCase().includes('seat')) {
            console.log(`Mesh ${i}: ${mesh.name}`);
        }
    });
}
