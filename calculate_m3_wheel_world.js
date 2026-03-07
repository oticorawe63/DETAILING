
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

function getNodeWorldX(idx) {
    let node = data.nodes[idx];
    let x = 0;
    if (node.translation) x = node.translation[0];
    else if (node.matrix) x = node.matrix[12];
    
    // Find parent
    const parentIdx = data.nodes.findIndex(n => n.children && n.children.includes(idx));
    if (parentIdx !== -1) {
        return x + getNodeWorldX(parentIdx);
    }
    return x;
}

function getNodeWorldY(idx) {
    let node = data.nodes[idx];
    let y = 0;
    if (node.translation) y = node.translation[1];
    else if (node.matrix) y = node.matrix[13];
    const parentIdx = data.nodes.findIndex(n => n.children && n.children.includes(idx));
    if (parentIdx !== -1) return y + getNodeWorldY(parentIdx);
    return y;
}

function getNodeWorldZ(idx) {
    let node = data.nodes[idx];
    let z = 0;
    if (node.translation) z = node.translation[2];
    else if (node.matrix) z = node.matrix[14];
    const parentIdx = data.nodes.findIndex(n => n.children && n.children.includes(idx));
    if (parentIdx !== -1) return z + getNodeWorldZ(parentIdx);
    return z;
}

const scale = 0.22;
console.log(`M3 World Wheel Positions (Scaled by ${scale}):`);
[64, 74, 84, 94].forEach(idx => {
    const node = data.nodes[idx];
    const x = getNodeWorldX(idx);
    const y = getNodeWorldY(idx);
    const z = getNodeWorldZ(idx);
    // The model is rotated [0, PI, 0] by default in Three.js? 
    // Wait, M3 rotation is [0, 0, 0] in my config.
    // Sketchfab often has Y as up in the file, but GLTF is Y-up.
    // However, some Sketchfab exporters put everything in a root node with rotation.
    // Let's check Node 0 matrix again.
    // Node 0 Matrix: 1, 0, 0, 0, 0, 2.22e-16, -1, 0, 0, 1, 2.22e-16, 0, 0, 0, 0, 1
    // This looks like X:1, Y: (Z), Z: (-Y). A swap.
    
    console.log(`${node.name}: [${(x * scale).toFixed(3)}, ${(y * scale).toFixed(3)}, ${(z * scale).toFixed(3)}]`);
});
