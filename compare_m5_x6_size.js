
const fs = require('fs');

function getMetrics(path) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    // Finding body mesh
    let maxCount = 0;
    let bodyMeshAcc = null;
    data.meshes.forEach(m => {
        const acc = data.accessors[m.primitives[0].attributes.POSITION];
        if (acc.count > maxCount) {
             maxCount = acc.count;
             bodyMeshAcc = acc;
        }
    });
    
    return {
        min: bodyMeshAcc.min,
        max: bodyMeshAcc.max,
        width: bodyMeshAcc.max[0] - bodyMeshAcc.min[0],
        height: bodyMeshAcc.max[1] - bodyMeshAcc.min[1],
        length: bodyMeshAcc.max[2] - bodyMeshAcc.min[2],
        center: [
            (bodyMeshAcc.min[0] + bodyMeshAcc.max[0]) / 2,
            (bodyMeshAcc.min[1] + bodyMeshAcc.max[1]) / 2,
            (bodyMeshAcc.min[2] + bodyMeshAcc.max[2]) / 2
        ]
    };
}

const m5 = getMetrics('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M5/bmw_m5_f90.gltf');
const x6 = getMetrics('D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D X6/scene.gltf');

const m5Scale = 1.1;

console.log("M5 Metrics (Unscaled):", m5);
console.log("X6 Metrics (Unscaled):", x6);

// Goal: X6 visually matches M5 size (length-wise or width-wise)
// M5 effective length = m5.length * 1.1
const m5EffLength = m5.length * m5Scale;
const x6ScaleToMatchM5Length = m5EffLength / x6.length;

console.log("\nScale for X6 to match M5 Length:", x6ScaleToMatchM5Length);

// Position fix:
// M5 Y-min unscaled is ~0.28. With scale 1.1 it is 0.3. Position -1.2 means ground is at ~-0.9.
// X6 Y-min unscaled is ~0.0 (based on earlier analysis of wheels). 
// If X6 scale is ~0.5, then PosY should be -1.2 to keep ground level same.

// Center fix:
// X6 Z-center is x6.center[2]. 
// To center it, OffsetZ = - (x6.center[2] * x6Scale)
const offsetZ = -(x6.center[2] * x6ScaleToMatchM5Length);

console.log("Estimated X6 Pose: Scale =", x6ScaleToMatchM5Length.toFixed(3), "PosZ =", offsetZ.toFixed(3));
