/**
 * Created by yang on 7/28/16.
 */

function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

var input = document.getElementById("input");
var left_in = document.getElementById("left-in");
var right_in = document.getElementById("right-in");
var left_out = document.getElementById("left-out");
var right_out = document.getElementById("right-out");
var sort = document.getElementById("sort");
var search = document.getElementById("search");
var box = document.getElementById("block-box");

var data = {
    str: [],

    highlight: [],

    inputProcessor: function () {
        var raw = input.value.trim();
        var arr = raw.split(/[^\u4e00-\u9fa5\w]+/g).filter(function (e) {
            return e.length !== 0;
        });
        return arr;
    },

    leftIn: function () {
        var add = this.inputProcessor();
        for (var i = 0; i<add.length; i++){
            this.str.unshift(parseInt(add[i]));
        }
        if (this.str.length > 60) {
            alert("more than 60 numbers are in store.");
        }
        this.draw();
    },

    leftOut: function () {
        this.str.shift();
        this.draw();
    },

    rightIn: function () {
        this.str.push(input.value);
        if (this.str.length > 60) {
            alert("more than 60 numbers are in store.");
        }
        this.draw();
    },

    rightOut: function () {
        this.str.pop();
        this.draw();
    },

    delete: function (cur) {
        this.str.splice(cur, 1);
        this.draw();
    },

    addDeleteHandler: function () {
        for (var j = 0; j < box.childNodes.length; j++) {
            box.childNodes[j].addEventListener("click", function (j) {
                return function () {
                    return data.delete(j);
                }
            }(j), false);
        }
    },

    draw: function () {
        var html = "";
        for (var i = 0; i < data.str.length; i++){
            html += "<div class = 'block'><div>" + data.str[i] + "</div></div>";
        }
        box.innerHTML = html;
    },

    render: function () {
        for (var j=0; j<this.highlight.length; j++){
            document.getElementById("block-box").childNodes[this.highlight[j]].className = "highlight";
        }
    },

    bubbleSort: function () {
        var clock;
        var tmp = 0;
        clock = setInterval(function () {
            for (var i = 0; i < (data.str.length - 1); i++) {
                for (var j = 0; j < (data.str.length - i - 1); j++) {
                    if (parseInt(data.str[j]) > parseInt(data.str[j + 1])) {
                        tmp = parseInt(data.str[j]);
                        data.str[j] = data.str[j + 1];
                        data.str[j + 1] = tmp;
                    }
                }
                data.draw();
            }
            // clearInterval(clock);
        }, 500);
    },

    isMatch: function (item,keyword) {
        var reg = new RegExp(keyword);
        if (item.toString().match(reg)){
            return true;
        }else {
            return false;
        }
    },

    search: function () {
        this.highlight = [];
        var keyword = document.getElementById("search-input").value;
        for (var i=0; i<data.str.length; i++){
            if (this.isMatch(this.str[i], keyword)){
                this.highlight.push(i);
            }
        }
        this.render();
    },

    addHover: function () {

    }
};


(function () {
    //push & pop operation
    left_in.addEventListener("click", function () {
        data.leftIn();
    }, false);
    // left_out.addEventListener("click", data.leftOut, false);     this.str is undefined cuz this is left_out(btn)
    left_out.addEventListener("click", function () {
        data.leftOut();
    }, false);
    right_in.addEventListener("click", function () {
        data.rightIn();
    }, false);
    right_out.addEventListener("click", function () {
        data.rightOut();
    }, false);
    sort.addEventListener("click", function () {
        data.bubbleSort();
    });
    search.addEventListener("click", function () {
        data.search();
    });
    box.addEventListener("mouseover", function (e) {
        if (e.target.className == "block"){
            e.target.innerHTML += "delete";
        }
    }, true);
    box.addEventListener("mouseleave", function (e) {
        if (e.target.className == "block"){
        }
    }, true);
})();