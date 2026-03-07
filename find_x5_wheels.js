const fs = require('fs');
const path = require('path');

function findWheels(gltfPath) {
    const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    const nodes = data.nodes;
    const meshes = data.meshes;

    console.log('--- ANALYSIS FOR X5 ---');
    
    nodes.forEach((node, index) => {
        const name = node.name ? node.name.toLowerCase() : '';
        if (name.includes('wheel') || name.includes('tire') || name.includes('rim')) {
            console.log(`Node Index: ${index}, Name: ${node.name}`);
            if (node.mesh !== undefined) {
                console.log(`  Uses Mesh: ${meshes[node.mesh].name}`);
                if (node.translation) console.log(`  Translation: ${JSON.stringify(node.translation)}`);
            }
        }
    });

    // Let's also find which meshes have a lot of primitives or materials that might be seats
    console.log('\n--- POTENTIAL INTERIOR ---');
    data.materials.forEach((mat, i) => {
        if (mat.name && (mat.name.toLowerCase().includes('lambert') || mat.name.toLowerCase().includes('interior') || mat.name.toLowerCase().includes('leather'))) {
             console.log(`Material ${i}: ${mat.name}`);
        }
    });
}

findWheels('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X5/scene.gltf');
