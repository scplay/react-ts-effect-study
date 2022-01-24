import React, { useCallback, useEffect, useRef, useState } from 'react';

const EffectComponent = ({ name }) => {
  const [state, setState] = useState('init1');
  const inputRef = useRef();

  // useEffect 的回调函数会在第一次 render 后依次被调用
  useEffect(() => {
    // second call
    console.log('2 mount effect =>', state);

    setState('mount set');

    setTimeout(() => {
      setState('mount timout set');

      console.log('7 mount timeout call =>', state);
    });

    // only if component unmount by parent
    return () => {
      // the value of state always be the inital useState value
      console.log('unmount =>', state);
    };
  }, []);

  // useEffect(() => {
  //   // second call
  //   console.log('3 / 6 update effect =>', state);

  //   setTimeout(() => {
  //     setState('update timout set');

  //     console.log('8 / 9 update timeout call =>', state);
  //   });

  //   // would call every time before change value
  //   return () => {
  //     console.log('5 update end =>', state);
  //   };
  // }, [state]);

  // First call
  // console.log('main body name => ', name);
  console.log('1 / 4 main body =>', state);

  const changeState = useCallback(() => {
    // setState('change');
    // 为什么值没有改变，但会重新渲染两次
    console.log('value changed', inputRef.current.value === state);

    setState(inputRef.current.value);
  }, []);

  const changeVal = useCallback((e) => {
    // console.log('changeVal', e.target.value);
    inputRef.current.value = e.target.value;
  }, []);

  return (
    <div>
      <h1>Hello {name}!</h1>
      <input type="text" onChange={changeVal} ref={inputRef} />
      <button onClick={changeState}>change state</button>
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
