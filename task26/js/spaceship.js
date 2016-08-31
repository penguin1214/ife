/**
 * Created by yang on 8/23/16.
 */

// 每个飞船由以下部分组成
// 动力系统，可以完成飞行和停止飞行两个行为，暂定所有飞船的动力系统飞行速度是一致的，比如每秒20px，飞行过程中会按照一定速率消耗能源（比如每秒减5%）
// 能源系统，提供能源，并且在宇宙中通过太阳能充电（比如每秒增加2%，具体速率自定）
// 信号接收处理系统，用于接收行星上的信号
// 自爆系统，用于自我销毁
// 每个飞船的能源是有限的，用一个属性来表示能源剩余量，这是一个百分比，表示还剩余多少能源。
// 能源耗尽时，飞船会自动停止飞行
// 飞船有两个状态：飞行中和停止，飞船的行为会改变这个属性状态
// 飞船的自我销毁方法会立即销毁飞船自身

function Spaceship(status, remain) {
    this.launchboard = {
        _status: status,
        _velocity: 20
    };

    this.power = {
        _remain: remain,
        _charge: 0.2
    };

    this.signal = {
        receive: function () {

        }
    };

    this.destroy = function () {

    };
}