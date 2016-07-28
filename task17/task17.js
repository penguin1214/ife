/**
 * Created by yang on 7/25/16.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementsByClassName("aqi-chart-wrap");
    var data = chartData[pageState.nowSelectCity][pageState.nowGraTime];
    var wrap = "";
    for (var i = 0; i < data.length; i++){
        wrap += "<div style='height:" + data[i] + "px;'>" + "</div>"
    }
    chart.innerHTML = wrap;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据
    var value;
    var field = document.getElementById("form-gra-time");
    field.addEventListener("click", function (e) {
        if (e.target.nodeName.toLowerCase() == "label") {
            if (!(e.target.querySelector("input").value == pageState.nowGraTime)) {
                pageState.nowGraTime = e.target.querySelector("input").value;
            }
        } else if (e.target.nodeName.toLowerCase() == "input") {
            if (!(e.target.value == pageState.nowGraTime)) {
                pageState.nowGraTime = e.target.value;
            }
        }
    }, false);


    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化

    // 设置对应数据
    var select = document.getElementById("city-select");
    select.addEventListener("click", function (e) {
        if (e.target.nodeName.toLowerCase() == "select") {
            if (!(pageState.nowSelectCity == e.target.value)) {
                pageState.nowSelectCity = e.target.value;
            }
        }
    }, false);
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = "";
    for (var key in aqiSourceData) {
        select += "<option>" + key + "</option>";
    }
    document.getElementById("city-select").innerHTML = select;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    // chartData{
    //     "city": {
    //         "day": [...],
    //         "week": [...],
    //         "month": [...]
    //     }
    //
    // }
    var obj;
    var sum = 0;
    var ave = 0;
    var day = [];
    var week = [];
    var month = [];

    //process one city a time
    for (var i in aqiSourceData) {
        obj = aqiSourceData[i];
        day = [];
        week = [];
        month = [];
        for (var j in obj) {
            //day data
            day.push(obj[j]);
        }

        //week data
        for (var n = 0; n < Math.floor(Object.keys(obj).length / 7); n++) {
            sum = 0;
            for (var m = 0; m < 7; m++) {
                var v = day[n * 7 + m];
                sum += v;
            }
            week.push(Math.floor(sum / 7));
        }

        chartData[i] = {
            "day": day,
            "week": week
        };
    }
}

/**
 * 初始化函数
 */
function init() {
    initAqiChartData();
    initGraTimeForm();
    graTimeChange();
    initCitySelector();
    citySelectChange();
}

init();
