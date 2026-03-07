const fs = require('fs');

function analyzeMeshCenters(filePath) {
    const buffer = fs.readFileSync(filePath);
    let offset = 12;
    const chunkLength = buffer.readUInt32LE(offset);
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    // find binary chunk
    offset += 8 + chunkLength;
    const binChunkLength = buffer.readUInt32LE(offset);
    const binBuffer = buffer.slice(offset + 8, offset + 8 + binChunkLength);
    
    const matExtents = {};

    gltf.nodes.forEach((node) => {
        if (node.mesh !== undefined) {
            const mesh = gltf.meshes[node.mesh];
            mesh.primitives.forEach(prim => {
                const matId = prim.material;
                const matName = gltf.materials[matId]?.name || 'Unknown';
                
                const posAccessorId = prim.attributes.POSITION;
                if (posAccessorId === undefined) return;
                
                const posAccessor = gltf.accessors[posAccessorId];
                
                if (!matExtents[matName]) {
                    matExtents[matName] = { 
                        min: [...posAccessor.min], 
                        max: [...posAccessor.max],
                        nodes: new Set()
                    };
                } else {
                    for(let i=0; i<3; i++) {
                        matExtents[matName].min[i] = Math.min(matExtents[matName].min[i], posAccessor.min[i]);
                        matExtents[matName].max[i] = Math.max(matExtents[matName].max[i], posAccessor.max[i]);
                    }
                }
                matExtents[matName].nodes.add(node.name);
            });
        }
    });

    for (const [name, data] of Object.entries(matExtents)) {
        const cx = (data.min[0] + data.max[0]) / 2;
        const cy = (data.min[1] + data.max[1]) / 2;
        const cz = (data.min[2] + data.max[2]) / 2;
        console.log(`\nMaterial: ${name}`);
        console.log(`Center: [${cx.toFixed(3)}, ${cy.toFixed(3)}, ${cz.toFixed(3)}]`);
        console.log(`Min: [${data.min[0].toFixed(3)}, ${data.min[1].toFixed(3)}, ${data.min[2].toFixed(3)}]`);
        console.log(`Max: [${data.max[0].toFixed(3)}, ${data.max[1].toFixed(3)}, ${data.max[2].toFixed(3)}]`);
        console.log(`Nodes: ${Array.from(data.nodes).slice(0, 5).join(', ')} ...`);
    }
}
analyzeMeshCenters('public/models/bmw/x5/scene_opt.glb');
