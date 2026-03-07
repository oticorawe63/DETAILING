
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X6/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Materials in X6:");
data.materials.forEach((m, i) => {
    console.log(`${i}: ${m.name}`);
});

console.log("\nNodes with mesh analysis:");
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const mats = mesh.primitives.map(p => data.materials[p.material].name);
        console.log(`Node ${i} (${n.name}): Mesh ${n.mesh}, Materials: [${mats.join(', ')}]`);
    }
});

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

// Check some likely nodes for body
[0, 1, 2, 3, 4, 5, 20, 40].forEach(i => {
    if (data.nodes[i] && data.nodes[i].mesh !== undefined) {
        console.log(`Node ${i} center:`, getCenter(i));
    }
});
