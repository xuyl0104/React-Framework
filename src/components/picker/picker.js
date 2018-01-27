import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './picker.css';
import DatePicker from 'react-mobile-datepicker';

class Picker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let value = this.props.value;
        let isOpen = this.props.isOpen;
        let onSelect = this.props.onSelect;
        let onCancel = this.props.onCancel;
        let dateFormat = this.props.dateFormat;
        let showFormat = this.props.showFormat;
        let theme = this.props.theme;
        let min = this.props.min;
        return (
            <div>
                <DatePicker
                    value={value}
                    isOpen={isOpen}
                    onSelect={onSelect}
                    onCancel={onCancel}
                    dateFormat={dateFormat}
                    showFormat={showFormat}
                    theme={theme}
                    min={min}
                />
            </div>
        );
    }

    renderChildren(props) {
        //遍历所有子组件
        return React.Children.map(props.children, child => {
            return child
        })
    }
}

export default Picker