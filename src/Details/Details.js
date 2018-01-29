import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import './Details.css';
import request from '../Utils/fetchUtil';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Content from '../components/content/content';
import Button from '../components/button/button';
import RadioGroup from '../components/radio/radio';
import Modals from '../components/modal/modal'; 
import Card from '../components/card/card'; 
import CardList from '../components/cardlist/cardlist';
import Listview from '../components/listview/listview';
import Toast from '../components/third-party/toast';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
import Stepper from '../components/stepper/stepper';
import _ from 'lodash';

class Details extends Component {
	constructor() {
		super();
		this.state = {
            spName: "",
            selectedRadio: 1,
		};
	}

    shouldComponentUpdate(nextProps, nextState) {
		if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
		return true
		} else {
		return false
		}
	}

	componentDidMount() {
	}

	render() {
        console.log(this.props.history);

        let headerImageSrc = "../images/arrowback-large.png";
		return (
            <div className="transition-item edit-page">
                <Header name="编辑表单" 
                    headerImageSrc={headerImageSrc}
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                
                <div className = "content">
                    <Content padding={[8, 0, 8, 0]}>
                        <Listview text={"审批人"} style={{'backgroundColor': '#ffffff', 'fontSize': '16px', 'padding': '8px'}}>
                            <input value={this.state.spName} style={{'width': '200px'}} onChange={this.changeInput.bind(this)} placeholder={"请输入审批人姓名"}/>
                        </Listview>
                        <Listview text={"上级主管"} style={{'backgroundColor': '#ffffff', 'fontSize': '16px', 'padding': '8px'}}>
                            <input value={this.state.spName} style={{'width': '200px'}} onChange={this.changeInput.bind(this)} placeholder={"请输入上级主管"}/>
                            <img src={require("../images/arrowright-large.png")} style={{}} alt=""/>
                        </Listview>
                        <Listview text={"作品展示"} style={{'backgroundColor': '#ffffff', 'fontSize': '16px', 'padding': '8px'}}>
                            <img src={require("../images/dish.jpg")} style={{'width': '220px', 'height': '120px'}} alt=""/>
                        </Listview>
                        <Listview text={"审批意见"} style={{'backgroundColor': '#ffffff', 'fontSize': '16px', 'padding': '8px'}}>
                            <textarea rows={6} style={{'width': '220px'}}/>
                        </Listview>
                        <Listview text={"审批意见"} style={{'backgroundColor': '#ffffff', 'fontSize': '16px', 'padding': '8px'}}>
                            <textarea rows={6} style={{'width': '220px'}}/>
                        </Listview>
                    </Content>
                    <Content padding={[8, 0, 8, 0]}>
                        <div className="col-12">
                            <Stepper titles={['徐云龙', '陈经理', '孙总', '郑总']} descriptions={['发起人', '直接上级', '分管经理', '部门经理']} current={3}>
                            </Stepper>
                        </div>
                    </Content>
                </div>

                <Footer
                    style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["保存"]}
                    callBackFooterButtonClick={[this.callBackFooter0]}>
                </Footer>
            </div>
		);
    }
    changeRadio(selected) {
        this.setState({
        selectedRadio: selected
        });
    }
    changeInput(e) {
        this.setState({spName: e.target.value})
    }

	goCardDetails() {
		console.log("Going to details page...");
	}

    callBackFooter0() {
        console.log("Saving...");
    }
  
	onLeftArrowClick() {
		// console.log("Quit button is clicked...");
		this.props.history.goBack();
		// this.componentDidMount(); //临时测试刷新
	}

	

}

export default Details;
