import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const EffectComponent = ({ name }) => {
  const [state, setState] = useState('init');
  const inputRef = useRef();

  // useEffect 的回调函数会在第一次 render 后依次被调用
  useEffect(() => {
    // 如果在 effect 回调 or 事件中执行 setState, render 会稍后执行
    console.log('before mount set =>', state);
    setState('mount set');
    // setState(prev => {
    //   console.log('mount setState callback =>', prev);
    //   return 'mount set 2'
    // });
    console.log('after mount set =>', state);

    setTimeout(() => {
      // 如果在 timeout 中 setState render 会同步执行
      console.log('before timeout set =>', state);
      setState(prev => {
        console.log('settimeout setState callback =>', prev);
        return prev
      });
      // 此时只修改了下次 render useState 返回的 state 的值，此函数中的 state 是通过闭包保持的上一次的 state 值
      console.log('after timeout set =>', state);
    }, 5000);

    // only if component unmount by parent
    return () => {
      // the value of state always be the inital useState value
      console.log('unmount =>', state);
    };
  }, []);

  useEffect(() => {
  //   // second call
    console.log('update effect =>', state);

  //   setTimeout(() => {
  //     // setState('update timout set');

  //     console.log('8 / 9 update timeout call =>', state);
  //   });

  //   // would call every time before change value
  //   return () => {
  //     console.log('5 update end =>', state);
  //   };
  }, [state]);

  // First call
  // console.log('main body name => ', name);
  // console.log('1 / 4 main body =>', state);

  const changeState = () => {
    // setState('change');

    // console.log('Before prev state =>', state);
    // TODO: setState 传入一个函数和直接获取当前的 state 不都是之前的 state 吗？
    setState((prv) => {
      // console.log('prev state =>', prv);
      return 'callback change';
    });
    // 为什么值没有改变，但会重新渲染两次，搜索 STO 一些回答说是 react 只是 state 不变时尽可能不重新渲染？但不保证？
    // console.log('value changed', inputRef.current.value === state);
    // setState(inputRef.current.value);
  };

  const changeVal = useCallback((e) => {
    // console.log('changeVal', e.target.value);
    inputRef.current.value = e.target.value;
  }, []);

  return (
    <div>
      {console.log('body rendered', state)}
      <h1>
        Hello {name}! : {state}
      </h1>
      <input type="text" onChange={changeVal} ref={inputRef} />
      <button onClick={changeState}>change state</button>
      <button onClick={changeState}>change state 2</button>
    </div>
  );
};

// export default EffectComponent;

// react memo 并不是组件整个组件的意思，而是当上一次的 prop 和新的 prop 对比时如果浅比较值一致，那一次渲染会被跳过
export default React.memo(EffectComponent);

// export default React.memo(
//   EffectComponent,
//   function customizeCompare(prevProps, newProps) {
//     return true;
//   }
// );

// 函数组件 执行顺序
// 1. render 函数体
// 2. useEffect 中的回调，按顺序同步执行
// 3. useEffect 中的 setState()
// 4. render 函数体 获取新的 state
// 5. useEffect 回调函数的返回值函数，获取的值是上一次的 state <- 这一步是怎么做到的？？明明上一步 render 已经获取了新的 state
