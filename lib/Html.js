(function() {
    var brisco = {};
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = brisco;
        }
        exports.brisco = brisco;
    }
    else {
        root['brisco'] = brisco;
    }
}).call(this);