module.exports.base64_encode = function (file, callback) {
    const fs = require('fs');
    var bitmap = fs.readFileSync(file);
    callback(new Buffer(bitmap).toString('base64'));
};