
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Root Scale:", data.nodes[0] ? data.nodes[0].scale : "none");
console.log("Root Matrix:", data.nodes[0] ? data.nodes[0].matrix : "none");

const bodyMeshNode = data.nodes.find(n => n.name && n.name.includes("body"));
if (bodyMeshNode) {
    console.log(`Body Node ${bodyMeshNode.name}: scale=${bodyMeshNode.scale}, translation=${bodyMeshNode.translation}`);
}

// Check Mesh 60 (Candidate for Body)
const bodyMeshIdx = 60;
console.log(`Mesh ${bodyMeshIdx} is used by node:`, data.nodes.findIndex(n => n.mesh === bodyMeshIdx));
