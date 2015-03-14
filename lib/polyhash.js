var inside = function (point, vs) {    
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

var geohash = require('./geohash'); 

var commondir = require('commondir');
function commonHash (hashes) {
    var paths = hashes.map(function (s) {
        return '/' + s.split('').join('/');
    });
    return commondir(paths).split('/').join('');
}
var extents = function (points) {
    var lats = points.map(function (p) { return p[0] });
    var lons = points.map(function (p) { return p[1] });
    return {
        w : Math.min.apply(null, lons),
        s : Math.min.apply(null, lats),
        e : Math.max.apply(null, lons),
        n : Math.max.apply(null, lats),
    };
};//require('./lib/extents');

function containment (hash, polygon) {
    var decoded = geohash.decode(hash);
    var hext = {
        w : decoded.longitude[0],
        s : decoded.latitude[0],
        e : decoded.longitude[1],
        n : decoded.latitude[1],
    };
    var hpoly = [
        [ hext.s, hext.w ],
        [ hext.s, hext.e ],
        [ hext.n, hext.e ],
        [ hext.n, hext.w ],
    ];
    
    var c = hpoly.filter(function (pt) {
        return inside(pt, polygon);
    }).length;
    return { 0 : 'none', 4 : 'complete' }[c] || 'partial';
}

module.exports = function (points, level) {
    var ch = commonHash(points.map(function (p) {
        return geohash.encode(p[0], p[1]);
    }));
    if (level === undefined) level == 22;
    
    var res = (function divide (hash) {
        var c = containment(hash, points);
        if (hash.length >= level) return c === 'none' ? [] : [ hash ];
        if (c === 'complete') return [ hash ];
        
        return geohash.subs(hash).reduce(function (acc, sh) {
            return acc.concat(divide(sh));
        }, []);
    })(ch);
    return res.length ? res : [ ch ];
};
