function Node(ele) {
    this.ele = ele;
    this.children = [];
    this.cut = function () {
        for (var i = 0; i<this.children.length; i++){
            this.children[i] = null;
        }
    };
    this.parent = null;
}

var root = new Node(document.getElementById("root"));
var node = new Node(document.getElementById("node"));
var node2 = new Node(document.getElementById("node2"));
node.parent = root;
node2.parent = root;

window.onload = function () {
    root.children.push(node);
    root.children.push(node2);
    root.cut();
    // node.parent.cut();
};

