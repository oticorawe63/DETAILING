const fs = require('fs');
const gltfPath = 'd:\\Antigravity\\Проекты\\DETAILING\\DETAILING\\3D MODELS\\Матовая\\scene.gltf';
const gltf = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Detailed Material Analysis for Paint:");
gltf.materials.forEach(mat => {
    if (mat.name && (mat.name.toLowerCase().includes('paint') || mat.name.toLowerCase().includes('body') || mat.name.toLowerCase().includes('car'))) {
        console.log(`\n===================`);
        console.log(`Material: ${mat.name}`);
        console.log(`===================`);
        console.log(JSON.stringify(mat, null, 2));
    }
});
