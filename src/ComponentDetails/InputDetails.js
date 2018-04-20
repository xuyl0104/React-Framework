import React, {Component} from 'react';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import Input from '../components/input/input';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            info: [{"a": "", "b": "", "c": "", "d": "", "e": "", "f": ""}]
        };
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentDidMount() {}

    render() {
        console.log(this.state.info[0])
        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Input" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[0, 0, 0, 0]}>
                        <Input label={"左对齐带清空"} required={true} name={"a"} text={this.state.info[0]["a"]} onChange={this.onTextChange} placeholder={"姓名"} align={"left"} clear={true} />
                        <Input label={"上级审批人"} name={"b"} text={this.state.info[0]["b"]} onChange={this.onTextChange} placeholder={"上级审批人姓名"} align={"left"} />
                        <Input label={"左对齐带图标"} name={"c"} text={this.state.info[0]["c"]} onChange={this.onTextChange} placeholder={"审批意见"} align={"left"} 
                            img={<Icon type="calendar" />}/>
                        <Input label={"右对齐带清空"} name={"d"} text={this.state.info[0]["d"]} onChange={this.onTextChange} placeholder={"请输入金额"} align={"right"} clear={true}/>
                        <Input label={"交易金额"} name={"e"} text={this.state.info[0]["e"]} onChange={this.onTextChange} placeholder={"请输入金额"} align={"right"} 
                            img={<Icon type="right" />}/>
                        <Input label={"交易金额"} required={true} name={"f"} text={this.state.info[0]["f"]} onChange={this.onTextChange} placeholder={"请输入金额"} align={"right"} 
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
        let info = this.state.info;
        info[0][e.target.name] = e.target.value;
        this.setState({
            info: info
        });
    }
}

export default Details;
