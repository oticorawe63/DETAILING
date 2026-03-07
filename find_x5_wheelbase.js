const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X5/scene.gltf', 'utf8'));

function mult(a, b) {
    const res = new Array(16).fill(0);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                res[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
            }
        }
    }
    return res;
}

function getMatrix(node) {
    if (node.matrix) return node.matrix;
    const t = node.translation || [0,0,0];
    const r = node.rotation || [0,0,0,1];
    const s = node.scale || [1,1,1];
    const m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    m[12] = t[0]; m[13] = t[1]; m[14] = t[2];
    return m;
}

const map = {};
const traverse = (idx, parentMat) => {
    const node = data.nodes[idx];
    const local = getMatrix(node);
    const world = parentMat ? mult(parentMat, local) : local;
    map[idx] = world;
    if (node.children) node.children.forEach(c => traverse(c, world));
};

data.scenes[0].nodes.forEach(n => traverse(n, null));

[4, 43, 57, 83].forEach(idx => {
    const n = data.nodes[idx];
    const w = map[idx];
    console.log(`${n.name} | Pos: ${w[12].toFixed(5)}, ${w[13].toFixed(5)}, ${w[14].toFixed(5)}`);
});
