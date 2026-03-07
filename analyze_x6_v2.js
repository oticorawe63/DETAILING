
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X6/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Materials in X6:");
data.materials.forEach((m, i) => {
    console.log(`${i}: ${m.name}`);
});

const interiorNodes = [];
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const mats = mesh.primitives.map(p => data.materials[p.material].name);
        if (mats.some(m => m.toLowerCase().includes('interior'))) {
             interiorNodes.push({id: i, name: n.name, mats});
        }
    }
});

console.log("\nInterior nodes:", JSON.stringify(interiorNodes, null, 2));

const glassNodes = [];
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const mats = mesh.primitives.map(p => data.materials[p.material].name);
        if (mats.some(m => m.toLowerCase().includes('glass'))) {
             glassNodes.push({id: i, name: n.name, mats});
        }
    }
});

console.log("\nGlass nodes:", JSON.stringify(glassNodes, null, 2));

function getCenter(idx) {
    const node = data.nodes[idx];
    if (node.mesh === undefined) return null;
    const mesh = data.meshes[node.mesh];
    const acc = data.accessors[mesh.primitives[0].attributes.POSITION];
    return [
        (acc.min[0] + acc.max[0]) / 2,
        (acc.min[1] + acc.max[1]) / 2,
        (acc.min[2] + acc.max[2]) / 2
    ];
}

// Find Body parts
const bodyNodes = [];
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const mats = mesh.primitives.map(p => data.materials[p.material].name);
        if (mats.some(m => m.toLowerCase().includes('paint'))) {
             bodyNodes.push({id: i, name: n.name, mats, center: getCenter(i)});
        }
    }
});
console.log("\nBody nodes:", JSON.stringify(bodyNodes, null, 2));
