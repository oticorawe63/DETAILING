
const fs = require('fs');
const path = require('path');

function getMeshBounds() {
    const gltfPath = 'public/models/bmw/m4/scene.gltf';
    const json = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    
    const meshIndices = [52, 53, 54, 55];
    
    meshIndices.forEach(idx => {
        const mesh = json.meshes[idx];
        const primitive = mesh.primitives[0];
        const posAccessorIdx = primitive.attributes.POSITION;
        const accessor = json.accessors[posAccessorIdx];
        console.log(`Mesh ${idx} (${mesh.name}) Min: ${JSON.stringify(accessor.min)}, Max: ${JSON.stringify(accessor.max)}`);
    });
}

getMeshBounds();
