import React, { Component } from 'react';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  effectVisible: boolean;
}

export default class ClsComp extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'NAME',
    };
  }

  componentDidMount() {
    const prevVal = this.props.value;
    setTimeout(() => {
      console.log('prop name =>', this.props.value, ' | ', prevVal);
    }, 4000);
  }

  updateState = () => {
    this.setState(this.state);
  };

  render() {
    // console.log('class rerender');
    return (
      <div onClick={this.updateState}>
        class componet {this.state.name} value {this.props.value}
      </div>
    );
  }
}
