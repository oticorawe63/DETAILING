
const fs = require('fs');
// Using the unoptimized file as it's easier to verify structure from it.
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
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

console.log("\nMeshes (with candidate search):");
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
        
        if (lowerMat.includes('leather') || lowerMesh.includes('seat') || lowerMat.includes('interior') || lowerMat.includes('int') || lowerMesh.includes('mesh_60') || lowerMesh.includes('mesh_61')) {
            console.log(`INTERIOR CANDIDATE: Mesh ${index} (${mesh.name}) Mat: ${matName} Center: [${center.map(v=>v.toFixed(3)).join(', ')}]`);
        }
        if (lowerMat.includes('rim') || lowerMesh.includes('rim') || lowerMat.includes('wheel') || lowerMesh.includes('wheel') || lowerMat.includes('rims')) {
            console.log(`WHEEL CANDIDATE: Mesh ${index} (${mesh.name}) Mat: ${matName} Center: [${center.map(v=>v.toFixed(3)).join(', ')}]`);
        }
        if (lowerMat.includes('paint') || lowerMesh.includes('body') || lowerMesh.includes('door') || lowerMesh.includes('hood')) {
             console.log(`BODY CANDIDATE: Mesh ${index} (${mesh.name}) Mat: ${matName}`);
        }
    }
});

console.log("\nNodes (search for wheels):");
data.nodes.forEach((node, i) => {
    if (node.name && (node.name.toLowerCase().includes('wheel') || node.name.toLowerCase().includes('tire'))) {
        console.log(`Node ${i}: ${node.name} - Translation: ${node.translation}`);
    }
});
