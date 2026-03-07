
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const intNode = data.nodes[53];
console.log(`Node 53: ${intNode.name}, children: ${intNode.children}`);
if (intNode.children) {
    intNode.children.forEach(childIdx => {
        const child = data.nodes[childIdx];
        console.log(`  Child Node ${childIdx}: ${child.name} (Mesh: ${child.mesh})`);
        if (child.mesh !== undefined) {
             const mesh = data.meshes[child.mesh];
             mesh.primitives.forEach(p => {
                 console.log(`    Primitive Mat: ${data.materials[p.material].name}`);
             });
        }
    });
}
