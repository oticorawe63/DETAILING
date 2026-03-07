
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

data.nodes.forEach((node, idx) => {
    if (node.translation) {
        console.log(`Node ${idx} (${node.name}): translation=${JSON.stringify(node.translation)}`);
    }
    if (node.matrix) {
        console.log(`Node ${idx} (${node.name}): matrix X=${node.matrix[12]}`);
    }
});
const scene = data.scenes[0];
scene.nodes.forEach(rootIdx => {
    const rootNode = data.nodes[rootIdx];
    console.log(`Root Node ${rootIdx} (${rootNode.name}): translation=${JSON.stringify(rootNode.translation)}`);
});
