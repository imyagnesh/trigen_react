import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';

export default class index extends PureComponent {
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return shallowCompare(this, nextProps, nextState);
  //   }

  componentDidMount() {
    // document.addEventListener('mousemove', this.mouseMove);
    // this.interval = setInterval(() => {
    //   console.log('interval');
    // }, 1000);
  }

  componentWillUnmount() {
    // document.removeEventListener(
    //   'mousemove',
    //   this.mouseMove,
    // );
    // clearInterval(this.interval);
  }

  mouseMove = () => {
    console.log('Mouse move');
  };

  render() {
    console.log('Child 1 Component');
    const { a } = this.props;
    // if (a >= 20) {
    //   throw new Error(
    //     'Value should not be greater then 20',
    //   );
    // }
    return (
      <div>
        Child 1 Component
        <h3>Value of a from Child 1: {a}</h3>
      </div>
    );
  }
}
