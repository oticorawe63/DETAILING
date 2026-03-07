const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'public/models/bmw/x5/extracted';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

async function checkColors() {
    for (const file of files) {
        if (!file.includes('baseColor') && !file.includes('material_7')) continue;
        try {
            const stats = await sharp(path.join(dir, file)).stats();
            console.log(`${file}: Dominant RGB = [${stats.dominant.r}, ${stats.dominant.g}, ${stats.dominant.b}]`);
        } catch (e) {}
    }
}
checkColors();
