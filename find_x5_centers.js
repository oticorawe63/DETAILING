const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X5/scene.gltf', 'utf8'));

// We need the buffer to read coordinates? No, we can just use the accessor's min/max as an approximation
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const mat = data.materials[mesh.primitives[0].material];
        if (n.name.toLowerCase().includes('rim') || n.name.toLowerCase().includes('tire')) {
            const acc = data.accessors[mesh.primitives[0].attributes.POSITION];
            const center = acc.max.map((v, idx) => (v + acc.min[idx]) / 2);
            console.log(`Node: ${n.name}, Material: ${mat.name}, Center: ${center}`);
        }
    }
});
