import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
import Input from '../components/input/input';
import RadioGroup from '../components/radio/radio';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Listview from '../components/listview/listview';
import Switch from 'antd-mobile/lib/switch';
import 'antd-mobile/lib/switch/style/css';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            text2: "",
            switchChecked: true,
            selectedRadio: 1
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Listitem" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[0, 0, 0, 0]}>
                        <Listview text={"时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30 16:45:30"}</label>
                        </Listview>
                        <Listview text={"出发时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30 "}</label>
                            <div className="pt-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <Listview text={"会议结束时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30 16:30 "}</label>
                            <div className="pt-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <Listview text={"起止时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30"}</label>
                            <div className="pt-2"><Icon type="arrow-right" size={'lg'}/></div>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-31"}</label>
                        </Listview>
                        <Listview text={"城市区间"}>
                            <label onClick={this.onClick.bind(this)}>{"济南市"}</label>
                            <div className="pt-2"><Icon type="arrow-right" size={'lg'}/></div>
                            <label onClick={this.onClick.bind(this)}>{"阿根廷布宜诺斯艾利斯"}</label>
                        </Listview>
                        <Listview text={"审批人"}>
                            <label onClick={this.onClick.bind(this)}>{"浪潮国际平台与技术部 陈经理"}</label>
                            <div className="pt-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <Listview text={"这是十分长的label"}>
                            <label onClick={this.onClick.bind(this)}>{"浪潮国际平台与技术部 陈经理"}</label>
                            <div className="pt-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>

                        {/* 只有一个child且该child不为label时，需要添加一个空的div进行占位以实现右对齐，否则会呈现左对齐。处理方法待改进 */}
                        <Listview text={"索要发票"}>
                            <div></div>
                            <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)}/>
                        </Listview>
                        <Listview text={"删除购买历史"}>
                            <div></div>
                            <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)} color={"red"}/>
                        </Listview>
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
                    </Content>
                </Container>
            </div>
        );
    }

    radioChange(selected) {
        this.setState({
        selectedRadio: selected
        });
    }

    onSwitchChange() {
        let newSelection = !this.state.switchChecked;
        this.setState({
            switchChecked: newSelection
        });
    }

    onClick() {
        console.log("clicked...");
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }
}

export default Details;
