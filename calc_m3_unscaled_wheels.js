
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

function getNodeWorldMatrix(idx) {
    let node = data.nodes[idx];
    let matrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];

    if (node.matrix) {
        matrix = [...node.matrix];
    } else {
        const t = node.translation || [0, 0, 0];
        const s = node.scale || [1, 1, 1];
        // ignoring rotation for simple translation tracking if there are no rotations... 
        // Wait, Node 0 has a matrix with rotation.
        matrix = [
            s[0], 0, 0, 0,
            0, s[1], 0, 0,
            0, 0, s[2], 0,
            t[0], t[1], t[2], 1
        ];
    }

    const parentIdx = data.nodes.findIndex(n => n.children && n.children.includes(idx));
    if (parentIdx !== -1) {
        const parentMat = getNodeWorldMatrix(parentIdx);
        // Multiply matrices: parentMat * matrix (for point P, WorldP = parentMat * matrix * P)
        const res = new Array(16).fill(0);
        for(let c=0; c<4; c++) {
            for(let r=0; r<4; r++) {
                res[c*4+r] = 
                    parentMat[0*4+r]*matrix[c*4+0] + 
                    parentMat[1*4+r]*matrix[c*4+1] + 
                    parentMat[2*4+r]*matrix[c*4+2] + 
                    parentMat[3*4+r]*matrix[c*4+3];
            }
        }
        return res;
    }
    return matrix;
}

[64, 74, 84, 94].forEach(idx => {
    const node = data.nodes[idx];
    const mat = getNodeWorldMatrix(idx);
    console.log(`${node.name}: [${mat[12].toFixed(3)}, ${mat[13].toFixed(3)}, ${mat[14].toFixed(3)}]`);
});
