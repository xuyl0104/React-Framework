import React, {Component} from 'react';
import './radio.css';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';
import Radio from 'antd-mobile/lib/radio';
import 'antd-mobile/lib/radio/style/css';

/**
 * RadioGroup
 * options：选项名称
 * id：选项id
 * name：RadioGroup中的radio具有相同的name
 */
class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = this.props;
    }
    render() {
        let values = this.props.val;
        let options = this.props.option;
        let id = this.props.id;
        let name = this.props.name;
        let mode = this.props.mode;
        let size = this.props.size;
        let selected = this.props.selected;
        let radioDivs;
        if(mode === "divide") {
            radioDivs = options.map((option, index) => {
                return (
                    <div className={`divide ${size} ${selected === values[index] ? 'active' : ''}`}
                        key={index} onClick={this.onRadioClick.bind(this, values[index])}>
                        {options[index]}
                    </div>
                );
            });
        } else if(mode === "vertical") {
            radioDivs = options.map((option, index) => {
                return (
                    <div className="checkgroup" style={{'margin': '8px 0'}} key={index}>
                        <input
                            type='radio' name={name} id={id[index]} 
                            checked={selected === values[index]}
                            value={values[index]}
                            onChange={this.onRadioClick.bind(this, values[index])}/>
                        <label htmlFor={id[index]} className={`${size}`}>
                            {options[index]}
                        </label>
                    </div>
                );
            });
        } else if(mode === "slideup") {
            // todo
            // 目前存在问题，初步打算使用Antd-mobile的picker，做出slideup的效果，但该插件改写有问题
        } else if(mode === "line") {
            let radios;
            radios = options.map((option, index) => {
                return (
                        <Radio.RadioItem key={index} checked={selected === values[index]} onChange={this.onRadioClick.bind(this, values[index])}>
                            {option}
                        </Radio.RadioItem>
                );
            });
            radioDivs = (
                <List>
                    {radios}
                </List>
            );
        }
        
        return (
            <div>
                {radioDivs}
            </div>
        );
    }

    onRadioClick(selected) {
        this.props.onChange(selected);
    }
}

export default RadioGroup