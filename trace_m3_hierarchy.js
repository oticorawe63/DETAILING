
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const node71 = data.nodes[71];
console.log(`Node 71 (Body?): translation=${node71.translation}, matrix=${node71.matrix}`);

function findRootChild(idx) {
    let curr = idx;
    while (true) {
        let parent = data.nodes.findIndex(n => n.children && n.children.includes(curr));
        if (parent === -1) return curr;
        curr = parent;
    }
}
const rootOf71 = findRootChild(71);
console.log(`Root of 71 is Node ${rootOf71}`);
console.log(`Node ${rootOf71} Scale: ${data.nodes[rootOf71].scale}`);
console.log(`Node ${rootOf71} Translation: ${data.nodes[rootOf71].translation}`);
console.log(`Node ${rootOf71} Matrix: ${data.nodes[rootOf71].matrix}`);

// Node 1
console.log(`Node 1: ${data.nodes[1].name} Scale: ${data.nodes[1].scale}`);
console.log(`Node 1: Translation: ${data.nodes[1].translation}`);
console.log(`Node 1: Matrix: ${data.nodes[1].matrix}`);
