/**
 * Created by yang on 8/1/16.
 */

var btn = document.getElementsByClassName("mode-btn"),
    preBtn = btn[0],
    inBtn = btn[1],
    postBtn = btn[2],
    nodeList = [],
    treeRoot = document.getElementById("root"),
    timer = null,
    query = "";

window.onload = function () {
    preBtn.onclick = function () {
        reset();
        preOrder(treeRoot);
        changeColor();
    };

    inBtn.onclick = function () {
        reset();
        inOrder(treeRoot);
        changeColor();
    };

    postBtn.onclick = function () {
        reset();
        postOrder(treeRoot);
        changeColor();
    };
};

function preOrder(node) {
    if (!(node == null)){
        nodeList.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}

function inOrder(node) {
    if (!(node == null)){
        inOrder(node.firstElementChild);
        nodeList.push(node);
        inOrder(node.lastElementChild);
    }
}

function postOrder(node) {
    if (!(node == null)){
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        nodeList.push(node);
    }
}

function reset() {
    query = document.getElementById("query").value;
    nodeList = [];
    var divs = document.getElementsByTagName("div");
    for (var i = 0; i<divs.length; i++){
        divs[i].style.background = "#fff";
    }
    clearInterval(timer);
}

function changeColor() {
    var i = 0;
    nodeList[i].style.backgroundColor = "blue";
    timer = setInterval(function (argument) {
        if (query == nodeList[i].innerHTML.split('<')[0].trim()){
            nodeList[i].style.backgroundColor = "yellow";
        }else {
            i++;
            if (i<nodeList.length){
                nodeList[i-1].style.backgroundColor = "#fff";
                nodeList[i].style.backgroundColor = "blue";
            }else{
                clearInterval(timer);
                nodeList[nodeList.length-1].style.backgroundColor = "#fff";
            }
        }

    },500)
}
