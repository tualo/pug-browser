import { fs, configureSingle, WebStorage } from './zenfs.js';
import morphdom from '../morphdom/morphdom-esm.js';

await configureSingle({ backend: WebStorage });
// fs.writeFileSync('/test.txt', 'Hallo aus ZenFS!');
// console.log(fs.readFileSync('/test.txt', 'utf8'));
window.fs = fs;
window.morphdom = morphdom;
