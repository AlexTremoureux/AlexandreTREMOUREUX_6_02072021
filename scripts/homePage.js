import { getTags } from './functions/getTags.js';
import { getPhotograph } from './functions/getPhotograph.js'

console.time('Execution Time');
getTags()
console.timeEnd('Execution Time');

console.time('Execution Time');
getPhotograph()
console.timeEnd('Execution Time');
