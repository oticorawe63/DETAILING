
const fs = require('fs');
const path = require('path');

function analyzeModel() {
    const gltfPath = 'public/models/bmw/m4/scene.gltf';
    const json = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    
    // Overall min/max for all accessors that are POSITIONS
    let globalMin = [Infinity, Infinity, Infinity];
    let globalMax = [-Infinity, -Infinity, -Infinity];
    
    json.meshes.forEach(mesh => {
        mesh.primitives.forEach(prim => {
            const acc = json.accessors[prim.attributes.POSITION];
            for (let i=0; i<3; i++) {
                globalMin[i] = Math.min(globalMin[i], acc.min[i]);
                globalMax[i] = Math.max(globalMax[i], acc.max[i]);
            }
        });
    });
    
    console.log(`Global raw bounds: Min ${JSON.stringify(globalMin)}, Max ${JSON.stringify(globalMax)}`);
    
    // Wheel centers raw
    const wheelMeshes = [52, 53, 54, 55];
    wheelMeshes.forEach(idx => {
        const acc = json.accessors[json.meshes[idx].primitives[0].attributes.POSITION];
        const center = [(acc.min[0]+acc.max[0])/2, (acc.min[1]+acc.max[1])/2, (acc.min[2]+acc.max[2])/2];
        console.log(`Mesh ${idx} raw center: ${JSON.stringify(center)}`);
    });
}

analyzeModel();
