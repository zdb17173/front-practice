var glob = require('glob');
var path = require('path');

/*
 循环所有文件，对文件名做处理，并放入entry数组中，返回entry
 */

var entries = {};
var entryPattern = path.resolve(__dirname, '../src/entries/**.js');
glob.sync(entryPattern).forEach(function (entry) {
    var key = entry.substring(entry.lastIndexOf('entries') + 8, entry.lastIndexOf('.')).replace(/\//g, '.');
    var fullpath = path.resolve(__dirname, entry);
    console.log("fullpath[" + fullpath + "]   key[" + key + "]")
    key && (entries[key] = fullpath);
});

module.exports = entries