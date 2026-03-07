
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Meshes using body_color:");
data.meshes.forEach((mesh, mIdx) => {
    mesh.primitives.forEach((prim, pIdx) => {
        const mat = data.materials[prim.material];
        if (mat && (mat.name.toLowerCase().includes("body_color") || mat.name.toLowerCase().includes("exterior_body"))) {
            const acc = data.accessors[prim.attributes.POSITION];
            console.log(`Mesh ${mIdx} (Node/Mesh: ${mesh.name}) Material: ${mat.name}`);
            console.log(`  BBox: Min [${acc.min.map(v=>v.toFixed(2)).join(', ')}] Max [${acc.max.map(v=>v.toFixed(2)).join(', ')}]`);
        }
    });
});
