import { getTags } from './function';
import { getPhotograph } from './function';

console.time('Execution Time');
getTags()
console.timeEnd('Execution Time');


console.time('Execution Time');
getPhotograph()
console.timeEnd('Execution Time');

