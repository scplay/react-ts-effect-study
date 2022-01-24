import React, { Component } from 'react';
import { render } from 'react-dom';
import EffectExample from './EffectExample';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  effectVisible: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'EffectExample',
      effectVisible: true,
    };
  }

  toggleEffectComponent = () => {
    this.setState({ effectVisible: !this.state.effectVisible });
  };

  render() {
    const { effectVisible } = this.state;
    return (
      <div>
        {effectVisible && <EffectExample name={this.state.name} />}
        <button onClick={this.toggleEffectComponent}>
          Toggle Effect Component
        </button>

        <p>Start editing to see some magic happen :)</p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
