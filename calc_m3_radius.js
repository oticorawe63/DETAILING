
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

// To get the radius of the wheel, we can look at the bounding box of a wheel mesh, e.g., mesh 54 or 55 (rim).
// Node 65 uses Mesh 54. Node 68 uses Mesh 57 (tire).

function getRadius(meshIdx) {
    const mesh = data.meshes[meshIdx];
    let min = [Infinity, Infinity, Infinity];
    let max = [-Infinity, -Infinity, -Infinity];
    mesh.primitives.forEach(prim => {
        const acc = data.accessors[prim.attributes.POSITION];
        for(let i=0; i<3; i++) {
            min[i] = Math.min(min[i], acc.min[i]);
            max[i] = Math.max(max[i], acc.max[i]);
        }
    });
    console.log(`Mesh ${meshIdx} bounding box: min=[${min.join(', ')}], max=[${max.join(', ')}]`);
    console.log(`Sizes: X=${max[0]-min[0]}, Y=${max[1]-min[1]}, Z=${max[2]-min[2]}`);
    // Radius is half of Y or Z (assuming X is depth or vice versa)
    console.log(`Estimated radius based on highest dim: ${Math.max(max[0]-min[0], max[1]-min[1], max[2]-min[2]) / 2}`);
}

console.log("Rim (Mesh 54):");
getRadius(54);
console.log("Tire (Mesh 57):");
getRadius(57);

