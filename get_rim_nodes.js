const fs = require('fs');

function parseGLTF() {
    const gltfData = fs.readFileSync('public/models/bmw/bmw_m5_f90.gltf', 'utf8');
    const json = JSON.parse(gltfData);

    const nodesWithRims = [];
    json.nodes.forEach((node, idx) => {
        if (node.name && (node.name.toLowerCase().includes('rim') || node.name.toLowerCase().includes('wheel')) && !node.name.toLowerCase().includes('blurred')) {
            if (node.mesh !== undefined) {
                nodesWithRims.push(node);
            }
        }
    });

    console.log(`Found ${nodesWithRims.length} rim nodes.`);

    nodesWithRims.forEach(node => {
        console.log(`Node: ${node.name}, Pos: ${JSON.stringify(node.translation || [0, 0, 0])}`);
    });
}

parseGLTF();
