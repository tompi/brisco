var memoryCache = require('memory-cache');
var Q = require('q');

module.exports = (function() {
    var defaultTimeoutMilliSeconds = 60 * 60 * 1000;
    var me = {};
    // Assume next takes the cached object as parameter
    me.get = function(key, getFunction, timeoutMilliSeconds) {
        var ret = memoryCache.get(key);
        if (ret) return ret;
        else {
            // If not in cache, get it from function and put in cache
            var deferred = Q.defer();
            var promise = deferred.promise;
            memoryCache.put(key, promise, timeoutMilliSeconds || defaultTimeoutMilliSeconds);
            getFunction(function(obj) {
                deferred.resolve(obj);
            });
            return promise;
        }        
    };
    return me;
})();