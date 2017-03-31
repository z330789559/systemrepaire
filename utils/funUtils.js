/**
 * Created by baozhong on 2017/3/13.
 */
module.exports.funUtils=function (_result,key,calcKey) {
    var map = {},
        dest = [];
    for (var i = 0; i < _result.length; i++) {
        var ai = _result[i];
        if (!map[ai[key]]) {
            var _s={}
            _s[key]=ai[key]
            _s[calcKey]= ai[calcKey]
            _s.data=[ai]

            dest.push(_s);
            map[ai[key]] = ai;
        } else {
            for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj[key] == ai[key]) {
                    dj.data.push(ai);
                    break;
                }
            }
        }
    }
    return dest;
}