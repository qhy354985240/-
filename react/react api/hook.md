### hook

1. useState

-   useState 的初始值，只在第一次的时候有效,比如下面这种，state 的初始值只有第一次有效，后续 props.data 变不会有效的

```
const [state, setState] = useState(props.data);
```

2. useEffect

-   主要是为了在函数里面使用 class 里面的生命周期，每次函数的渲染都会触发 useEffect
-   如果只想像 componentDidMount 那样只在第一次用来请求异步数据，可以修改第二个参数为空数组，不加的话，则代表每一次渲染都执行

```
useEffect(()=>{
    // do something
},[])
```

-   同理，如果只想比如某个变量了才触发 useEffect，则可以把变量放进去这个数组里

```
useEffect(()=>{
    // do something   只有state改变了，我才执行
},[state])
```

-   如果有多个变量呢，可以选择写多个 useEffect,每个变量占一个，或者也可以在数组里，写多个变量，只不过多个变量里一个改变都会触发渲染

```
    useEffect(()=>{
    // do something state 或者 name 改变了，我都会执行
    },[state, name])

```

-   如果我们之前订阅了什么，最后在 willUnMount 这个生命周期里面要取消订阅，也可以用 useEffect 实现，只要返回一个函数，在返回的函数里进行取消订阅的操作即可

```
    useEffect(()=>{
    // 订阅
    return ()={
        // 取消订阅
    }
    })

```

-   useEffect 不能被判断包裹,因为 React 靠的是调用顺序来确定哪个 state 对应的是哪个 useState,如果是在判断中调用 hook 则会出问题

```
function Form() {
  const [name, setName] = useState('Mary');

  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  const [surname, setSurname] = useState('Poppins');

  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

}
```

```
// ------------
// 首次渲染
// ------------
useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle)     // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect(persistForm)     // 2. 替换保存 form 的 effect
useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect(updateTitle)     // 4. 替换更新标题的 effect

//
```

```
useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
// useEffect(persistForm)  // 🔴 此 Hook 被忽略！
useState('Poppins')        // 🔴 2 （之前为 3）。读取变量名为 surname 的 state 失败
useEffect(updateTitle)     // 🔴 3 （之前为 4）。替换更新标题的 effect 失败
```

-   useEffect 不能被打断

```
const [count, setCount] = useState(0)
useEffect(...)

return // 函数提前结束了

useEffect(...)
}
```

3. useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

```
你应该熟悉 ref 这一种访问 DOM 的主要方式。如果你将 ref 对象以 <div ref={myRef} /> 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

然而，useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式。

这是因为它创建的是一个普通 Javascript 对象。而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。

请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

```

4. useMemo 也是用来做是否渲染的，但是主要是变量级别的比如

```
const Child = memo(({data}) =>{

    return (
        <div>
            <div>child</div>
            <div>{data.name}</div>
        </div>
    );
})

// 父组件
const Hook =()=>{
    const [count, setCount] = useState(0)
    const [name, setName] = useState('rose')
    // 重点，当我们点击按钮更新count的时候，会重新进行渲染，当运行到以下data的时候，相当于给data生成了一个新的内存地址的对象，所以Child即使带着memo也会重新渲染Child
    const data = {
        name
    }
    return(
        <div>
            <div> {count}</div>
            <button onClick={()=>setCount(count+1)}>update count </button>
            <Child data={data}/>
        </div>
    )
}

// 使用useMemo
   const data = useMemo(()=>{
        return {
            name
        }
    },[name])

    // 相当于useMemo有个暂存的能力，只有当name改变的时候data才会改变，这样就不会每次data地址改变了，就触发了子组件的渲染
```

5. useCallback 和 useMemo 类似，只不过这个是暂存函数的

```
const Child = memo(({data, onChange}) =>{
    return (
        <div>
            <div>{data}</div>
            <input type="text" onChange={onChange}/>
        </div>
    );
})

const Hook =()=>{
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // 和上面同理，每次渲染都会生成一个新的函数，而赋值给Child
   const onChange=(e)=>{
        setText(e.target.value)
   }
    return(
        <div>
            <button onClick={()=>setCount(count + 1)}>count + 1</button>
            <Child data={name} onChange={onChange}/>
        </div>
    )
}

// 使用useCallback
  const onChange = useCallback((e)=>{
        setText(e.target.value)
   },[])
```

6. useReducer
