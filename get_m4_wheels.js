
const fs = require('fs');
const path = require('path');

function getMeshCenters() {
    const gltfPath = 'public/models/bmw/m4/scene.gltf';
    const json = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    const binPath = path.join(path.dirname(gltfPath), 'scene.bin');
    const binData = fs.readFileSync(binPath);

    const meshIndices = [52, 53, 54, 55];
    
    meshIndices.forEach(idx => {
        const mesh = json.meshes[idx];
        const primitive = mesh.primitives[0];
        const posAccessorIdx = primitive.attributes.POSITION;
        const accessor = json.accessors[posAccessorIdx];
        const bufferView = json.bufferViews[accessor.bufferView];
        
        const start = (bufferView.byteOffset || 0) + (accessor.byteOffset || 0);
        const count = accessor.count;
        
        let sum = [0, 0, 0];
        for (let i = 0; i < count; i++) {
            sum[0] += binData.readFloatLE(start + i * 12);
            sum[1] += binData.readFloatLE(start + i * 12 + 4);
            sum[2] += binData.readFloatLE(start + i * 12 + 8);
        }
        
        const avg = [sum[0] / count, sum[1] / count, sum[2] / count];
        console.log(`Mesh ${idx} (${mesh.name}) Center: [${avg[0].toFixed(4)}, ${avg[1].toFixed(4)}, ${avg[2].toFixed(4)}]`);
    });
}

getMeshCenters();
