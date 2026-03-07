
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const m22 = data.meshes[22];
const m23 = data.meshes[23];
console.log(`Mesh 22 uses Mat: ${data.materials[m22.primitives[0].material].name}, Verts: ${data.accessors[m22.primitives[0].attributes.POSITION].count}`);
console.log(`Mesh 23 uses Mat: ${data.materials[m23.primitives[0].material].name}, Verts: ${data.accessors[m23.primitives[0].attributes.POSITION].count}`);
