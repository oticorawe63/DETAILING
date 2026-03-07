
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Materials:");
if (data.materials) {
    data.materials.forEach((mat, i) => {
        let color = mat.pbrMetallicRoughness && mat.pbrMetallicRoughness.baseColorFactor 
            ? mat.pbrMetallicRoughness.baseColorFactor.map(v => v.toFixed(2)).join(', ') 
            : "default";
        console.log(`[${i}] ${mat.name} - Color: [${color}]`);
    });
}

console.log("\nMeshes (with seat/rim search):");
data.meshes.forEach((mesh, index) => {
    const prim = mesh.primitives ? mesh.primitives[0] : null;
    if (!prim) return;
    const matIndex = prim.material;
    const matName = matIndex !== undefined && data.materials[matIndex] ? data.materials[matIndex].name : "Unknown";
    
    const posAccessorIdx = prim.attributes.POSITION;
    if (posAccessorIdx !== undefined) {
        const posAccessor = data.accessors[posAccessorIdx];
        const min = posAccessor.min;
        const max = posAccessor.max;
        const center = [
            (min[0] + max[0]) / 2,
            (min[1] + max[1]) / 2,
            (min[2] + max[2]) / 2
        ];
        
        let isInteresting = false;
        const lowerMat = matName.toLowerCase();
        const lowerMesh = (mesh.name || "").toLowerCase();
        
        if (lowerMat.includes('red') || lowerMesh.includes('seat') || lowerMat.includes('seat') || lowerMat.includes('leather') || lowerMat.includes('interior')) {
            console.log(`SEAT CANDIDATE: Mesh ${index} (${mesh.name}) Mat: ${matName}`);
        }
        if (lowerMat.includes('rim') || lowerMesh.includes('rim') || lowerMat.includes('wheel') || lowerMesh.includes('wheel') || lowerMat.includes('spoke')) {
            console.log(`WHEEL CANDIDATE: Mesh ${index} (${mesh.name}) Mat: ${matName} Center: [${center.map(v=>v.toFixed(3)).join(', ')}]`);
        }
    }
});
