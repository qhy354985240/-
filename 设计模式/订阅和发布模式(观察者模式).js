/**
 * 这是一种创建松散耦合代码的技术，它定义了对象间一种多对一的依赖关系，当一个对象的状态发生改变的时候，其它对象都会得到通知。
 * 一般由一个主体多个观察者组成。主体用来发布事件，观察者通过订阅这些事件来观察该主体。
 */

class EventEmitter {
    constructor() {
        this.event = {};
    }
    on(type, fn) {
        if (!this.event[type]) this.event[type] = [];
        this.event[type].push(fn);
    }

    off(type, fn) {
        if (!this.event[type]) return;
        this.event[type] = this.event[type].filter((item) => {
            return item !== fn;
        });
    }

    emit(type, ...rest) {
        if (!this.event[type]) return;
        this.event[type].forEach((fn) => {
            fn.apply(this, rest);
        });
    }

    once(type, fn) {
        if (!this.event[type]) this.event[type] = [];
        function _fn() {
            fn();
            this.off(type, _fn);
        }
        this.event[type].push(_fn);
    }
}

let event = new EventEmitter();
