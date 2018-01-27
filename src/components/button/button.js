import React, {Component} from 'react';
import './button.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
        let style = this.props.style;
        let size = this.props.size;
        let value = this.props.text;
        let col = this.props.col;
        return (
            <button className={`btn btn-${style} btn-${size} btncol-${col} gutter`}
                onClick={this.onButtonClick.bind(this)}>{value}</button>
        );
    }
    onButtonClick() {
        this.props.onClick();
    }

}

export default Button