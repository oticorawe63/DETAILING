const fs = require('fs');

function checkMeshes(filePath) {
    const buffer = fs.readFileSync(filePath);
    let offset = 12;
    const chunkLength = buffer.readUInt32LE(offset);
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    gltf.nodes.forEach((node) => {
        if (node.mesh !== undefined) {
            const mesh = gltf.meshes[node.mesh];
            mesh.primitives.forEach(prim => {
                const mat = gltf.materials[prim.material];
                if (mat) {
                    if (node.name.toLowerCase().includes('seat') || mesh.name.toLowerCase().includes('seat')) {
                        console.log(`Node/Mesh has SEAT: node=${node.name}, mesh=${mesh.name}, mat=${mat.name}`);
                    }
                }
            });
        }
    });

}
checkMeshes('public/models/bmw/x5/scene_opt.glb');
