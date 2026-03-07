
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

function findMeshInNode(nodeIdx) {
    const node = data.nodes[nodeIdx];
    if (node.mesh !== undefined) {
        const mesh = data.meshes[node.mesh];
        console.log(`Node ${nodeIdx} (${node.name}) uses Mesh ${node.mesh} (${mesh.name})`);
        mesh.primitives.forEach(p => {
            console.log(`  Primitive Mat: ${data.materials[p.material].name}`);
        });
    }
    if (node.children) {
        node.children.forEach(findMeshInNode);
    }
}

console.log("Inspecting Wheel Nodes (wfl_6=64, wfr_7=74, wrl_8=84, wrr_9=94):");
[64, 74, 84, 94].forEach(findMeshInNode);
