import React, {Component} from 'react';
import './message.css';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

class Message extends Component {
    render() {
        return (
            <div className="message">
                {this.showMessage(this.props)}
            </div>
        );
    }

    showMessage(props) {
        message.config({
            top: 70
        });
        message.info(props.text, props.duration); 
    }

}
export default Message