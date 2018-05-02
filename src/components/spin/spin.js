import React, { Component } from 'react';
// import './style/spin.css';
// import './style/fontello.css';
// import './style/animation.css';
import './style/css';

class Spin extends Component {
    render() {
        let isSpinning = this.props.isSpinning;
        let indicator = this.props.indicator || "a";
        let className;
        switch (indicator) {
            case "a":
                className = "icon-spin4";
                break;
            case "b":
                className = "icon-spin5";
                break;
            case "c":
                className = "icon-spin6";
                break;
            default:
                className = "icon-spin4";
                break;
        }
        let indicatorSize = this.props.size || 30;
        let indicatorColor = this.props.color || "#318ccf";
        return (
            <div className="gsp-spin" style={{display: isSpinning ? 'block' : 'none'}}>
                <div className="theIcon">
                    <i className={`${className} animate-spin`} 
                        style={{fontSize: `${indicatorSize}px`, color: indicatorColor, marginLeft: `${-indicatorSize/2}px`}}>
                    </i>
                </div>
            </div>
        );
    }
}
  
export default Spin