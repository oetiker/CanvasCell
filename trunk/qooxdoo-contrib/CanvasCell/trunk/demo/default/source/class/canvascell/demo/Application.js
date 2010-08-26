/* ************************************************************************

   Copyright: Public Domain
   Authors: Tobi Oetiker <tobi@oetiker.ch>

************************************************************************ */

/**
 * This is the main application class of your custom application "canvascell"
 */
qx.Class.define("canvascell.demo.Application", {
    extend : qx.application.Standalone,
    members : {
        main : function() {
            this.base(arguments);
            if (qx.core.Variant.isSet("qx.debug", "on")) {
                qx.log.appender.Native;
                qx.log.appender.Console;
            }

            var win = new qx.ui.window.Window("CanvasCellRenderer").set({
                layout : new qx.ui.layout.Grow(),
                allowClose: false,
                allowMinimize: false,
                contentPadding: 0,
                width: 500,
                height: 300
            });
            win.addListener('appear',function(){
                win.center();
            });
            win.open();

            // table model
            var tableModel = new qx.ui.table.model.Simple();
            tableModel.setColumns([ this.tr("ID"), "Bar", "Spark", "TwoBar","QBars" ]);
            tableModel.setData(this.createRandomRows(100));
            // table
            var table = new qx.ui.table.Table(tableModel).set({
                decorator: null
            })

            var tColMod = table.getTableColumnModel();
    
            var barRenderer = new canvascell.Renderer(
                new canvascell.plotter.Bar({
                    fill   : '#280',
                    border : '#260'
                })
            );
            tColMod.setDataCellRenderer(1,barRenderer);

            var sparkRenderer = new canvascell.Renderer(
                new canvascell.plotter.SparkLine({
                    lineWidth   : 0.5,
                    lineColor   : '#228',
                    sparkRadius : 1,
                    sparkColor  : '#f22',
                    singleScale : true,
                    depth       : 30
                })
            );
            tColMod.setDataCellRenderer(2,sparkRenderer);

            var twoBarRenderer = new canvascell.Renderer(
                new canvascell.plotter.TwoBar({
                    mainbarFill    : '#b00',
                    mainbarBorder  : '#a00',
                    stackbarFill   : '#b80',
                    stackbarBorder : '#a70'
                })
            );
            tColMod.setDataCellRenderer(3,twoBarRenderer);

            var qBarsRenderer = new canvascell.Renderer(
                new canvascell.plotter.QBars({
                    badBarColor:  '#f00',
                    badBgColor:   '#f88',
                    goodBarColor: '#0a0',
                    goodBgColor:  '#afa'
                })
            );
            tColMod.setDataCellRenderer(4,qBarsRenderer);
            win.add(table);
        },
        createRandomRows: function(rowCount) {
            var rowData = [];
            var now = new Date().getTime();
            var dateRange = 400 * 24 * 60 * 60 * 1000; // 400 days
            var nextId = 0;
            for (var row = 0; row < rowCount; row++) {
                var spark = [];
                for (var i=0;i<30;i++){
                    spark.push(Math.random()*100);
                }
                var qBars = {
                    left: Math.round(Math.random()*8),
                    right: Math.round(Math.random()*8),
                    data: spark
                };
                var two = {
                    mainbar: Math.random()*10,
                    stackbar: Math.random()*3
                };
                rowData.push([row,row,spark,two,qBars]);
            }
            return rowData;
        }
    }
});
