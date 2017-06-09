
import React from 'react';
import ReactDOM from 'react-dom';
import TextareaCompatible from '../src';

class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  render() {
    return (
      <div>
        <h2>Component with maxLength</h2>
        <pre>{`<TextareaCompatible
  value={this.state.value}
  maxLength={30}
  onChange={value => this.setState({ value })}
/>`}
        </pre>

        <TextareaCompatible
          value={this.state.value}
          maxLength={30}
          onChange={value => this.setState({ value })}
          rows={5}
          cols={50}
          spellCheck={false}
          placeholder={'this is \na \nmultiple line \nplaceholder'}
        />
        <p className={'text-count'}>
          {this.state.value.length} / 30
        </p>

        <bold>Inputed value:</bold>
        <pre>
          {this.state.value}
        </pre>
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#main')
);
