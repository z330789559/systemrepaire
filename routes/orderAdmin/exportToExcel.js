/**
 * Created by baozhong on 2017/3/10.
 */
var obj=require('../../utils/excelHelper');
var moment=require('moment')
var models=require("../../lib/core")
var $Order=models.$Order;
var excel=obj.excel
exports.get=function*(){
    var conf={}
    var end=new Date(),
        start=moment(Date.now()).subtract("1","months").toDate()
    if(this.querystring){
        start=this.querystring.match(/start=(\d{4}-\d{2}-\d{2})/)&&this.querystring.match(/start=(\d{4}-\d{2}-\d{2})/)[1]||start
        end=this.querystring.match(/end=(\d{4}-\d{2}-\d{2})/)&&this.querystring.match(/end=(\d{4}-\d{2}-\d{2})/)[1]||end
    }

    var orders=yield $Order.getAllOrdersForExcel(start,end)
    // 设备	操作员	创建时间	故障原因	组别	维修方式	评分	维修员	维修时间
    conf.cols = [
        {caption:'设备', type:'string'},
        {caption:'操作员', type:'string'},
        {caption:'报修时间', type:'string'},
        {caption:'组别', type:'string'},
        {caption:'故障原因', type:'string'},
        {caption:'维修方式', type:'string'},
        {caption:'评分', type:'number'},
        {caption:'维修员', type:'string'},
        {caption:'抢单时间', type:'string'},
        {caption:'完成时间', type:'string'},
        {caption:'故障间隔', type:'string'}
    ];
    conf.rows = orders.map(function (item) {
        return [item.title, item.operator.name, moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group, item.reasonCode, item.repaireMethod || "", item.score == 6 ? "未评分" : item.score, item.repairor || "", item.update_at ? moment(item.update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss") : "",
            item.report_at ? moment(item.report_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss") : "", item.report_at ? moment.utc(moment(item.create_at, "DD/MM/YYYY HH:mm:ss").diff(moment(item.report_at, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss") : ""]
    })
    
     var filename ="导出excel.xlsx";
     this.set('Content-Disposition', 'attachment; filename='+encodeURIComponent(filename));
      var file_path=  yield excel.createExcel({
            data:conf,
            savePath:"tempPath"
        });


        var start =file_path.lastIndexOf('/');
        var filename = file_path.substring(~~start+1);

        this.set('Content-disposition','attachment;filename='+filename);

        var info =yield obj.readData(file_path);

        this.body=info;


}

