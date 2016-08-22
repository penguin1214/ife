/**
 * Created by yang on 8/20/16.
 */

//node
function Node(obj) {
    this.parent = obj.parent;
    this.children = obj.children || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement; //访问对应的DOM结点
    this.selfElement.Node = this;   // 对应的DOM结点访问回来
}

Node.prototype = {
    constructor: Node,

    render: function (arrow, visibility, toHighlight, deHighlight) {
        if (arguments.length < 3){
            toHighlight = false;
            deHighlight = false;
        }
        if (arrow){
            if (this.isLeaf()){
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow no-arrow";
            }else if (this.isFolded){
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
            }else{
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
            }
        }
        if (visibility){
            if (this.selfElement.className.indexOf("node-visible") == -1){
                this.selfElement.className = this.selfElement.className.replace("hidden", "visible");
            }else {
                this.selfElement.className = this.selfElement.className.replace("visible", "hidden");
            }
        }
        if (toHighlight){
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
        }
        if (deHighlight){
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
        }
    },

    toggleFold: function () {
        if (this.isLeaf())  return this;

        for (var i = 0; i<this.children.length; i++){
            this.children[i].render(false, true);
        }
        this.render(true, false);
        return this;
    },

    isLeaf: function () {
        return this.children.length == 0;
    },

    isFolded: function () {
        if (this.isLeaf())  return false;
        if (this.children[0].selfElement.className == "node-visible") return false;
        return true;
    },

    addChild: function (content) {
        if (content == null) return this;
        if (content.trim() == ""){
            alert("no content");
            return this;
        }

        if (!this.isLeaf() && this.isFolded()){
            this.toggleFold();
        }

        var newNode = document.createElement("div");
        newNode.className = "node-visible";
        var newSymbol = document.createElement("div");
        newSymbol.className = "arrow no-arrow";
        var newTitle = document.createElement("span");
        newTitle.className = "node-title";
        newTitle.innerHTML = content;
        newNode.appendChild(newSymbol);
        newNode.appendChild(newTitle);
        this.selfElement.appendChild(newNode);
        this.children.push(new Node({parent: this, children:[], data: content, selfElement:newNode}));
        this.render(true, false);
        return this;
    }
};


var root = new Node({parent:null, children: [], data: "yamibo", selfElement: document.getElementById("root")});
addEvent(root.selfElement, "click", function (e) {
    var target = e.target || e.srcElement;
    var domNode = target;
    while (domNode.className.indexOf("node") == -1){
        domNode = domNode.parentNode;
    }
    selectedNode = domNode.Node;

    if (target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1){
        selectedNode.toggleFold();
    }
});

//生成测试数据
root.addChild("技术").addChild("IT公司").addChild("谈笑风生");
root.children[0].addChild("HTML5").addChild("CSS3").addChild("JavaScript").addChild("PHP").addChild("Node.JS").toggleFold();
root.children[0].children[4].addChild("JavaScript").toggleFold();
root.children[1].addChild("百度").addChild("腾讯").addChild("大众点评").toggleFold();
root.children[2].addChild("身经百战").addChild("学习一个").addChild("吟两句诗").toggleFold();
root.children[2].children[2].addChild("苟利国家生死以").toggleFold();

// 跨浏览器兼容的工具函数
function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    }
    else {
        element["on" + type] = handler;
    }
}