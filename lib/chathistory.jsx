import React from 'react';
import validator from 'validator'

export default
class ChatHistory extends React.Component {

  constructor() {
    super();
    this.state = { msgs: [] };
  }

  shouldComponentUpdate(nextProps) {
    const next = nextProps.messages;
    const current = this.props.messages;
    return next[next.length - 1] !== current[current.length - 1];
  }

  componentDidUpdate() {
    const panel = this.refs.chat_container;
    if (panel.lastChild) panel.lastChild.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map((message, idx) => {
      const actualMessage = message.split(']:');
      if(validator.isURL(actualMessage[1]))
        return (
          <li key={idx} style={this.props.myStyle.list_items}>
            {actualMessage[0]}]:<a href={actualMessage[1]}>{actualMessage[1]}</a>
          </li>
        );
      else
      return (
        <li key={idx} style={this.props.myStyle.list_items}>
          {message}
        </li>
      );
    });
    return (
      <div ref={'chat_container'} style={this.props.myStyle.container}>
        {messageList}
      </div>
    );
  }
}
