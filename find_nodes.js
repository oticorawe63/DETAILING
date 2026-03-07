
const fs = require('fs');
const data = fs.readFileSync('public/models/bmw/m4/scene.gltf', 'utf8');
const lines = data.split('\n');
lines.forEach((line, index) => {
    if (line.includes('"nodes": [')) {
        console.log(`Found "nodes": [ at line ${index + 1}`);
    }
});
