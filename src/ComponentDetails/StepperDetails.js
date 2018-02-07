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
            
        };
    }

    componentDidMount() {}

    render() {
        let headerImageSrc = "../images/arrowback-large.png";
        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Stepper" 
                        headerImageSrc={headerImageSrc}
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <div className="bg-white">
                            <label>纵向审批流程</label>
                            <Stepper 
                                titles={['徐云龙', '陈经理', '孙总', '郑总']} 
                                descriptions={['发起人', '直接上级', '分管经理', '部门经理']} 
                                current={3}
                                direction="vertical">
                            </Stepper>
                            <label>Example-2</label>
                            <label>横向审批流程</label>
                            <Stepper 
                                titles={['徐云龙', '陈经理', '孙总']} 
                                descriptions={['发起人', '直接上级', '分管经理']} 
                                current={2}
                                direction="horizontal">
                            </Stepper>

                        </div>
                    </Content>
                </Container>
            </div>
        );
    }

    

    onLeftArrowClick() {
		this.props.history.goBack();
    }

}

export default Details;
