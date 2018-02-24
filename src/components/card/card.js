import React, {Component} from 'react';
import './card.css';

class Card extends Component {
    render() {
        let avatarPosition = this.props.avatarPosition || "start";
        // let avatarSize = this.props.avatarSize || 40;
        let title = this.props.title;
        let text = this.props.text;
        let topRight = this.props.topRight;
        let bottomRight = this.props.bottomRight;

        let middleLeft = this.props.middleLeft;
        let middleRight = this.props.middleRight;

        let position = this.props.position || "top";

        // let TLClass = topRight ? "col-8" : "col-12";
        // let TRClass = topRight ? "col-4" : "";
        // let BLClass = bottomRight ? "col-10" : "";
        // let BRClass = bottomRight ? "col-2" : "";

        if(position === "bottom") {
            return (
                <div className="card" style={{'padding': '8px 8px', borderRadius: '0'}} onClick={this.props.onClick}>
                    {this.renderChildren(this.props)}
                    <div className="media">
                        {this.props.avatar}
                        <div className="media-body">
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-start`}>
                                    {title}
                                </div>
                                <div className={`pt-1 align-self-start`}>
                                    <div>{topRight}</div>
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
                                    <div>{topRight}</div>
                                </div>
                            </div>
                            <div className="d-flex ml-1 justify-content-between">
                                <div className={`pt-1 align-self-start`}>
                                    {middleLeft}
                                </div>
                                <div className={`pt-1 align-self-start`}>
                                    <div>{middleRight}</div>
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