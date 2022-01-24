import React, { useEffect, useState } from 'react';

export default React.memo(({ name }) => {
  const [state, setState] = useState('init1');

  // useEffect 的回调函数会在第一次 render 后依次被调用
  useEffect(() => {
    // second call
    console.log('2 mount effect =>', state);

    setState('mount set');
    1;

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
  console.log('1 / 4 main body =>', state);

  return (
    <>
      <h1>Hello {name}!</h1>
      <button onClick={() => setState('change')}>change state</button>
    </>
  );
});
