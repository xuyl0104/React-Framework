import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Card from '../components/card/card';
import Icon from 'antd/lib/icon';

class Details extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Card" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        <div className="content">
                            <label>Example-1</label>
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
                                <div className="d-flex justify-content-around mt-2">
                                    <div className="text-center" onClick={this.thumbsUp.bind(this)}>
                                        <Icon type="heart-o" style={{ fontSize: 26, color: '#318ccf'}}/>
                                    </div>
                                    <div className="text-center" onClick={this.shareToWeibo.bind(this)}>
                                        <Icon type="weibo-circle" style={{ fontSize: 26, color: '#318ccf' }}/>
                                    </div>
                                    <div className="text-center" onClick={this.shareToWeChat.bind(this)}>
                                        <Icon type="wechat" style={{ fontSize: 26, color: '#318ccf' }}/>
                                    </div>
                                    <div className="text-center" onClick={this.editForm.bind(this)}>
                                        <Icon type="form" style={{ fontSize: 26, color: '#318ccf' }}/>
                                    </div>
                                </div>
                            </Card>

                            <label>Example-2</label>
                            <Card key={2}
                                avatar={<img className={`align-self-center mr-3`} 
                                            src={require("../images/avatar.png")} alt="Generic placeholder image" 
                                            style={{'width': `54px`}}/>}
                                avatarSize={54}
                                avatarPosition={'start'}
                                title={"张经理"}
                                text={"平台与技术部"}
                                onClick={this.goCardDetails.bind(this)}>
                                <div className="ticketInfo"><label>起止城市：</label> <label>济南 - 成都</label></div>
                                <div className="ticketInfo"><label>航班信息：</label> <label>2018-01-26 ca4527 经济舱</label></div>
                                <div className="ticketInfo"><label>出票时间：</label> <label>2018-01-22</label></div>
                            </Card>

                            <label>Example-3</label>
                            <Card key={3}
                                avatar={<img className={`align-self-center mr-3`} 
                                            src={require("../images/canteen.jpg")} alt="Generic placeholder image" 
                                            style={{'width': `120px`}}/>}
                                avatarSize={200}
                                avatarPosition={'start'}
                                title={"舜华餐厅（S05负一楼）"}
                                text={"点菜时间：周一至周五下午4点前。"}
                                onClick={this.goCardDetails.bind(this)}>
                            </Card>
                            <Card key={4}
                                avatar={<img className={`align-self-center mr-3`} 
                                            src={require("../images/canteen2.jpg")} alt="Generic placeholder image" 
                                            style={{'width': `120px`}}/>}
                                avatarSize={200}
                                avatarPosition={'start'}
                                title={"庆丰餐厅（S06负一楼）"}
                                text={"点菜时间：周一至周五下午4点前。"}
                                onClick={this.goCardDetails.bind(this)}>
                            </Card>
                            <Card key={5}
                                avatar={<img className={`align-self-center mr-3`} 
                                            src={require("../images/canteen3.jpg")} alt="Generic placeholder image" 
                                            style={{'width': `120px`}}/>}
                                avatarSize={200}
                                avatarPosition={'start'}
                                title={"金膳林餐厅（S06一楼）"}
                                text={"点菜时间：周一至周五下午4点前。"}
                                onClick={this.goCardDetails.bind(this)}>
                            </Card>

                        </div>
                    </Content>
                </Container>
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

    
}

export default Details;
