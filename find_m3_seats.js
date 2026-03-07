
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Nodes with 'seat':");
data.nodes.forEach((node, i) => {
    if (node.name && node.name.toLowerCase().includes('seat')) {
        console.log(`Node ${i}: ${node.name} (Mesh: ${node.mesh})`);
        if (node.mesh !== undefined) {
             const mesh = data.meshes[node.mesh];
             mesh.primitives.forEach(p => {
                 console.log(`  Primitive Material: ${data.materials[p.material].name}`);
             });
        }
    }
});

console.log("\nSearching for Light Gray materials (> 0.4 on all RGB):");
data.materials.forEach((mat, i) => {
    if (mat.pbrMetallicRoughness && mat.pbrMetallicRoughness.baseColorFactor) {
        const c = mat.pbrMetallicRoughness.baseColorFactor;
        if (c[0] > 0.4 && c[1] > 0.4 && c[2] > 0.4) {
            console.log(`[${i}] ${mat.name} - Color: ${c}`);
        }
    }
});
