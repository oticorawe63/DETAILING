const fs = require('fs');

function analyzeTriangleCounts(filePath) {
    const buffer = fs.readFileSync(filePath);
    let offset = 12;
    const chunkLength = buffer.readUInt32LE(offset);
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    // get accessor counts
    const getTriCount = (indicesAccessorId) => {
        if (indicesAccessorId === undefined) return 0;
        return gltf.accessors[indicesAccessorId].count / 3;
    };

    const matTriangles = {};
    
    gltf.nodes.forEach((node) => {
        if (node.mesh !== undefined) {
            const mesh = gltf.meshes[node.mesh];
            mesh.primitives.forEach(prim => {
                const matId = prim.material;
                const matName = gltf.materials[matId]?.name || 'Unknown';
                const tris = getTriCount(prim.indices) || 0;
                matTriangles[matName] = (matTriangles[matName] || 0) + tris;
            });
        }
    });

    const sorted = Object.entries(matTriangles).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([name, count]) => {
        console.log(`${name}: ${count} triangles`);
    });
}
analyzeTriangleCounts('public/models/bmw/x5/scene_opt.glb');
