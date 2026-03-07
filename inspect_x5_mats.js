const fs = require('fs');

function checkMeshes(filePath) {
    const buffer = fs.readFileSync(filePath);
    let offset = 12;
    const chunkLength = buffer.readUInt32LE(offset);
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    // find all materials with their textures and colors
    gltf.materials.forEach((mat, i) => {
        const pbr = mat.pbrMetallicRoughness || {};
        const color = pbr.baseColorFactor || [1, 1, 1, 1];
        let texInfo = 'No Texture';
        if (pbr.baseColorTexture !== undefined) {
             const texIndex = pbr.baseColorTexture.index;
             const imgIndex = gltf.textures[texIndex].source;
             const image = gltf.images[imgIndex];
             texInfo = image.name || image.uri || 'Image_'+imgIndex;
        }
        console.log(`[${i}] Mat: ${mat.name}, Color: [${color.map(c=>c.toFixed(2)).join(', ')}], Texture: ${texInfo}`);
    });
}
checkMeshes('public/models/bmw/x5/scene_opt.glb');
