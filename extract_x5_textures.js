const fs = require('fs');

function extractImages(filePath) {
    const buffer = fs.readFileSync(filePath);
    let offset = 12;
    const chunkLength = buffer.readUInt32LE(offset);
    const jsonStr = buffer.toString('utf8', offset + 8, offset + 8 + chunkLength);
    const gltf = JSON.parse(jsonStr);
    
    // find binary chunk
    offset += 8 + chunkLength;
    const binChunkLength = buffer.readUInt32LE(offset);
    const binChunkType = buffer.readUInt32LE(offset + 4);
    if (binChunkType !== 0x004E4942) {
        console.error("No BIN chunk");
        return;
    }
    const binBuffer = buffer.slice(offset + 8, offset + 8 + binChunkLength);
    
    fs.mkdirSync('public/models/bmw/x5/extracted', {recursive: true});
    
    gltf.images.forEach((img, i) => {
        if (img.bufferView !== undefined) {
            const bv = gltf.bufferViews[img.bufferView];
            const imgBuf = binBuffer.slice(bv.byteOffset, bv.byteOffset + bv.byteLength);
            const ext = img.mimeType === 'image/png' ? 'png' : 'jpg';
            const name = img.name || img.uri || `image_${i}`;
            const cleanName = name.replace(/[^a-zA-Z0-9_\-.]/g, '_');
            fs.writeFileSync(`public/models/bmw/x5/extracted/${cleanName}.${ext}`, imgBuf);
            console.log(`Saved ${cleanName}.${ext}`);
        }
    });
}
extractImages('public/models/bmw/x5/scene_opt.glb');
