
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X6/scene.gltf', 'utf8'));

console.log("Nodes with mesh centers:");
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const acc = data.accessors[mesh.primitives[0].attributes.POSITION];
        const center = [
            (acc.min[0] + acc.max[0]) / 2,
            (acc.min[1] + acc.max[1]) / 2,
            (acc.min[2] + acc.max[2]) / 2
        ];
        if (n.name.toLowerCase().includes('rim') || n.name.toLowerCase().includes('wheel')) {
            console.log(`Node ${i} (${n.name}): Center:`, center, "Mesh:", n.mesh);
        }
    }
});
