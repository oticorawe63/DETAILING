const fs = require('fs');

function parseGLTF() {
    const gltfData = fs.readFileSync('public/models/bmw/bmw_m5_f90.gltf', 'utf8');
    const json = JSON.parse(gltfData);

    let rimMeshPrefix = 'f_bmw_f90_m5_133_M_Rim_Main_Max_0';
    let rimMesh;

    for (let mesh of json.meshes) {
        if (mesh.name === rimMeshPrefix) {
            rimMesh = mesh;
            break;
        }
    }

    if (!rimMesh) {
        console.log("rim mesh not found");
        return;
    }

    let positionsAccessor = json.accessors[rimMesh.primitives[0].attributes.POSITION];
    let bufferView = json.bufferViews[positionsAccessor.bufferView];
    let buffer = json.buffers[bufferView.buffer];

    // In gltf, the actual binary file is bmw_m5_f90.bin
    let binData = fs.readFileSync('public/models/bmw/' + buffer.uri);

    // Determine offset
    let byteOffset = (bufferView.byteOffset || 0) + (positionsAccessor.byteOffset || 0);
    let count = positionsAccessor.count;

    let floatArray = new Float32Array(binData.buffer, binData.byteOffset + byteOffset, count * 3);

    let centers = [
        { sum: [0, 0, 0], count: 0, name: "Front Right" },
        { sum: [0, 0, 0], count: 0, name: "Back Right" },
        { sum: [0, 0, 0], count: 0, name: "Front Left" },
        { sum: [0, 0, 0], count: 0, name: "Back Left" },
    ];

    let maxRadiusSq = 0;

    for (let i = 0; i < count; i++) {
        let x = floatArray[i * 3];
        let y = floatArray[i * 3 + 1];
        let z = floatArray[i * 3 + 2];

        let cIdx = (x > 0 ? 0 : 2) + (z > 0 ? 0 : 1);
        centers[cIdx].sum[0] += x;
        centers[cIdx].sum[1] += y;
        centers[cIdx].sum[2] += z;
        centers[cIdx].count++;

        // update min/max X for positioning
        if (centers[cIdx].maxX === undefined) centers[cIdx].maxX = x;
        if (centers[cIdx].minX === undefined) centers[cIdx].minX = x;
        centers[cIdx].maxX = Math.max(centers[cIdx].maxX, x);
        centers[cIdx].minX = Math.min(centers[cIdx].minX, x);
    }

    centers.forEach(c => {
        c.cx = c.sum[0] / c.count;
        c.cy = c.sum[1] / c.count;
        c.cz = c.sum[2] / c.count;
        console.log(`${c.name} - Center: [${c.cx.toFixed(4)}, ${c.cy.toFixed(4)}, ${c.cz.toFixed(4)}], Outer X: ${(c.cx > 0 ? c.maxX : c.minX).toFixed(4)}`);
    });

    for (let i = 0; i < count; i++) {
        let x = floatArray[i * 3];
        let y = floatArray[i * 3 + 1];
        let z = floatArray[i * 3 + 2];
        let cIdx = (x > 0 ? 0 : 2) + (z > 0 ? 0 : 1);

        let dy = y - centers[cIdx].cy;
        let dz = z - centers[cIdx].cz;
        let rSq = dy * dy + dz * dz;
        if (rSq > maxRadiusSq) maxRadiusSq = rSq;
    }
    console.log("Radius: " + Math.sqrt(maxRadiusSq));
}

parseGLTF();
