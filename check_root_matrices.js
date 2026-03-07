
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Node 0 Matrix:", JSON.stringify(data.nodes[0].matrix, null, 2));
console.log("Node 1 Matrix:", JSON.stringify(data.nodes[1].matrix, null, 2));
console.log("Node 2 Matrix:", JSON.stringify(data.nodes[2].matrix, null, 2));
