const fs = require('fs');
const { Mesh, Color } = require('three');
const { readFileSync } = require('fs');
const { TextDecoder } = require('util');

async function testGlb(path, modelName) {
    try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const THREE = await import('three');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');

        // We can't easily use DRACOLoader in Node.js without some hacks, so let's just use gltf-pipeline or basic checks.
        // Actually since we just need colors, maybe we can run a minimal Next.js test script, or write a puppeteer script.
    } catch(err) {
        console.error(err);
    }
}
