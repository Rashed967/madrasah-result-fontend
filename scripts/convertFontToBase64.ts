import fs from 'fs';

const fontPath = './public/fonts/kalpurush.ttf';
const fontData = fs.readFileSync(fontPath);
const base64Font = fontData.toString('base64');
