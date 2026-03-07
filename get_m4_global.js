
const fs = require('fs');
const path = require('path');

function getGlobalBounds() {
    const gltfPath = 'public/models/bmw/m4/scene.gltf';
    const json = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));
    
    let minZ = Infinity;
    let maxZ = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    
    json.accessors.forEach(acc => {
        if (acc.min && acc.min.length === 3) {
            // acc.min is [oldX, oldY, oldZ]
            // transformed: [oldX, -oldZ, oldY]
            const y1 = -acc.min[2];
            const y2 = -acc.max[2];
            const z1 = acc.min[1];
            const z2 = acc.max[1];
            
            minY = Math.min(minY, y1, y2);
            maxY = Math.max(maxY, y1, y2);
            minZ = Math.min(minZ, z1, z2);
            maxZ = Math.max(maxZ, z1, z2);
        }
    });
    
    console.log(`Global Transformed Y Range: [${minY}, ${maxY}]`);
    console.log(`Global Transformed Z Range: [${minZ}, ${maxZ}]`);
}

getGlobalBounds();
