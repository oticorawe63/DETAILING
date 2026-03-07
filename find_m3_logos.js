
const fs = require('fs');
const gltfPath = 'D:/Antigravity/Проекты/Detailing/DETAILING/3D MODELS/3D M3/scene.gltf';
const data = JSON.parse(fs.readFileSync(gltfPath, 'utf8'));

console.log("Searching for BMW Logo nodes:");
data.nodes.forEach((node, i) => {
    if (node.mesh !== undefined) {
        const mesh = data.meshes[node.mesh];
        let usesLogo = false;
        mesh.primitives.forEach(p => {
            const mat = data.materials[p.material];
            if (mat && mat.name.toLowerCase().includes('bmw_logo')) {
                usesLogo = true;
            }
        });
        if (usesLogo) {
            console.log(`Node ${i} (${node.name}) uses BMW Logo material.`);
            // Trace parents to see if it's on a wheel
            let curr = i;
            let path = [node.name];
            while (true) {
                let parentIdx = data.nodes.findIndex(n => n.children && n.children.includes(curr));
                if (parentIdx === -1) break;
                path.push(data.nodes[parentIdx].name);
                curr = parentIdx;
            }
            console.log(`  Path: ${path.reverse().join(' -> ')}`);
        }
    }
});
