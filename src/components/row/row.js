import React, {Component} from 'react';
import './row.css';

class Row extends Component {
    
    render() {
        let padding = this.props.padding || "0";
        return (
            <div>
                <div className="row" style={{'margin': '0', padding: padding}}>
                    {this.renderChildren(this.props)}
                </div>
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
export default Row