import React, {Component} from 'react';
import './container.css';

class Container extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="w-100 d-flex flex-column" style={{height: '100vh'}}>
                {this.renderChildren(this.props)}
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
export default Container