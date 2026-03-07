
const fs = require('fs');
const THREE = require('three');
const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
// Node doesn't run GLTFLoader easily without a mocked DOM or using tiny-gltf.
// Let's just use the mesh bounding box approach we did earlier, but accumulating world matrices.
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

let nodes = data.nodes;
let wheels = [];
nodes.forEach((node, idx) => {
    if (node.name && node.name.toLowerCase().includes('vt_wheel')) {
        let matrix = node.matrix ? node.matrix : [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
        if (node.translation) {
            matrix[12] = node.translation[0];
            matrix[13] = node.translation[1];
            matrix[14] = node.translation[2];
        }
        console.log("Wheel Node:", node.name, "Pos:", [matrix[12], matrix[13], matrix[14]]);
    }
});
