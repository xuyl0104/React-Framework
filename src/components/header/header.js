import React, { Component } from 'react';
import './header.css';
import './css/fontello.css'; //可以引入CSS文件夹下的字体文件，替代图片图标，节省网络资源
import Row from '../row/row';

class Header extends Component {
    
    render() {
      return (
        <div className="w-100">
          <Row>
            <div className="col-3 no-gutter header pl-0">
              {/* 使用字体文件替代图片文件 */}
              <div className="icon-left-open-big" style={{fontSize: '25px', marginTop: '5px', marginLeft: '0'}} onClick={this.props.onLeftArrowClick}></div>
            </div>
            <div className="col-6 no-gutter header pl-0">
              <span className="header header-brand">{this.props.name}</span>
            </div>
            <div className="col-3 no-gutter header pl-0">
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