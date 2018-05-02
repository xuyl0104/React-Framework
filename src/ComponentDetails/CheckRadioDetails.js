import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import RadioGroup from '../components/radio-group/radio-group';
import CheckGroup from '../components/check-group/check-group';
import 'antd-mobile/lib/pull-to-refresh/style/css';
import Listview from '../components/listview/listview';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            selectedRadio: 1,
            selectedCheckbox: [1, 1, 1, 0]
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
                        <label>单选按钮-mode="divide"</label>
                        <div className="bg-white pl-2 pr-2">
                            <label>large</label>
                            <RadioGroup name="payment" mode="divide"
                                size="lg"
                                option={['签单', '工卡', '微信']} 
                                val={[0, 1, 2]} 
                                id={['op1', 'op2', 'op3']}
                                selected={this.state.selectedRadio}
                                onChange={this.radioChange.bind(this)}>
                            </RadioGroup>
                            
                            <div style={{margin: '5px'}}></div>
                            <label>Default</label>
                            <RadioGroup name="payment" mode="divide"
                                size=""
                                option={['签单', '工卡', '微信']} 
                                val={[0, 1, 2]} 
                                id={['op1', 'op2', 'op3']}
                                selected={this.state.selectedRadio}
                                onChange={this.radioChange.bind(this)}>
                            </RadioGroup>

                            <div style={{margin: '5px'}}></div>
                            <label>Small</label>
                            <RadioGroup name="payment" mode="divide"
                                size="sm"
                                option={['签单', '工卡', '微信']} 
                                val={[0, 1, 2]} 
                                id={['op1', 'op2', 'op3']}
                                selected={this.state.selectedRadio}
                                onChange={this.radioChange.bind(this)}>
                            </RadioGroup>
                        </div>

                        <div style={{margin: '5px'}}></div>
                        <Listview text={"支付方式"}>
                            <div></div>
                            <div className="pt-2">
                                <RadioGroup name="payment" mode="divide"
                                    size="sm"
                                    option={['签单', '工卡', '微信']} 
                                    val={[0, 1, 2]} 
                                    id={['op1', 'op2', 'op3']}
                                    selected={this.state.selectedRadio}
                                    onChange={this.radioChange.bind(this)}>
                                </RadioGroup>
                            </div>
                        </Listview>

                        <label>单选按钮-mode="line"</label>
                        <RadioGroup name="payment" mode="line"
                            size="sm"
                            option={['签单', '工卡', '微信']} 
                            val={[0, 1, 2]} 
                            id={['op1', 'op2', 'op3']}
                            selected={this.state.selectedRadio}
                            onChange={this.radioChange.bind(this)}>
                        </RadioGroup>

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
        let selected = this.state.selectedCheckbox;
        selected.splice(val, 1, selected[val] === 1 ? 0 : 1);
        console.log(selected);
        // 此处添加对选中值的处理
        this.setState({
            selectedCheckbox: selected
        });
    }
}

export default Details;
