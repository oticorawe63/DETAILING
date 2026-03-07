
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Meshes with material 'ARm4_main':");
data.meshes.forEach((mesh, index) => {
    const prim = mesh.primitives ? mesh.primitives[0] : null;
    if (!prim) return;
    const matIndex = prim.material;
    const matName = matIndex !== undefined && data.materials[matIndex] ? data.materials[matIndex].name : "Unknown";
    
    if (matName === 'ARm4_main') {
        console.log(`Mesh ${index}: ${mesh.name}`);
    }
});

