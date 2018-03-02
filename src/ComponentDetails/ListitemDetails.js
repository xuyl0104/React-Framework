import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import RadioGroup from '../components/radio/radio';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Listview from '../components/listview/listview';
import Switch from '../components/switch/switch';
import DatePicker from '../components/picker/picker';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            text2: "",
            switchChecked: true,
            selectedRadio: 1,
            timestring5: "",
            timestring6: "",
            time5: new Date(),
            time6: new Date(),
            isOpen5: false,
            isOpen6: false
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
                    <Content padding={[0, 0, 0, 0]} bgColor={'#e8e8e8'}>
                        <Listview text={"时间"}>
                            <input type="text" value={"2018-01-30 16:45:30"} placeholder={"请输入时间"}
                                onClick={this.onClick.bind(this)} readOnly="true" style={{width: '100%'}}/>
                        </Listview>

                        <Listview text={"时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30 16:45:30"}</label>
                            <div className="ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>

                        {/* 空div占位实现第二个child右对齐 */}
                        <Listview text={"所在单位"}>
                            <label onClick={this.onClick.bind(this)}>{"浪潮国际平台与技术部"}</label>
                            <div className="ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>

                        <Listview text={"出发时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30"}</label>
                            <div className="ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>

                        <Listview text={"会议结束时间"}>
                            <label onClick={this.onClick.bind(this)}>{"2018-01-30 16:30"}</label>
                            <div className="ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        
                        <Listview text={"起止时间"}>
                            <input type="text" value={this.state.timestring5} placeholder={"起始时间"}
                                onClick={this.handleClick5.bind(this)} readOnly="true"/>
                            <div className="ml-2 mr-2"><Icon type="arrow-right" size={'lg'}/></div>
                            <input type="text" value={this.state.timestring6} placeholder={"结束时间"} className="text-right"
                                onClick={this.handleClick6.bind(this)} readOnly="true"/>
                        </Listview>
                        <div>
                            <DatePicker
                                value={this.state.time5}
                                isOpen={this.state.isOpen5}
                                onSelect={this.handleSelect5.bind(this)}
                                onCancel={this.handleCancel5.bind(this)}
                                dateFormat={['hh', 'mm']}
                                showFormat={'hh:mm'}
                                theme={'android'}
                                min={this.state.time}
                            />
                        </div>
                        <div>
                            <DatePicker
                                value={this.state.time6}
                                isOpen={this.state.isOpen6}
                                onSelect={this.handleSelect6.bind(this)}
                                onCancel={this.handleCancel6.bind(this)}
                                dateFormat={['hh', 'mm']}
                                showFormat={'hh:mm'}
                                theme={'android'}
                                min={this.state.time}
                            />
                        </div>

                        <Listview text={"城市区间"}>
                            <input type="text" value={"济南市"} placeholder={"始发城市"}
                                onClick={this.onClick.bind(this)} readOnly="true"/>
                            {/* <div className="ml-2 mr-2"><Icon type="arrow-right" size={'lg'}/></div> */}
                            <img className="mt-3" src={require("../images/arrowdotted.png")} alt="" style={{width: "20px", height: "10px"}}/>
                            <input type="text" value={"布宜诺斯艾利斯"} placeholder={"到达城市"} className="text-right"
                                onClick={this.onClick.bind(this)} readOnly="true"/>
                        </Listview>

                        <Listview text={"审批人"}>
                            <label onClick={this.onClick.bind(this)}>{"浪潮国际平台与技术部 陈经理"}</label>
                            <div className="ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>

                        <Listview text={"这是十分长的label"}>
                            <label onClick={this.onClick.bind(this)}>{"浪潮国际平台与技术部 陈经理"}</label>
                            <div className="ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
                        </Listview>

                        {/* 只有一个child时，需要添加一个空的div进行占位以实现右对齐，否则会呈现左对齐。处理方法待改进 */}
                        <Listview text={"索要发票"}>
                            <div></div>
                            <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)}/>
                        </Listview>
                        <Listview text={"索要发票"}>
                            <div></div>
                            <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)} disabled/>
                        </Listview>

                        <Listview text={"删除购买历史"}>
                            <div></div>
                            <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)} color={"#318ccf"}/>
                        </Listview>

                        <Listview text={"支付方式"}>
                            <div></div>
                            <RadioGroup name="payment" mode="divide"
                                size="sm"
                                option={['签单', '工卡', '微信']} 
                                val={[0, 1, 2]} 
                                id={['op1', 'op2', 'op3']}
                                selected={this.state.selectedRadio}
                                onChange={this.radioChange.bind(this)}>
                            </RadioGroup>
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

    //时间字符串处理
    getDateString(time) {
        let year = time.getFullYear();
        let month = time.getMonth() < 9 ? ("0"+(time.getMonth()+1)) : (time.getMonth()+1); //0-11，0代表1月，坑...
        let day = time.getDate() < 10 ? ("0"+time.getDate()) : time.getDate();
        // let hour = time.getHours() < 10 ? ("0"+time.getHours()) : time.getHours();
        // let minute = time.getMinutes() < 10 ? ("0"+time.getMinutes()) : time.getMinutes();
        // let second = time.getSeconds();
        let dateString = year + "-" + month + "-" +day;
        // let dateString = year + "-" + month + "-" +day + " " + hour + ":" + minute;
        return (dateString);
    }
    
     /**
     * 时间选择器相关函数
     */
    handleClick5() {
        this.setState({ isOpen5: true });
    }
    handleClick6() {
        this.setState({ isOpen6: true });
    }

    handleCancel5() {
        this.setState({ isOpen5: false });
    }
    handleCancel6() {
        this.setState({ isOpen6: false });
    }
    
    handleSelect5(time) {
        this.setState({
            time5: time,
            timestring5: this.getDateString(time), 
            isOpen5: false 
        });
    }
    handleSelect6(time) {
        this.setState({
            time6: time,
            timestring6: this.getDateString(time), 
            isOpen6: false 
        });
    }
}

export default Details;
