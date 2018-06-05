import React, {Component} from 'react';
// import './style/PullToRefresh.css';
import './style/css';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import 'antd-mobile/lib/pull-to-refresh/style/css';

class PullRefresh extends Component {
    
    render() {
        let distanceToRefresh = this.props.distanceToRefresh || 80;
        let indicator = this.props.indicator;
        let refreshing = this.props.refreshing;
        let onRefresh = this.props.onRefresh;
        let style = this.props.style;
        let className = this.props.className;
        return (
                <PullToRefresh 
                    style={style}
                    distanceToRefresh={distanceToRefresh}
                    indicator={indicator}
                    refreshing={refreshing} 
                    onRefresh={onRefresh}
                    className={className}
                >
                    {this.renderChildren(this.props)}        
                </PullToRefresh>
        );
    }

    renderChildren(props) {
        //遍历所有子组件
        return React.Children.map(props.children, child => {
            return child
        })
    }

}
export default PullRefresh