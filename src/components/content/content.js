import React, {Component} from 'react';
import './content.css';

class Content extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let backgroundColor = this.props.bgColor || '#f8f9fa';
        let padding = this.props.padding || [0, 0, 0, 0];
        let paddingTop, paddingRight, paddingBottom, paddingLeft;
        [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
        return (
                <div className={`w-100 webkitscroll pt-${paddingTop} pb-${paddingBottom} pl-${paddingLeft} pr-${paddingRight} flex1`}
                    style={{backgroundColor: backgroundColor}}>
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
export default Content