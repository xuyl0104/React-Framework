import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Listview from '../components/listview/listview';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
import DatePicker from '../components/picker/picker';
import PageTransition from '../components/pageTransition/pageTransition';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            timestring1: "",
            timestring2: "",
            timestring3: "",
            timestring4: "",
            timestring5: "",
            timestring6: "",
            time1: new Date(),
            time2: new Date(),
            time3: new Date(),
            time4: new Date(),
            time5: new Date(),
            time6: new Date(),
            isOpen1: false,
            isOpen2: false,
            isOpen3: false,
            isOpen4: false,
            isOpen5: false,
            isOpen6: false
        };
    }

    componentDidMount() {}

    render() {
        return (
            // <div className="transition-item detail-page">
            <PageTransition transitionClass={"detail-page"} direction={""}>
                <Container>
                    <Header name="Picker" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <label>日期时间DateTime</label>
                        <Listview text={"时间"} onClick={this.handleClick1.bind(this)}>
                            <label onClick={this.handleClick1.bind(this)}>{this.state.timestring1}</label>
                            <div className="pt-2"><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <div>
                            <DatePicker
                                value={this.state.time1}
                                isOpen={this.state.isOpen1}
                                onSelect={this.handleSelect1.bind(this)}
                                onCancel={this.handleCancel1.bind(this)}
                                dateFormat={['YYYY', 'MM', 'DD', 'hh', 'mm']}
                                showFormat={'YYYY-MM-DD hh:mm'}
                                theme={'android'}
                            />
                        </div>

                        <label>带时间限制的日期时间DateTime</label>
                        <Listview text={"就餐时间"} onClick={this.handleClick2.bind(this)}>
                            <label onClick={this.handleClick2.bind(this)}>{this.state.timestring2}</label>
                            <div className="pt-2"><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <div>
                            <DatePicker
                                value={this.state.time2}
                                isOpen={this.state.isOpen2}
                                onSelect={this.handleSelect2.bind(this)}
                                onCancel={this.handleCancel2.bind(this)}
                                dateFormat={['YYYY', 'MM', 'DD', 'hh', 'mm']}
                                showFormat={'YYYY-MM-DD hh:mm'}
                                theme={'android'}
                                min={this.state.time2}
                            />
                        </div>
                        
                        <label>日期Date</label>
                        <Listview text={"借款日期"} onClick={this.handleClick3.bind(this)}>
                            <label onClick={this.handleClick3.bind(this)}>{this.state.timestring3}</label>
                            <div className="pt-2"><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <div>
                            <DatePicker
                                value={this.state.time3}
                                isOpen={this.state.isOpen3}
                                onSelect={this.handleSelect3.bind(this)}
                                onCancel={this.handleCancel3.bind(this)}
                                dateFormat={['YYYY', 'MM', 'DD']}
                                showFormat={'YYYY-MM-DD'}
                                theme={'android'}
                                min={this.state.time}
                            />
                        </div>

                        <label>时间Time</label>
                        <Listview text={"就餐时间"} onClick={this.handleClick4.bind(this)}>
                            <label onClick={this.handleClick4.bind(this)}>{this.state.timestring4}</label>
                            <div className="pt-2"><Icon type="right" size={'lg'}/></div>
                        </Listview>
                        <div>
                            <DatePicker
                                value={this.state.time4}
                                isOpen={this.state.isOpen4}
                                onSelect={this.handleSelect4.bind(this)}
                                onCancel={this.handleCancel4.bind(this)}
                                dateFormat={['hh', 'mm']}
                                showFormat={'hh:mm'}
                                theme={'android'}
                                min={this.state.time}
                            />
                        </div>

                        <label>起止时间</label>
                        <Listview text={"起止时间"}>
                            <input type="text" value={this.state.timestring5} placeholder={"起始时间"}
                                onClick={this.handleClick5.bind(this)} readonly="true"/>
                            {/* <label onClick={this.handleClick5.bind(this)}>{this.state.timestring5}</label> */}
                            <div className="pt-2 ml-2 mr-2"><Icon type="arrow-right" size={'lg'}/></div>
                            {/* <label onClick={this.handleClick6.bind(this)}>{this.state.timestring6}</label> */}
                            <input type="text" value={this.state.timestring6} placeholder={"结束时间"}
                                onClick={this.handleClick6.bind(this)} readonly="true"/>
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
                    </Content>
                </Container>
            </PageTransition>
            // </div>
        );
    }

    //时间字符串处理
    getDateString(time) {
        let year = time.getFullYear();
        let month = time.getMonth() < 9 ? ("0"+(time.getMonth()+1)) : (time.getMonth()+1); //0-11，0代表1月，坑...
        let day = time.getDate() < 10 ? ("0"+time.getDate()) : time.getDate();
        let hour = time.getHours() < 10 ? ("0"+time.getHours()) : time.getHours();
        let minute = time.getMinutes() < 10 ? ("0"+time.getMinutes()) : time.getMinutes();
        // let second = time.getSeconds();
        let dateString = year + "-" + month + "-" +day;
        // let dateString = year + "-" + month + "-" +day + " " + hour + ":" + minute;
        return (dateString);
    }
    
     /**
     * 时间选择器相关函数
     */
    handleClick1() {
        this.setState({ isOpen1: true });
    }
    handleClick2() {
        this.setState({ isOpen2: true });
    }
    handleClick3() {
        this.setState({ isOpen3: true });
    }
    handleClick4() {
        this.setState({ isOpen4: true });
    }
    handleClick5() {
        this.setState({ isOpen5: true });
    }
    handleClick6() {
        this.setState({ isOpen6: true });
    }

    handleCancel1() {
        this.setState({ isOpen1: false });
    }
    handleCancel2() {
        this.setState({ isOpen2: false });
    }
    handleCancel3() {
        this.setState({ isOpen3: false });
    }
    handleCancel4() {
        this.setState({ isOpen4: false });
    }
    handleCancel5() {
        this.setState({ isOpen5: false });
    }
    handleCancel6() {
        this.setState({ isOpen6: false });
    }

    handleSelect1(time) {
        this.setState({
            time1: time,
            timestring1: this.getDateString(time), 
            isOpen1: false 
        });
    }
    handleSelect2(time) {
        this.setState({
            time2: time,
            timestring2: this.getDateString(time), 
            isOpen2: false 
        });
    }
    handleSelect3(time) {
        this.setState({
            time3: time,
            timestring3: this.getDateString(time), 
            isOpen3: false 
        });
    }
    handleSelect4(time) {
        this.setState({
            time4: time,
            timestring4: this.getDateString(time), 
            isOpen4: false 
        });
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

    goToSeeDetails() {
        console.log("Go to see details...");
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    
}

export default Details;
