/**
 * Created by yang on 8/20/16.
 */

var nodes = [];
var tar;
var delBtn = document.getElementById("del-btn");
var addBtn = document.getElementById("add-btn");
var data = "";


window.onload = function () {
    document.getElementById("root").addEventListener("click", function (event) {
        if (event.target.nodeName.toLowerCase() == "div") {
            reset();
            tar = event.target;
            event.target.style.background = "#75b86b";
        }
    });

    delBtn.onclick = function () {
        if (tar == null){
            alert("please select");
        }else {
            var parent = tar.parentNode;
            parent.removeChild(tar);
        }
    };

    addBtn.onclick = function () {
        data = document.getElementById("data").value;
        if (data == ""){
            alert("please insert data");
        }else if (tar == null) {
            alert("please select");
        }else {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = data;
            newDiv.className = "child";
            tar.appendChild(newDiv);
            reset();
        }
    };
};

function reset() {
    nodes = document.getElementById("wrapper").getElementsByTagName("div");
    for (var i = 0; i<nodes.length; i++){
        nodes[i].style.background = "#fff";
        tar = null;
    }
}

