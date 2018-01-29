import React, { Component } from 'react';
import './header.css';
import Row from '../row/row';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        // <header className="header text-center">
        //     <img id="quitOut" src={require("../../images/arrowback-large.png")} alt="" className="pull-left arrowback"
        //     onClick={this.props.onLeftArrowClick}></img>
        //     <span className="header-brand header-title-center">{this.props.name}</span>

        //     {this.renderChildren(this.props)}
        // </header>
        <div className="w-100">
          <Row>
            <div className="col-2 no-gutter header pl-0">
              <img id="quitOut" src={require("../../images/arrowback-large.png")} alt="" className="pull-left arrowback"
                onClick={this.props.onLeftArrowClick}></img>
            </div>
            <div className="col-8 no-gutter header pl-0">
              <span className="header header-brand">{this.props.name}</span>
            </div>
            <div className="col-2 no-gutter header pl-0">
              <div className="float-right buttonright">{this.renderChildren(this.props)}</div>
            </div>

          </Row>
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
  
  export default Header