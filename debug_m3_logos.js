
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Meshes using body_color:");
[22, 23].forEach(mIdx => {
    const mesh = data.meshes[mIdx];
    console.log(`Mesh ${mIdx} (Node: ${data.nodes.findIndex(n => n.mesh === mIdx)})`);
});

console.log("Checking BMW Logo materials:");
data.materials.forEach((mat, i) => {
    if (mat.name.toLowerCase().includes('bmw_logo')) {
        console.log(`Mat ${i}: ${mat.name}`);
        if(mat.pbrMetallicRoughness) {
             console.log(`  baseColor: ${mat.pbrMetallicRoughness.baseColorFactor}`);
             console.log(`  texture: ${mat.pbrMetallicRoughness.baseColorTexture ? mat.pbrMetallicRoughness.baseColorTexture.index : 'none'}`);
        }
    }
});
