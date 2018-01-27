import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import showMessage from "../Utils/showMessage";
import showToast from '../Utils/showToast';
import message from 'antd/lib/message';
import request from '../Utils/fetchUtil';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Container from '../components/container/container';
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
import container from '../components/container/container';
import _ from 'lodash';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            key: 1
        };
    }

    componentDidMount() {}

    render() {
        let headerImageSrc = "../images/arrowback-large.png";
        let footerDiv;
        if(this.state.key === 1) {
            footerDiv = (
                <Footer
                    style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["下单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0]}>
                </Footer>
            );
        } else if(this.state.key === 2) {
            footerDiv = (
                <Footer
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["拒单", "接单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1
                        ]}>
                </Footer>
            );
        } else {
            footerDiv = (
                <Footer
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'},
                            {'color': '#318ccf', 'backgroundColor': '#ffffff'}]}
                    buttonName={["取消", "删除", "确定"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1,
                        this.callBackFooter2
                        ]}>
                </Footer>
            );
        }

        return (
            <div className="transition-item detail-page">
                <Header name="Footer" 
                    headerImageSrc={headerImageSrc}
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                {/* <Container padding={[8, 8, 8, 8]}> */}
                    <div className="content">

                        <Row>
                            <Button style="primary" size="" text="一个按钮的footer" col={12} onClick={this.onButtonClick.bind(this, 1)}/>
                            <Button style="primary" size="" text="两个按钮的footer" col={12} onClick={this.onButtonClick.bind(this, 2)}/>
                            <Button style="primary" size="" text="三个按钮的footer" col={12} onClick={this.onButtonClick.bind(this, 3)}/>
                        </Row>
                       {footerDiv}
                                                
                    </div>
                {/* </Container> */}
            </div>
        );
    }

    onButtonClick(key) {
        this.setState({
            key: key
        });
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    callBackFooter0() {
        console.log("Footer 0 is clicked...");
    }

    callBackFooter1() {
        console.log("Footer 1 is clicked...");    
    }

    callBackFooter2() {
        console.log("Footer 2 is clicked...");
    }
    
}

export default Details;
