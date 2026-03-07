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

const g1 = data.nodes[3];
g1.children.forEach(c => {
    const n = data.nodes[c];
    const world = map[c];
    if (n.mesh !== undefined) {
        const mesh = data.meshes[n.mesh];
        const acc = data.accessors[mesh.primitives[0].attributes.POSITION];
        const center = acc.max.map((v, i) => (v+acc.min[i])/2 + world[12+i]); // This is wrong, world[12+i] is translation only for simple matrix
        // Actually world is full matrix.
        const center_local = acc.max.map((v, i) => (v+acc.min[i])/2);
        const center_world = [
            world[0]*center_local[0] + world[4]*center_local[1] + world[8]*center_local[2] + world[12],
            world[1]*center_local[0] + world[5]*center_local[1] + world[9]*center_local[2] + world[13],
            world[2]*center_local[0] + world[6]*center_local[1] + world[10]*center_local[2] + world[14]
        ];
        console.log(`Node ${c}: ${n.name} | Center: ${center_world.map(v => v.toFixed(3))} | Mat: ${data.materials[mesh.primitives[0].material].name}`);
    }
});
