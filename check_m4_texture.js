
const fs = require('fs');
const gltfPath = 'public/models/bmw/m4_v2/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

const matName = "arm4_color_interior";
const mat = data.materials.find(m => m.name.toLowerCase() === matName.toLowerCase());

if (mat) {
    console.log("Material found:", mat.name);
    console.log("PBR:", JSON.stringify(mat.pbrMetallicRoughness, null, 2));
    if (mat.pbrMetallicRoughness && mat.pbrMetallicRoughness.baseColorTexture) {
        const texIndex = mat.pbrMetallicRoughness.baseColorTexture.index;
        const texture = data.textures[texIndex];
        const imageIndex = texture.source;
        const image = data.images[imageIndex];
        console.log("Texture Image Source:", image.uri);
    } else {
        console.log("No baseColorTexture found for", matName);
        console.log("Normal Map:", JSON.stringify(mat.normalTexture, null, 2));
        if (mat.normalTexture) {
            const texIndex = mat.normalTexture.index;
            const texture = data.textures[texIndex];
            const imageIndex = texture.source;
            const image = data.images[imageIndex];
            console.log("Normal Map Image Source:", image.uri);
        }
    }
} else {
    console.log("Material not found:", matName);
}
