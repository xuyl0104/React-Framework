import React, {Component} from 'react';
import './card.css';

class Card extends Component {
    render() {
        // let avatarPosition = this.props.avatarPosition || "start";
        // let avatarSize = this.props.avatarSize || 40;
        let title = this.props.title;
        let text = this.props.text;
        let topRight = this.props.topRight;
        let bottomRight = this.props.bottomRight;

        let middleLeft = this.props.middleLeft;
        let middleRight = this.props.middleRight;

        let position = this.props.position || "top";

        let width = this.props.width || "100%";

        let padding = this.props.padding || '8px 8px';
        let margin = this.props.margin || '0';

        if(position === "bottom") {
            return (
                <div className="card" style={{'padding': padding, 'margin': margin, borderRadius: '0', width: width}} onClick={this.props.onClick}>
                    {this.renderChildren(this.props)}
                    <div className="media">
                        {this.props.avatar}
                        <div className="media-body">
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-start`}>
                                    {title}
                                </div>
                                <div className={`pt-1 align-self-start`}>
                                    {topRight}
                                </div>
                            </div>
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-start`}>
                                    {middleLeft}
                                </div>
                                <div className={`pt-1 align-self-start`}>
                                    {middleRight}
                                </div>
                            </div>
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-end`}>
                                    {text}
                                </div>
                                <div className={`pt-1 align-self-end`}>
                                    {bottomRight}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card" style={{'padding': '8px 8px', borderRadius: '0'}} onClick={this.props.onClick}>
                    <div className="media">
                        {this.props.avatar}
                        <div className="media-body">
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-start`}>
                                    {title}
                                </div>
                                <div className={`pt-1 align-self-start`}>
                                    {topRight}
                                </div>
                            </div>
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-start`}>
                                    {middleLeft}
                                </div>
                                <div className={`pt-1 align-self-start`}>
                                    {middleRight}
                                </div>
                            </div>
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-end`}>
                                    {text}
                                </div>
                                <div className={`pt-1 align-self-end`}>
                                    {bottomRight}
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.renderChildren(this.props)}
                </div>
            );
        }
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