
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

let minX = Infinity, maxX = -Infinity;

data.meshes.forEach(mesh => {
    mesh.primitives.forEach(prim => {
        if (prim.attributes && prim.attributes.POSITION !== undefined) {
            const accessor = data.accessors[prim.attributes.POSITION];
            if (accessor.min && accessor.max) {
                minX = Math.min(minX, accessor.min[0]);
                maxX = Math.max(maxX, accessor.max[0]);
            }
        }
    });
});

console.log(`Bounding Box X: min=${minX}, max=${maxX}`);
console.log(`Center X: ${(minX + maxX) / 2}`);
console.log(`Suggested Offset X: ${-((minX + maxX) / 2)}`);
