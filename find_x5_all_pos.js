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
    // Return simple translation for now if no matrix
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

console.log('--- ALL MESHES WORLD POS ---');
data.nodes.forEach((n, i) => {
    if (n.mesh !== undefined) {
        const m = map[i];
        const p = [m[12], m[13], m[14]];
        const mesh = data.meshes[n.mesh];
        const acc = data.accessors[mesh.primitives[0].attributes.POSITION];
        if (acc.min && acc.max) {
             const center = acc.max.map((v, idx) => (v + acc.min[idx]) / 2 + p[idx]);
             console.log(`Node ${i}: ${n.name} | Center: ${center.map(v => v.toFixed(3))} | Mat: ${data.materials[mesh.primitives[0].material].name}`);
        }
    }
});
