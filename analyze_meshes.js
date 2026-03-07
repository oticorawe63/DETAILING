
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Mesh Analysis for M4:");
if (data.meshes) {
    data.meshes.forEach((mesh, i) => {
        let matName = "Unknown";
        if (mesh.primitives && mesh.primitives[0] && mesh.primitives[0].material !== undefined) {
            matName = data.materials[mesh.primitives[0].material].name;
        }
        console.log(`Mesh ${i} - Name: ${mesh.name} - Mat: ${matName}`);
    });
}
