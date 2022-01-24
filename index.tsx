import React, { Component } from 'react';
import { render } from 'react-dom';
import EffectExample from './EffectExample';
import ClsComp from './ClassComponent';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  effectVisible: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      name: 'EffectExample',
      effectVisible: true,
    };
  }

  toggleEffectComponent = () => {
    this.setState({ effectVisible: !this.state.effectVisible });
  };

  changeCompName = () => {
    // React.memo 应用的地方，name 值未改变，组件并不 rerender
    this.setState({ name: this.state.name });
    this.setState({ name: this.state.name + ' Changed' });
  };


  render() {
    const { effectVisible } = this.state;
    return (
      <div>
        {/* {effectVisible && <EffectExample name={this.state.name} />} */}
        <p>
          <button onClick={this.changeCompName}>
            Toggle Effect Component Name
          </button>
          <br />
          <button onClick={this.toggleEffectComponent}>
            Toggle Effect Component
          </button>
        </p>
        <ClsComp value={this.state.name} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
