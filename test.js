var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
console.log(object.getNameFunc()());

// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         var that = this;
//         // return function(){
//         //     return that.name;
//         // };
//         return this;
//     }
// };
// console.log(object.getNameFunc());

var func = function (cur) {
    return function(){
        return cur;
    }
};

func(3);