import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';
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
                <Container>
                    <Header name="Input" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[0, 0, 0, 0]}>
                        <Input label={"左对齐带清空"} text={this.state.text} onChange={this.onTextChange} placeholder={"姓名"} align={"left"} clear={true} />
                        <Input label={"上级审批人"} text={this.state.text} onChange={this.onTextChange} placeholder={"上级审批人姓名"} align={"left"} />
                        <Input label={"左对齐带图标"} text={this.state.text} onChange={this.onTextChange} placeholder={"审批意见"} align={"left"} 
                            img={<Icon type="calendar" />}/>
                        <Input label={"右对齐带清空"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入金额"} align={"right"} clear={true}/>
                        <Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入金额"} align={"right"} 
                            img={<Icon type="right" />}/>
                        <Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入金额"} align={"right"} 
                            img={<Icon type="pay-circle-o" />}/>
                    </Content>
                </Container>
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
        // console.log(typeof newValue);
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
