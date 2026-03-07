
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X6/scene.gltf', 'utf8'));

const pmap = {};
data.nodes.forEach((n, i) => {
    if (n.children) n.children.forEach(c => pmap[c] = i);
});

function getWorldPos(id) {
    let pos = [0, 0, 0];
    let curr = id;
    while (curr !== undefined) {
        const n = data.nodes[curr];
        if (n.translation) {
            pos[0] += n.translation[0];
            pos[1] += n.translation[1];
            pos[2] += n.translation[2];
        }
        curr = pmap[curr];
    }
    return pos;
}

console.log("Wheel/Rim World Positions in X6 GLTF:");
data.nodes.forEach((n, i) => {
    if (n.name && (n.name.toLowerCase().includes('wheel') || n.name.toLowerCase().includes('rim')) && n.children) {
        console.log(`Node ${i} (${n.name}):`, getWorldPos(i));
    }
});
