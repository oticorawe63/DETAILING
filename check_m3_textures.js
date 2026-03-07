
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const texMat = data.materials[10]; // texture_interior
console.log(`Material 10: ${texMat.name}`);
if (texMat.pbrMetallicRoughness && texMat.pbrMetallicRoughness.baseColorTexture) {
    const texIdx = texMat.pbrMetallicRoughness.baseColorTexture.index;
    const imgIdx = data.textures[texIdx].source;
    const imgName = data.images[imgIdx].name || data.images[imgIdx].uri;
    console.log(`  BaseColorTexture Source: ${imgName}`);
}
if (texMat.normalTexture) {
    const texIdx = texMat.normalTexture.index;
    const imgIdx = data.textures[texIdx].source;
    const imgName = data.images[imgIdx].name || data.images[imgIdx].uri;
    console.log(`  NormalTexture Source: ${imgName}`);
}

const designMat = data.materials[24]; // design_interior
console.log(`Material 24: ${designMat.name}`);
if (designMat.pbrMetallicRoughness && designMat.pbrMetallicRoughness.baseColorTexture) {
     const texIdx = designMat.pbrMetallicRoughness.baseColorTexture.index;
     const imgIdx = data.textures[texIdx].source;
     const imgName = data.images[imgIdx].name || data.images[imgIdx].uri;
     console.log(`  BaseColorTexture Source: ${imgName}`);
}
