import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Container from '../components/container/container';
import Card from '../components/card/card';
import Icon from 'antd/lib/icon';
import CheckGroup from '../components/checkbox/checkbox';
import Button from '../components/button/button';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            selectedCheckbox: [0, 0, 0, 0]
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div className="transition-item detail-page">
                <Header name="PageTemplate" 
                    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                </Header>
                <Container padding={[0,0,0,0]} tb={[56, 56]}>
                    <Card key={1}
                        avatar={<img className={`align-self-start mr-3`} 
                                    src={require("../images/avatar.png")} alt="Generic placeholder image" 
                                    style={{'width': `40px`}}/>}
                        avatarSize={40}
                        avatarPosition={'start'}
                        title={"年夜饭"}
                        text={"蒜烧海鳗鱼"}
                        onClick={this.goCardDetails.bind(this)}
                    >
                        <p>
                            每到年终岁尾的新年晚宴，中国人总得有点讲究的内容，比如说一定要有鱼，
                            就是要年年有余。今天给大伙儿准备的就是一道不光有余，
                            还天长地久的私房菜，蒜烧海鳗鱼。
                        </p>
                        
                        <div style={{'display': 'inline-table'}}>
                            <img src={require("../images/timg.jpg")} alt="" style={{'width': '200px'}}/>
                        </div>
                        <div style={{'display': 'inline-flex', 'margin': '10px 10px 5px 10px'}}>
                            <div className="col-3 text-center" onClick={this.thumbsUp.bind(this)}>
                                <Icon type="heart-o" style={{ fontSize: 26, color: '#318ccf'}}/>
                            </div>
                            <div className="col-3 text-center" onClick={this.shareToWeibo.bind(this)}>
                                <Icon type="weibo-circle" style={{ fontSize: 26, color: '#318ccf' }}/>
                            </div>
                            <div className="col-3 text-center" onClick={this.shareToWeChat.bind(this)}>
                                <Icon type="wechat" style={{ fontSize: 26, color: '#318ccf' }}/>
                            </div>
                            <div className="col-3 text-center" onClick={this.editForm.bind(this)}>
                                <Icon type="form" style={{ fontSize: 26, color: '#318ccf' }}/>
                            </div>
                        </div>
                    </Card>
                    <label className="text-dark text-uppercase font-weight-bold">uppercase-bold-dark</label>
                    <p className="bg-light p-2 text-justify"><span className="text-uppercase">Text-justify: </span> 
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing
                         Lorem Ipsum passages, and more recently with desktop publishing 
                         software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    <div className="p-2">
                        <Button style="default" size="lg" text={"取消"} col={6} onClick={this.buttonClick.bind(this)} />
                        <Button style="inspur" size="lg" text={"评论"} col={6} onClick={this.buttonClick.bind(this)} />
                    </div>

                    <CheckGroup 
                        option={['待确认', '制作中', '待结算', '已完成']}
                        val={[0, 1, 2, 3]}
                        selected={this.state.selectedCheckbox}
                        onChange={this.checkChange.bind(this)}/>

                    <div className="p-2">
                        <Button style="inspur" size="lg" text={"提交"} col={12} onClick={this.buttonClick.bind(this)} />
                    </div>

                    <label className="text-success text-lowercase font-italic">lowercase-italic-success</label>
                    <p className="bg-info text-white p-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing
                         Lorem Ipsum passages, and more recently with desktop publishing 
                         software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    
                    
                </Container>
                <Footer
                    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                            {'color': 'white', 'backgroundColor': '#318ccf'}]}
                    buttonName={["拒单", "接单"]}
                    callBackFooterButtonClick={[
                        this.callBackFooter0, 
                        this.callBackFooter1
                        ]}>
                </Footer>
            </div>
        );
    }

    goCardDetails() {
        console.log("Go to see details...");
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    editForm(e) {
		e.stopPropagation(); //重要！
		console.log("编辑！");
	}
	thumbsUp(e) {
		e.stopPropagation(); //重要！
		console.log("点赞！");
	}
	shareToWeibo(e) {
		e.stopPropagation(); //重要！
		console.log("分享至微博。");
	}
	shareToWeChat(e) {
		e.stopPropagation(); //重要！
		console.log("分享至微信。");
	}

    callBackFooter0() {
        console.log("Footer 0 is clicked...");
    }

    callBackFooter1() {
        console.log("Footer 1 is clicked...");    
    }

    checkChange(val) {
        console.log(val);

        // this.setState({
            
        // });
    }
    buttonClick() {
        console.log("Button is clicked...");
    }
    
}

export default Details;
