/**
 * Created by baozhong on 2017/5/8.
 */
var cacheRestore=require("../utils/cache")
console.log('dasd')
cacheRestore.put("a","213123")
JSON.stringify(cacheRestore.get("a"))