### React 性能优化之 shouldComponentUpdate、PureComponent 和 React.memo

-   其中 shouldComponentUpdate 和 React.PureComponent 是类组件中的优化方式，而 React.memo 是函数组件中的优化方式。

1. shouldComponentUpdate:

-   主要是用来做子组件是否渲染的对比，返回 true 则代表渲染，返回 false 则代表不渲染
-   接受两个参数，nextProps、nextState，一般是在 render()前会调用 shouldComponentUpdate
-   如果使用 forceUpdate()方法则会强制进行渲染，跳过子组件的 shouldComponentUpdate()

2. PureComponent:

-   React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

3. React.memo 或者 memo:

-   React.memo 事实上作为高阶组件，只作用于函数组件
-   React.memo 仅仅只检查 props 的变更，如果函数里面用了 hook 的一些，它仍然会重新渲染
-   React.meom 默认只会对复杂对象做浅层对比（即仅仅是对象地址的对比），这个和 PureComponent 相似，如果想要控制具体对比过程，可以将自定义比较函数通过第二个参数传入

```
const machProps = (props, nextProps): boolean => {
    return false;
}

const ConfigTitle: React.FC<ConfigTitleProps> = ({ ...rest }) => {
    return (
        <div className="config-title-conent">
            <span className="config-title">{ rest.title }</span>
            <span className="config-id">链路ID：{ rest.id }</span>
        </div>
    );
};

export default React.memo(ConfigTitle, machProps);
```
