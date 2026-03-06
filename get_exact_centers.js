const fs = require('fs');
const path = require('path');

function parseGLTF() {
    const gltfPath = 'public/models/bmw/bmw_m5_f90.gltf';
    const gltfData = fs.readFileSync(gltfPath, 'utf8');
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

    const binPath = path.join(path.dirname(gltfPath), buffer.uri);
    const binData = fs.readFileSync(binPath);

    const start = bufferView.byteOffset || 0;
    const count = positionsAccessor.count;

    const centers = [
        { name: "Front Right", sum: [0, 0, 0], count: 0 },
        { name: "Back Right", sum: [0, 0, 0], count: 0 },
        { name: "Front Left", sum: [0, 0, 0], count: 0 },
        { name: "Back Left", sum: [0, 0, 0], count: 0 },
    ];

    for (let i = 0; i < count; i++) {
        let x = binData.readFloatLE(start + i * 12);
        let y = binData.readFloatLE(start + i * 12 + 4);
        let z = binData.readFloatLE(start + i * 12 + 8);

        // Cluster by X and Z
        // In this model, X+ is right, Z+ is front?
        let isFront = z > 0.1;
        let isRight = x > 0;

        let cIdx = (isFront ? 0 : 1) + (isRight ? 0 : 2);
        centers[cIdx].sum[0] += x;
        centers[cIdx].sum[1] += y;
        centers[cIdx].sum[2] += z;
        centers[cIdx].count++;
    }

    centers.forEach(c => {
        if (c.count > 0) {
            console.log(`${c.name}: [${(c.sum[0] / c.count).toFixed(3)}, ${(c.sum[1] / c.count).toFixed(3)}, ${(c.sum[2] / c.count).toFixed(3)}]`);
        }
    });
}

parseGLTF();
