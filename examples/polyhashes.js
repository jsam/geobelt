var polyhash = require('../').Polyhash;

var bermuda_triangle = [
    [ 25.774252, -80.190262 ],
    [ 18.466465, -66.118292 ],
    [ 32.321384, -64.75737 ]
];
var hashes = polyhash(bermuda_triangle, 5);
console.dir(hashes);

console.log(hashes.length);