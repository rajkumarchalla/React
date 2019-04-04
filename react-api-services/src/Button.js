import React from 'react'
import ReactDOM from 'react-dom';
import _ from './Button.css';
class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick () {
    this.props.clickHandler(this.props.name)
  }

  render () {
    const className = ['component-button',this.props.orange ? 'orange' : '',this.props.wide ? 'wide' : '']

    return (
    <div className={className.join(' ').trim()}>
        <button onClick={this.handleClick.bind(this)}>{this.props.name}</button>
    </div>
    )
  }
}

export default Button;