/**
 * Created by yang on 7/26/16.
 */
var input = document.getElementById("input");
var left_in = document.getElementById("left-in");
var right_in = document.getElementById("right-in");
var left_out = document.getElementById("left-out");
var right_out = document.getElementById("right-out");
var box = document.getElementById("block-box");
var data = [];
var tmp = 0;

function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

function leftIn() {
    data.unshift(input.value);
    draw();
}

function leftOut() {
    tmp = data[0];
    data.shift();
    alert(tmp);
    draw();
}

function rightIn() {
    data.push(input.value);
    draw();
}

function rightOut() {
    tmp = data[0];
    data.pop();
    alert(tmp);
    draw();
}

function draw() {
    var html = "";
    for (var i = 0; i < data.length; i++){
        html += "<div class = 'block'><div class='text'>" + data[i] + "</div></div>";
    }
    box.innerHTML = html;
    for (var i = 0; i < box.childNodes.length; i++){
        box.childNodes[i].addEventListener("click",function (cur) {
            return function () {
                return data.splice(cur,1);
            }
        }(i) ,false)
    }
}

(function () {
    //push & pop operation
    addEventHandler(left_in, "click", leftIn);
    addEventHandler(left_out, "click", leftOut);
    addEventHandler(right_in, "click", rightIn);
    addEventHandler(right_out, "click", rightOut);
    draw();
})();


