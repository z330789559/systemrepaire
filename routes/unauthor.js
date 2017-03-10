/**
 * Created by baozhong on 2017/2/27.
 */
exports.get=function* () {
    yield this.render("unauthor",{
        curSection:"orderAdmin",
        curPage:"allOrder"
    })
}