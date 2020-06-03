/**
 * 给一个固定时间，如果你开始触发动作，并且在这个固定时间内不再有任何动作，我就执行一次，否则我每次都会重新开始计时
 * 用于input.change实时输入校验，比如输入实时查询，你不可能摁一个字就去后端查一次，肯定是输一串，统一去查询一次数据。
 */
function debounce(fn, delay) {
    let timer = null;
    return function (...rest) {
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(this, rest);
        }, delay);
    };
}

/**
 * 用户会反复触发一些操作，比如鼠标移动事件，此时只需要指定一个“巡视”的间隔时间，不管用户期间触发多少次，只会在间隔点上执行给定的回调函数。
 * 用于监听 mousemove、 鼠标滚动等事件，通常可用于：拖拽动画、下拉加载。
 */
function throttle(fn, delay) {
    let flag = true;
    return function (...rest) {
        if (!flag) return;
        flag = false;
        setTimeout(function () {
            fn.apply(this, rest);
            flag = true;
        }, delay);
    };
}
