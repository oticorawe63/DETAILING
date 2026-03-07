const fs = require('fs');

function extractGlbJson(filePath) {
    const buffer = fs.readFileSync(filePath);
    const magic = buffer.readUInt32LE(0);
    if (magic !== 0x46546C67) { console.error('Not a GLB'); return; }
    
    let offset = 12;
    const chunkLength = buffer.readUInt32LE(offset);
    const chunkType = buffer.readUInt32LE(offset + 4);
    
    if (chunkType === 0x4E4F534A) { // 'JSON'
        const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
        const gltf = JSON.parse(jsonStr);
        
        gltf.materials.forEach((mat, i) => {
            const pbr = mat.pbrMetallicRoughness || {};
            const color = pbr.baseColorFactor || [1, 1, 1, 1];
            // Format colors to easily readable hex or RGB
            console.log(`[${i}] ${mat.name}: color=[${color.map(c => c.toFixed(2)).join(', ')}]`);
        });
    }
}

extractGlbJson('public/models/bmw/x5/scene_opt.glb');
