/**
 * Created by yang on 8/23/16.
 */

// 行星上有一个指挥官（不需要在页面上表现出其形象），指挥官可以通过行星上的信号发射器发布如下命令
// 创建一个新的飞船进入轨道，最多可以创建4个飞船，刚被创建的飞船会停留在某一个轨道上静止不动
// 命令某个飞船开始飞行，飞行后飞船会围绕行星做环绕运动，需要模拟出这个动画效果
// 命令某个飞船停止飞行
// 命令某个飞船销毁，销毁后飞船消失、飞船标示可以用于下次新创建的飞船

function Commander() {
    this.createSpaceship = function (id) {
        if (this.record[id-1] == null){
            space.Mediator.sendMessage({id:id, command:"create"});
            this.record[id-1] = 0;  //STOP:0; START: 1
        }else{
            console.log("this id is not available");
        }
    };
    this.start = function (id) {
        if (this.record[id-1] != null) {
            space.Mediator.sendMessage({id:id, command:"start"});
            console.log("start ship " + id);
        }else {
            console.log("no spaceship here!");
        }
    };
    this.stop = function () {

    };
    this.destroy = function () {

    };
    this.record = [null,null,null,null];
}