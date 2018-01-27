import React, {Component} from 'react';
import './card.css';

class Card extends Component {
    render() {
        let avatarPosition = this.props.avatarPosition || "start";
        let avatarSize = this.props.avatarSize || 40;
        let title = this.props.title;
        let text = this.props.text;
        return (
            <div className="card" style={{'margin': '3px 0', 'padding': '8px 8px'}} onClick={this.props.onClick}>
                <div className="media">
                    {this.props.avatar}
                    <div className="media-body">
                        <h5 className="mt-0">{title}</h5>
                        {text}
                    </div>
                </div>
                {this.renderChildren(this.props)}
            </div>
        );
    }

    renderChildren(props) {
        // console.log(props.children);
        //遍历所有子组件
        return React.Children.map(props.children, child => {
            return child
        })
    }

}
export default Card