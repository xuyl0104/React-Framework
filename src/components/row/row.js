import React, {Component} from 'react';
import './row.css';

class Row extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div className="row" style={{'margin': '0 0'}}>
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