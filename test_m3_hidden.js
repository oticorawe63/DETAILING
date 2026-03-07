
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

let matches = 0;
data.meshes.forEach((mesh, mIdx) => {
    mesh.primitives.forEach((prim, pIdx) => {
        const mat = data.materials[prim.material];
        if (mat) {
            const mName = mat.name.toLowerCase();
            const nName = (mesh.name || "").toLowerCase();
            // Test current logic
            const isHidden = mName === "exterior_body";
            if (isHidden) matches++;
            if (mName.includes("exterior_body")) {
                console.log(`Mesh ${mIdx} (nName: ${nName}, mName: ${mName}) -> isHidden: ${isHidden}`);
            }
        }
    });
});
console.log(`Matched isHidden: ${matches}`);
