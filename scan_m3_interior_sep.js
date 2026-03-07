const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Exploring M3 Interior nodes for Separation:");

function scanNode(idx, depth = 0) {
    const node = data.nodes[idx];
    const indent = "  ".repeat(depth);
    
    if (node.mesh !== undefined) {
        const mesh = data.meshes[node.mesh];
        const mats = mesh.primitives.map(p => data.materials[p.material].name);
        console.log(`${indent}Node ${idx}: ${node.name} (Mesh: ${mesh.name}) Materials: [${mats.join(', ')}]`);
    } else {
        console.log(`${indent}Node ${idx}: ${node.name} (Group)`);
    }

    if (node.children) {
        node.children.forEach(c => scanNode(c, depth + 1));
    }
}

// Node 53 was identified as 'interior_5' root earlier
scanNode(53);
