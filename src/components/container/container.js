import React, {Component} from 'react';
import './container.css';

class Container extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let padding = this.props.padding;
        let paddingTop, paddingRight, paddingBottom, paddingLeft;
        [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
        let tb = this.props.tb;
        let top, bottom;
        [top, bottom] = tb;
        return (
            <div>
                <div className={`position-absolute w-100 webkitscroll pt-${paddingTop} pb-${paddingBottom} pl-${paddingLeft} pr-${paddingRight}`} 
                    style={{
                        'top': `${top}px`,
                        'bottom': `${bottom}px`,
                        'overflowY': 'scroll'
                        }}>
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
export default Container