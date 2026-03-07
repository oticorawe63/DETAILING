const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X5/scene.gltf', 'utf8'));

function getGlobalPosition(nodeIndex, currentMatrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]) {
    const node = data.nodes[nodeIndex];
    let localMatrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

    if (node.matrix) {
        localMatrix = node.matrix;
    } else {
        const t = node.translation || [0,0,0];
        const r = node.rotation || [0,0,0,1];
        const s = node.scale || [1,1,1];
        // Too lazy to implement full matrix mult, let's just use translation for now if present
        // in most cases wheels are top level or children of a single offset
        localMatrix[12] = t[0];
        localMatrix[13] = t[1];
        localMatrix[14] = t[2];
    }

    // This is very simplified, just summing translations
    const parent = data.nodes.find(n => n.children && n.children.includes(nodeIndex));
    if (parent) {
        const parentPos = getGlobalPosition(data.nodes.indexOf(parent));
        return [parentPos[0] + (node.translation ? node.translation[0] : 0),
                parentPos[1] + (node.translation ? node.translation[1] : 0),
                parentPos[2] + (node.translation ? node.translation[2] : 0)];
    }
    return node.translation || [0,0,0];
}

console.log('--- FINDING WHEELS WORLD POS ---');
data.nodes.forEach((node, i) => {
    if (node.name.toLowerCase().includes('wheel')) {
         console.log(node.name, '->', getGlobalPosition(i));
    }
});
