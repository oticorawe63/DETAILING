
import * as fs from 'fs';

const gltfPath = 'd:/Antigravity/Проекты/DETAILING/DETAILING/public/models/bmw/bmw_m5_f90.gltf';

try {
    const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    console.log("Nodes and Meshes in GLTF:");
    if (data.nodes) {
        data.nodes.forEach((node: any, index: number) => {
            console.log(`Node ${index}: ${node.name || 'Unnamed'}`);
        });
    }
    if (data.meshes) {
        data.meshes.forEach((mesh: any, index: number) => {
            console.log(`Mesh ${index}: ${mesh.name || 'Unnamed'}`);
            if (mesh.primitives) {
                mesh.primitives.forEach((primitive: any, pIndex: number) => {
                    const materialIndex = primitive.material;
                    if (materialIndex !== undefined && data.materials[materialIndex]) {
                        console.log(`  Primitive ${pIndex} Material: ${data.materials[materialIndex].name || 'Unnamed'}`);
                    }
                });
            }
        });
    }
    if (data.materials) {
        console.log("\nMaterials:");
        data.materials.forEach((mat: any, index: number) => {
            console.log(`Material ${index}: ${mat.name || 'Unnamed'}`);
        });
    }
} catch (err) {
    console.error("Error reading GLTF:", err);
}
