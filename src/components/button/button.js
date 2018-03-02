import React, {Component} from 'react';
import './button.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
        let style = this.props.bstyle || "primary";
        let size = this.props.size || "lg";
        let value = this.props.text;
        let col = this.props.col;
        let newStyle = style === 'new' ? this.props.newStyle : {};
        return (
            <button className={`btn btn-${style} btn-${size} btncol-${col} gutter`} style={newStyle}
                onClick={this.onButtonClick.bind(this)}>{value}</button>
        );
    }
    onButtonClick() {
        this.props.onClick();
    }

}

export default Button