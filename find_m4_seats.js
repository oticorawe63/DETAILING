
const fs = require('fs');
const THREE = require('three');

function boundsToBox(min, max) {
    return {
        minX: min[0], minY: min[1], minZ: min[2],
        maxX: max[0], maxY: max[1], maxZ: max[2]
    };
}

const gltfPath = 'public/models/bmw/m4/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

data.meshes.forEach((mesh, index) => {
    if (!mesh.primitives || !mesh.primitives[0]) return;
    const prim = mesh.primitives[0];
    const matIndex = prim.material;
    const matName = matIndex !== undefined && data.materials[matIndex] ? data.materials[matIndex].name : "Unknown";
    
    // We are interested in finding the seats. 
    // They should be in the middle of the car (Z roughly between -0.5 and 0.5, somewhat elevated in Y).
    // Let's get the accessor for POSITION
    const posAccessorIdx = prim.attributes.POSITION;
    if (posAccessorIdx === undefined) return;
    const posAccessor = data.accessors[posAccessorIdx];
    
    const min = posAccessor.min;
    const max = posAccessor.max;
    
    if (min && max) {
        console.log(`Mesh ${index} (Mat: ${matName}): Min[${min.map(v => v.toFixed(2)).join(', ')}] Max[${max.map(v => v.toFixed(2)).join(', ')}]`);
    }
});
