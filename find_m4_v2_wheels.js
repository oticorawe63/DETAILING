
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Nodes:");
data.nodes.forEach((node, i) => {
    if (node.name && (node.name.toLowerCase().includes('wheel') || node.name.toLowerCase().includes('tire'))) {
        console.log(`Node ${i}: ${node.name} - Translation: ${node.translation}`);
    }
});

let bodyMats = new Set();
data.meshes.forEach((mesh, index) => {
    const prim = mesh.primitives ? mesh.primitives[0] : null;
    if (!prim) return;
    const matIndex = prim.material;
    const matName = matIndex !== undefined && data.materials[matIndex] ? data.materials[matIndex].name : "Unknown";
    
    if (mesh.name && mesh.name.toLowerCase().includes('body')) {
        bodyMats.add(matName);
    }
});
console.log("Body Mats:", Array.from(bodyMats));

