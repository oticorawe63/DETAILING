
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X6/scene.gltf', 'utf8'));

const pmap = {};
data.nodes.forEach((n, i) => {
    if (n.children) n.children.forEach(c => pmap[c] = i);
});

function multiply(m1, m2) {
    const res = new Array(16).fill(0);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                res[i + j * 4] += m1[i + k * 4] * m2[k + j * 4];
            }
        }
    }
    return res;
}

function getMatrix(id) {
    const n = data.nodes[id];
    if (n.matrix) return n.matrix;
    // T*R*S
    let m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    // This is simplified. I'll just check if there is a matrix.
    return m;
}

function getWorldMatrix(id) {
    let m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    let curr = id;
    const path = [];
    while (curr !== undefined) {
        path.push(curr);
        curr = pmap[curr];
    }
    path.reverse();
    path.forEach(nodeId => {
        const node = data.nodes[nodeId];
        let localM = node.matrix ? node.matrix : [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
        if (!node.matrix && (node.translation || node.scale || node.rotation)) {
             // simplified: only translation
             if (node.translation) {
                 localM[12] = node.translation[0];
                 localM[13] = node.translation[1];
                 localM[14] = node.translation[2];
             }
        }
        m = multiply(m, localM);
    });
    return m;
}

console.log("X6 Wheel World Positions (Z-up vs Y-up?)");
const wheelIdentifiers = ['fl', 'fr', 'rl', 'rr'];
data.nodes.forEach((n, i) => {
    if (n.name && n.name.toLowerCase().includes('wheel') && n.name.includes('_0')) {
        const m = getWorldMatrix(i);
        console.log(`Node ${i} (${n.name}): Pos: [${m[12].toFixed(3)}, ${m[13].toFixed(3)}, ${m[14].toFixed(3)}]`);
    }
});
