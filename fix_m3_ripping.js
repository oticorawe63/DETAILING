
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Analyzing Paint Materials and Meshes:");
data.meshes.forEach((mesh, mIdx) => {
    mesh.primitives.forEach((prim, pIdx) => {
        const mat = data.materials[prim.material];
        const mName = mat ? mat.name.toLowerCase() : "";
        if (mName.includes("body") || mName.includes("paint")) {
            const accessor = data.accessors[prim.attributes.POSITION];
            console.log(`Mesh ${mIdx} (${mesh.name}) Prim ${pIdx} Mat: ${mat.name} BBox: [${accessor.min}] to [${accessor.max}]`);
        }
    });
});
