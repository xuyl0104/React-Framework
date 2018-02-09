import React, {Component} from 'react';
import './input.css';
// import Icon from 'antd/lib/icon';
import Icon from 'antd-mobile/lib/icon';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showClear: false
        };
    }
    render() {
        let label = this.props.label;
        let text = this.props.text;
        let placeholder = this.props.placeholder || "";
        let align = this.props.align || "left";
        let image = this.props.img;
        let clear = this.props.clear;
        return (
            <div className="form-group-input d-flex" 
                onClick={this.props.onClick}>
                    <label className={"col-4 col-lg-3"}><nobr>{label}</nobr></label>
                    <div className={"col-8 col-lg-9 d-flex justify-content-between pr-0"}>
                        <input type="text" value={text} onChange={this.onTextChange.bind(this)} placeholder={placeholder}
                            onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)}
                            style={{textAlign: `${align}`, border: 'none', width: '100%', fontSize: '17px'}}/>
                        <div className="pt-1 mt-2 ml-2" 
                            style={{display: (clear===true && text !== '' && this.state.showClear) ? '' : 'none'}} 
                            onClick={this.clear.bind(this)}>
                            <Icon type="cross-circle-o" size="xs" color={"#aaa"}/>
                        </div>
                        <div className="pt-2 ml-2">{image}</div>
                    </div>
                    
            </div>
        );
    }

    focus() {
        setTimeout(
            () => this.setState({
                showClear: true
            }), 100);
    }

    blur() {
        setTimeout(
            () => this.setState({
                showClear: false
            }), 500);
    }

    clear(e) {
        this.props.onChange(e = {
            target: {
                value: ""
            }
        });
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