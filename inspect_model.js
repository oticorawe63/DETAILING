
const fs = require('fs');
const path = require('path');

const gltfPath = 'd:/Antigravity/Проекты/DETAILING/DETAILING/public/models/bmw/bmw_m5_f90.gltf';

try {
    const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    console.log("Nodes and Meshes in GLTF:");
    if (data.nodes) {
        data.nodes.forEach((node, index) => {
            if (node.name) console.log(`Node ${index}: ${node.name}`);
        });
    }
    if (data.meshes) {
        data.meshes.forEach((mesh, index) => {
            console.log(`Mesh ${index}: ${mesh.name || 'Unnamed'}`);
            if (mesh.primitives) {
                mesh.primitives.forEach((primitive, pIndex) => {
                    const materialIndex = primitive.material;
                    if (materialIndex !== undefined && data.materials && data.materials[materialIndex]) {
                        console.log(`  Primitive ${pIndex} Material: ${data.materials[materialIndex].name || 'Unnamed'}`);
                    }
                });
            }
        });
    }
    if (data.materials) {
        console.log("\nMaterials:");
        data.materials.forEach((mat, index) => {
            console.log(`Material ${index}: ${mat.name || 'Unnamed'}`);
        });
    }
} catch (err) {
    console.error("Error reading GLTF:", err);
}
