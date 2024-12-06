import { mkdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const source = resolve(__dirname, '../node_modules/@ffmpeg/core/dist/umd/ffmpeg-core.js');
const destination = resolve(__dirname, '../public/js/ffmpeg-core.js');

mkdirSync(dirname(destination), { recursive: true }); // Create destination folder if it doesn't exist
copyFileSync(source, destination);

console.log('ffmpeg-core.js has been copied to public/js/');
