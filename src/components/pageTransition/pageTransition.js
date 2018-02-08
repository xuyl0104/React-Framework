import React, {Component} from 'react';
import './pageTransition.css';

class PageTransition extends Component {
    render() {
        let transitionClass = this.props.transitionClass;
        let direction = this.props.direction;
        return (
            <div className={"transition-item " + transitionClass + direction}>
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

export default PageTransition