
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const node2 = data.nodes[2];
console.log(`Node 2 children: ${node2.children}`);
node2.children.forEach(c => {
    console.log(`  Child ${c}: ${data.nodes[c].name} (Translation: ${data.nodes[c].translation}, Scale: ${data.nodes[c].scale})`);
    if (data.nodes[c].children) {
        data.nodes[c].children.forEach(cc => {
            console.log(`    Sub-child ${cc}: ${data.nodes[cc].name} (Translation: ${data.nodes[cc].translation}, Mesh: ${data.nodes[cc].mesh})`);
        });
    }
});
