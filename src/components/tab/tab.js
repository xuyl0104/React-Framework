import React, { Component } from 'react';
import './tab.css';
import '../../CSS/style.css'; //可以引入CSS文件夹下的字体文件，替代图片图标，节省网络资源
import Row from '../row/row';

class Tab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tabs = this.props.tabs;
        let selectedTab = this.props.selected;
        let numOfTabs = tabs.length;
        let tabDivs;
        let className;

        let indicatorStyle = this.props.indicatorStyle || {color: '#318ccf', style: 'solid', width: '2px'};

        let activeStyle = this.props.activeStyle || {color: '#318ccf', backgroundColor: '#ffffff'};
        let activeIndicatorStyle = {
            borderBottomColor: indicatorStyle.color || "#318ccf",
            borderBottomStyle: indicatorStyle.style || "solid",
            borderBottomWidth: indicatorStyle.width || "2px"
        };

        let allActiveStyle = {
            ...activeStyle,
            ...activeIndicatorStyle
        };
        let inactiveStyle = this.props.inactiveStyle || {color: '#000000', backgroundColor: '#ffffff'};

        switch (numOfTabs) {
            case 2:
                className = "twoCols"
                break;
            case 3:
                className = "threeCols"
                break;
            case 4:
                className = "fourCols"
                break;
            case 5: // 三思啊
                className = "fiveCols"
                break;
            default:
                break;
        }
        tabDivs = tabs.map((item, index) => {
            return (
                <div className={className} 
                    style={selectedTab===index?allActiveStyle:inactiveStyle}
                    key={index} onClick={this.onTabChange.bind(this, index)}>{item}
                </div>
            );
        });
        return (
            <div className="nav-tabs">
                {tabDivs}
            </div>
        );
    }

    /**
     * TODO: Tab下方的横线移动动画还未实现
     * @param {*} tabIndex 
     */
    onTabChange(tabIndex) {
        // let currentTab = this.state.selectedTab;
        // let newTab = tabIndex;
        // let tabAnimatationClass;
        // if(newTab > currentTab) {
        //     tabAnimatationClass = "no" + this.state.numOfTabs + "right" + (newTab - currentTab);
        // } else {
        //     tabAnimatationClass = "no" + this.state.numOfTabs + "left" + (newTab - currentTab);
        // }

        // console.log(currentTab + "--->" + tabIndex);
        // console.log(tabAnimatationClass);
        
        let selectedTab = tabIndex;
        // this.setState({
        //     selectedTab: tabIndex,
        //     // tabAnimatationClass: tabAnimatationClass
        // });
        this.props.callBack(selectedTab); 
    }
}
  
export default Tab