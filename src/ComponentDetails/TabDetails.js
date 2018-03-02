import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Button from '../components/button/button';
import Icon from 'antd-mobile/lib/icon';
import Tab from '../components/tab/tab';
import 'antd-mobile/lib/icon/style/css';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            key: 2,
            selected: 0
        };
    }


    render() {
        let tabDiv;
        if(this.state.key === 2) {
            tabDiv = 
                <Tab tabs={['本日', '本周']} 
                    selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
            ;
        } else if(this.state.key === 3) {
            tabDiv = 
                <Tab tabs={['本日', '本周', '本月']} selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
            ;
        } else if(this.state.key === 4) {
            tabDiv = 
                <Tab tabs={['本日', '本周', '本月', '本年']} selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
            ;
        } else if(this.state.key === 5){
            tabDiv = 
                <Tab tabs={['本日', '本周', '本月', '本年', '所有']} selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
            ;
        } else if(this.state.key === 6) {
            tabDiv = 
                <Tab tabs={['本日', '本周', '本月']} 
                    activeStyle={{color: 'red', backgroundColor: '#ffffff', fontWeight: 'bold'}}
                    inactiveStyle={{color: 'green', backgroundColor: '#ffffff'}}
                    indicatorStyle={{width: '2px', color: '#318ccf', style: 'dashed'}}
                    selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
            ;
        }


        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Tab" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    {/* Tab */}
                    {tabDiv}
                    <Content>
                        <div className="mt-3"></div>
                        <Row>
                            <Button style={"primary"} size="sm" text="2个tab" col={6} onClick={this.onButtonClick.bind(this, 2)}/>
                            <Button style={"primary"} size="sm" text="3个tab" col={6} onClick={this.onButtonClick.bind(this, 3)}/>
                            <Button style={"primary"} size="sm" text="4个tab" col={6} onClick={this.onButtonClick.bind(this, 4)}/>
                            <Button style={"primary"} size="sm" text="5个tab" col={6} onClick={this.onButtonClick.bind(this, 5)}/>
                            <Button style={"warning"} size="sm" text="tab样式" col={12} onClick={this.onButtonClick.bind(this, 6)}/>
                        </Row> 
                        <div style={{height: '2000px'}}></div> 
                    </Content>
                </Container>
            </div>
        );
    }

    changeTab(index) {
        console.log("Tab clicked..." + index);
        this.setState({
            selected: index
        });
        // 此处添加点击不同Tab触发不同功能的代码
        // ......
    }

    onButtonClick(key) {
        this.setState({
            key: key
        });
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }
    
}

export default Details;
