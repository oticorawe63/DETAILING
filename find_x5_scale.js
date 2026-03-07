const fs = require('fs');
const data = JSON.parse(fs.readFileSync('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X5/scene.gltf', 'utf8'));

// Find accessories for access to min/max
data.accessors.forEach((acc, i) => {
    if (acc.min && acc.max) {
        // console.log(`Accessor ${i}: Min: ${acc.min}, Max: ${acc.max}`);
    }
});

// Find the accessor for the largest mesh (likely the body or the whole car)
let maxRange = 0;
let bestAcc = null;
data.accessors.forEach((acc, i) => {
    if (acc.max && acc.min && acc.max.length === 3) {
        const range = acc.max[0] - acc.min[0];
        if (range > maxRange) {
            maxRange = range;
            bestAcc = acc;
        }
    }
});

console.log('Largest Accessor Range:', maxRange);
if (bestAcc) {
    console.log('Min:', bestAcc.min);
    console.log('Max:', bestAcc.max);
}
