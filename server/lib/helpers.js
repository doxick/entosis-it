module.exports = {};
module.exports.GenerateGuid = function generateGuid()
{
    return [
        ~~(Math.random() * 9000) + 1000,
        ~~(Math.random() * 9000) + 1000,
        ~~(Math.random() * 9000) + 1000
    ].join('-');
}

module.exports.Md5 = (function(){
    var crypto = require('crypto');
    return function md5(string)
    {
        return crypto.createHash('md5').update(string).digest('hex');
    }
})();