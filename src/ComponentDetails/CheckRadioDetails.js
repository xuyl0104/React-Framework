import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import request from '../Utils/fetchUtil';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Container from '../components/container/container';
import Button from '../components/button/button';
import RadioGroup from '../components/radio/radio';
import CheckGroup from '../components/checkbox/checkbox';
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
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/css';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import 'antd-mobile/lib/pull-to-refresh/style/css';
import checkbox from '../components/checkbox/checkbox';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            selectedRadio: 1,
            selectedCheckbox: [0, 0, 0, 0]
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="transition-item detail-page">
                <Header name="Refresh" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                <div className="content">
                    {/* <Container padding={[8, 8, 8, 8]}> */}
                        <div style={{margin: '5px'}}></div>
                        <label>large</label>
                        <RadioGroup name="payment" mode="horizontal"
                            size="lg"
                            option={['签单', '工卡', '微信']} 
                            val={[0, 1, 2]} 
                            id={['op1', 'op2', 'op3']}
                            selected={this.state.selectedRadio}
                            onChange={this.radioChange.bind(this)}>
                        </RadioGroup>
                        
                        <div style={{margin: '5px'}}></div>
                        <label>Default</label>
                        <RadioGroup name="payment" mode="horizontal"
                            size=""
                            option={['签单', '工卡', '微信']} 
                            val={[0, 1, 2]} 
                            id={['op1', 'op2', 'op3']}
                            selected={this.state.selectedRadio}
                            onChange={this.radioChange.bind(this)}>
                        </RadioGroup>

                        <div style={{margin: '5px'}}></div>
                        <label>Small</label>
                        <RadioGroup name="payment" mode="horizontal"
                            size="sm"
                            option={['签单', '工卡', '微信']} 
                            val={[0, 1, 2]} 
                            id={['op1', 'op2', 'op3']}
                            selected={this.state.selectedRadio}
                            onChange={this.radioChange.bind(this)}>
                        </RadioGroup>


                        <div style={{margin: '5px'}}></div>
                        <label>large</label>
                        <RadioGroup name="payment" mode="vertical"
                            size="lg"
                            option={['签单', '工卡', '微信']} 
                            val={[0, 1, 2]} 
                            id={['op1', 'op2', 'op3']}
                            selected={this.state.selectedRadio}
                            onChange={this.radioChange.bind(this)}>
                        </RadioGroup> 

                    {/* </Container> */}

                    <label>CheckGroup</label>
                    <CheckGroup 
                        option={['待确认', '制作中', '待结算', '已完成']}
                        val={[0, 1, 2, 3]}
                        selected={this.state.selectedCheckbox}
                        onChange={this.checkChange.bind(this)}/>

                </div>
            </div>
        );
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    radioChange(selected) {
        this.setState({
        selectedRadio: selected
        });
    }

    checkChange(val) {
        console.log(val);

        // this.setState({
            
        // });
    }
}

export default Details;
