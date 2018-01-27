import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Container from '../components/container/container';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
import container from '../components/container/container';
import Input from '../components/input/input';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            text: "",
            text2: ""
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onTextChange2 = this.onTextChange2.bind(this);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="transition-item detail-page">
                <Header name="Input" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                {/* <Container padding={[8, 8, 8, 8]}> */}
                    <div className="content">
                        <Input label={"姓名"} text={this.state.text} onChange={this.onTextChange} placeholder={"姓名"} align={"left"} />
                        <Input label={"上级审批人"} text={this.state.text} onChange={this.onTextChange} placeholder={"上级审批人姓名"} align={"left"} />
                        <Input label={"审批意见"} text={this.state.text} onChange={this.onTextChange} placeholder={"审批意见"} align={"left"} 
                            img={<Icon type="calendar" />}/>
                        <Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入金额"} align={"right"} />
                        <Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入金额"} align={"right"} 
                            img={<img src={require("../images/arrowright-large.png")} alt="" style={{width: `20px`, verticalAlign: 'sub'}}/>}/>
                        <Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入金额"} align={"right"} 
                            img={<Icon type="pay-circle" />}/>
                    </div>
                {/* </Container> */}
            </div>
        );
    }

    goToSeeDetails() {
        console.log("Go to see details...");
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    onTextChange(e) {
        let newValue = e.target.value;
        this.setState({
            text: newValue
        });
    }
    onTextChange2(e) {
        let newValue = e.target.value;
        this.setState({
            text2: newValue
        });
    }
}

export default Details;
