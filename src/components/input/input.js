import React, {Component} from 'react';
import './input.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
        let label = this.props.label;
        let text = this.props.text;
        let placeholder = this.props.placeholder || "";
        let align = this.props.align;
        let image = this.props.img;
        return (
            <div className="form-group-input">
                <label>{label}</label>
                <input type="text" value={text} onChange={this.onTextChange.bind(this)} placeholder={placeholder} 
                    style={{textAlign: `${align}`, width: image === undefined ? '95%' : '90%'}}/>
                {image}
                {/* {this.renderChildren(this.props)} */}
            </div>
        );
    }

    onTextChange(e) {
        this.props.onChange(e);
    }

    renderChildren(props) {
        //遍历所有子组件
        return React.Children.map(props.children, child => {
            return child
        })
    }

}

export default Input