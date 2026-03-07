const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/NEW 3D X5/scene.gltf', 'utf8'));

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
    const t = node.translation || [0, 0, 0];
    const r = node.rotation || [0, 0, 0, 1];
    const s = node.scale || [1, 1, 1];
    
    // Simplification: only translation for now to check wheelbase
    const m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
    m[12] = t[0]; m[13] = t[1]; m[14] = t[2];
    // TODO: Full transform if needed
    return m;
}

const worldMatrices = {};
function traverse(nodeIdx, parentMatrix) {
    const node = data.nodes[nodeIdx];
    const local = getMatrix(node);
    const world = parentMatrix ? mult(parentMatrix, local) : local;
    worldMatrices[nodeIdx] = world;
    if (node.children) {
        node.children.forEach(child => traverse(child, world));
    }
}

data.scenes[0].nodes.forEach(n => traverse(n, null));

console.log('--- ANALYSIS ---');
Object.keys(worldMatrices).forEach(idx => {
    const n = data.nodes[idx];
    const m = worldMatrices[idx];
    if (n.name.toLowerCase().includes('ani_wheel')) {
         console.log(n.name, 'Pos:', [m[12], m[13], m[14]]);
    }
});
