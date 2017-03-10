/**
 * Created by baozhong on 2017/3/10.
 */
var obj=require('../../utils/excelHelper');
var moment=require('moment')
var models=require("../../lib/core")
var $Order=models.$Order;
var excel=obj.excel
exports.get=function*(){
    var _this=this;
    var conf ={};
    var pre_time=moment(Date.now()).subtract("6","months").toDate();

    var orders=yield $Order.getOrderByTimeSpan(pre_time)
    // 设备	操作员	创建时间	故障原因	组别	维修方式	评分	维修员	维修时间
    conf.cols = [
        {caption:'设备', type:'string'},
        {caption:'操作员', type:'string'},
        {caption:'创建时间', type:'string'},
        {caption:'组别', type:'string'},
        {caption:'维修方式', type:'string'},
        {caption:'评分', type:'number'},
        {caption:'维修员', type:'string'},
        {caption:'维修时间', type:'string'}
    ];
    conf.rows = orders.map(function (item) {
        return [item.title,item.operator.name,moment(item.create_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"),
            item.operator.group,item.repaireMethod||"",item.score==6?"未评分":item.score,item.repairor||"",item.update_at?moment(item.update_at).utcOffset(8).format("YYYY-MM-DD,hh:mm:ss"):""]
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

