
var tracking = (function() {
    var me = {};
    
    me.trackObject = function(user, obj) {
        obj = obj || {};
        
        if (!obj.createdBy) obj.createdBy = user._id;
        if (!obj.createdTime) obj.createdTime = new Date();
        
        obj.lastChangedBy = user._id;
        obj.lastChangedTime = new Date();
        
        return obj;
    };

    return me;
})();

module.exports = tracking;