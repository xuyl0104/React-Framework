import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import RadioGroup from '../components/radio/radio';
import CheckGroup from '../components/checkbox/checkbox';

import 'antd-mobile/lib/pull-to-refresh/style/css';
import checkbox from '../components/checkbox/checkbox';
import Listview from '../components/listview/listview';

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
                <Container>
                    <Header name="Check/Radio" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
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
                        <label>Small</label>
                        <Listview text={"支付方式"}>
                            <div></div>
                            <div className="pt-1">
                                <RadioGroup name="payment" mode="horizontal"
                                    size="sm"
                                    option={['签单', '工卡', '微信']} 
                                    val={[0, 1, 2]} 
                                    id={['op1', 'op2', 'op3']}
                                    selected={this.state.selectedRadio}
                                    onChange={this.radioChange.bind(this)}>
                                </RadioGroup>
                            </div>
                        </Listview>

                        <label>复选框</label>
                        <CheckGroup 
                            option={['待确认', '制作中', '待结算', '已完成']}
                            val={[0, 1, 2, 3]}
                            selected={this.state.selectedCheckbox}
                            onChange={this.checkChange.bind(this)}/>
                    </Content>
                </Container>
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
