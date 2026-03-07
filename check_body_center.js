
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const bodyMesh = data.meshes.find(m => m.name && m.name.includes('ARm4_body'));
if (bodyMesh) {
    const prim = bodyMesh.primitives[0];
    const accessor = data.accessors[prim.attributes.POSITION];
    console.log(`Body Mesh Bounding Box X: min=${accessor.min[0]}, max=${accessor.max[0]}`);
    console.log(`Body Center X: ${(accessor.min[0] + accessor.max[0]) / 2}`);
}
