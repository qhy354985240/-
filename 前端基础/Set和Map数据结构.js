// Set 去重（具有 iterable 接口的其他数据结构）

// 1. Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

// 2. 也可以对字符串进行去重
[...new Set('aabbcc')].join(''); // abc

// 3. 常用操作值的API
// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。

// 4. Array.from方法可以将 Set 结构转为数组。

// 5. 常用遍历的方法
// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员

// WeakSet
// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

// 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。其次WeakSet不能进行遍历
const ws = new WeakSet();
ws.add(1);
// TypeError: Invalid value used in weak set
ws.add(Symbol());
// TypeError: invalid value used in weak set
// 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，
// 那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

// Map 区别于普通对象的是，Map也是键值对集合，但是Map的键可以是各种类型的值

// 1. Map的键实际上是和内存地址绑定在一起的，只有内存地址不一样，才会视为两个不同的键
// 2. Map构造函数可以接受一个数组作为初始化的值，但是数组里面必须是一对存在
const map = new Map([
    ['a', 'value'],
    [1, 'xxx'],
]);
// 3. 转为数组的话，可以使用扩展运算法...或者Array.form()来进行转换

// WeakMap 类似于WeakSeat 只能以对象作为键的存在
