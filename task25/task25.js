/**
 * Created by yang on 8/21/16.
 */
//yet another javascript file

function Node(obj) {
    this.parent = obj.parent;
    this.children = obj.children || [];
    this.content = obj.content;
    this.ele = obj.ele;
    this.ele.Node = this;

    this.addChild = function (content) {
        if (content == null || content.trim() == ""){
            alert("no content")
        }

        var newNode = document.createElement("div");
        newNode.className = "node-hidden";
        var newSymbol = document.createElement("div");
        newSymbol.className = "arrow no-arrow";
        var newTitle = document.createElement("span");
        newTitle.className = "node-title";
        newTitle.innerHTML = content;
        newNode.appendChild(newSymbol);
        newNode.appendChild(newTitle);
        this.ele.appendChild(newNode);
        this.children.push(new Node({parent: this, children:[], content: content, ele:newNode}));
        return this;
    };

    this.isLeaf = function () {
        if (this.children.length == 0) return true;
        else return false;
    };

    this.unfold = function () {
        if (this.isLeaf()) return this;
        else{
            this.arrow(2);
            for (var i = 0; i<this.children.length; i++){
                this.children[i].ele.className = "node-visible";
            }
        }
    };

    this.fold = function () {
        if (this.isLeaf()) return this;
        else {
            this.arrow(1);
            for (var i = 0; i<this.children.length; i++){
                this.children[i].ele.className = "node-hidden";
            }
        }
    };

    this.isFolded = function () {
        if (!(this.children.length == 0)) {
            if (this.children[0].ele.className.indexOf("visible") == -1) {
                return true;
            }else return false;
        }else return false;
    };

    /*
    0: no-arrow; 1: right-arrow; 2:down-arrow
     */
    this.arrow = function (status) {
        if (status == 0){
            this.ele.getElementsByClassName("arrow")[0].className = "arrow no-arrow";
        }else if (status == 1){
            this.ele.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
        }else {
            this.ele.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
        }
    };
}

var root = new Node({parent: null, children: [], content: "yamibo", ele: document.getElementById("root")});

window.onload = function () {
    root.ele.addEventListener("click", function (e) {
        var target = e.target || e.srcElement;
        var domNode = target;
        if (domNode.className.indexOf("visible") == -1 || domNode.className.indexOf("hidden") == -1){
            domNode = domNode.parentNode;
        }

        var selectedNode = domNode.Node;
        if (selectedNode.isFolded()){
            selectedNode.unfold();
        }else {
            selectedNode.fold();
        }
    }, false);

//生成测试数据
    root.addChild("技术").addChild("IT公司").addChild("谈笑风生");
    root.children[0].addChild("HTML5").addChild("CSS3").addChild("JavaScript").addChild("PHP").addChild("Node.JS");
    root.children[1].addChild("百度").addChild("腾讯").addChild("大众点评");
    root.children[2].addChild("身经百战").addChild("学习一个").addChild("吟两句诗");
    root.children[2].children[2].addChild("苟利国家生死以");
};

