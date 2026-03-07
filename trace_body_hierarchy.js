
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

function findParent(targetIdx) {
    for (let i = 0; i < data.nodes.length; i++) {
        if (data.nodes[i].children && data.nodes[i].children.includes(targetIdx)) {
            return i;
        }
    }
    return -1;
}

let nodeIdx = 282; // ARm4_body
while (nodeIdx !== -1) {
    const node = data.nodes[nodeIdx];
    console.log(`Node ${nodeIdx} (${node.name}): scale=${JSON.stringify(node.scale)}, translation=${JSON.stringify(node.translation)}, matrix X=${node.matrix ? node.matrix[12] : 0}`);
    nodeIdx = findParent(nodeIdx);
}
