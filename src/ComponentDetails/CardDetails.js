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
                    <Content padding={[1,0,2,0]}>
                        <label>Example-1: 复杂卡片</label>
                        <Card key={1}
                            avatar={<img className={`align-self-start mr-3`} 
                                        src={require("../images/avatar.png")} alt="Generic placeholder image" 
                                        style={{'width': `54px`}}/>}
                            // avatarSize={54}
                            avatarPosition={'start'}
                            title={<h6>美食频道</h6>}
                            text={"2018/01/26"}
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

                        <label>Example-2：机票申请</label>
                        <Card key={2}
                            avatar={<img className={`align-self-center mr-3`} 
                                        src={require("../images/avatar.png")} alt="Generic placeholder image" 
                                        style={{'width': `54px`}}/>}
                            // avatarSize={54}
                            avatarPosition={'start'}
                            title={<h6>张经理</h6>}
                            text={"平台与技术部"}
                            onClick={this.goCardDetails.bind(this)}>
                            <div className="ticketInfo"><label>起止城市：</label> <label>济南 - 成都</label></div>
                            <div className="ticketInfo"><label>航班信息：</label> <label>2018-01-26 ca4527 经济舱</label></div>
                            <div className="ticketInfo"><label>出票时间：</label> <label>2018-01-22</label></div>
                        </Card>

                        <label>Example-3：餐厅卡片</label>
                        <Card key={3}
                            avatar={<img className={`align-self-center mr-2`} 
                                        src={require("../images/canteen.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `120px`}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<h6>舜华餐厅（S05负一楼）</h6>}
                            text={"点菜时间：周一至周五下午4点前。"}
                            onClick={this.goCardDetails.bind(this)}>
                        </Card>
                        <Card key={4}
                            avatar={<img className={`align-self-center mr-2`} 
                                        src={require("../images/canteen2.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `120px`}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<h6>庆丰餐厅（S06负一楼）</h6>}
                            text={"点菜时间：周一至周五下午4点前。"}
                            onClick={this.goCardDetails.bind(this)}>
                        </Card>
                        <Card key={5}
                            avatar={<img className={`align-self-center mr-2`} 
                                        src={require("../images/canteen3.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `120px`}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<h6>金膳林餐厅（S06一楼）</h6>}
                            text={"点菜时间：周一至周五下午4点前。"}
                            onClick={this.goCardDetails.bind(this)}>
                        </Card>
                        
                        <label>Example-4：仿微信消息卡片</label>
                        <Card key={6}
                            avatar={<img className={`align-self-center mr-1`} 
                                        src={require("../images/avatar.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `60px`, borderRadius: '5px'}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<h6>哈士奇</h6>}
                            text={"再不回来我就拆家!"}
                            topRight={<label>17:30:00</label>}
                            bottomRight={<Icon type="star-o" onClick={this.thumbsUp.bind(this)}/>}
                            onClick={this.goCardDetails.bind(this)}>
                        </Card>
                        <Card key={7}
                            avatar={<img className={`align-self-center mr-1`} 
                                        src={require("../images/avatar2.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `60px`, borderRadius: '5px'}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<h6>铲屎官</h6>}
                            text={"马上到家！"}
                            topRight={<label>17:31:12</label>}
                            bottomRight={<Icon type="star-o" onClick={this.thumbsUp.bind(this)}/>}
                            onClick={this.goCardDetails.bind(this)}>
                        </Card>
                        <Card key={8}
                            avatar={<img className={`align-self-center mr-1`} 
                                        src={require("../images/avatar2.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `60px`, borderRadius: '5px'}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<h6>铲屎官</h6>}
                            text={"马上到家！"}
                            topRight={<img src={require("../images/rejected.jpg")} alt="" 
                                        style={{'width': `60px`, borderRadius: '5px'}}/>}
                            bottomRight={<Icon type="star-o" onClick={this.thumbsUp.bind(this)}/>}
                            onClick={this.goCardDetails.bind(this)}>
                        </Card>
                        <label>Example-5：仿YouTube卡片1(图片在上方)</label>
                        <Card key={9} position={"bottom"}
                            avatar={<img className={`align-self-start mr-1 mt-2`} 
                                        src={require("../images/avatar.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `48px`, borderRadius: '24px'}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={"Stephen Curry UNREAL 44 Pts, 14-19 FG 2018.02.22 Golden States Warrious vs LA Clippers"}
                            text={<div style={{fontSize: '10px', color: 'grey'}}>FreeDawkings · 17万次观看 · 20小时前</div>}
                            topRight={
                                <div className="text-center pt-1" onClick={this.thumbsUp.bind(this)}>
                                    <Icon type="ellipsis" style={{ fontSize: 18, color: 'grey', transform: 'rotate(90deg)', fontWeight: 'bold'}}/>
                                </div>}
                            onClick={this.goCardDetails.bind(this)}
                        >
                            <div className="mb-1" style={{'display': 'inline-table'}}>
                                <img src={require("../images/nba.jpg")} alt="" style={{'width': '100%', height: '200px'}}/>
                            </div>
                        </Card>
                        <label>Example-6：仿YouTube卡片2</label>
                        <Card key={10}
                            avatar={<img className={`align-self-center mr-2`} 
                                        src={require("../images/nba.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `150px`}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={"Stephen Curry UNREAL 44 Pts, 14-19 FG 2018.02.22..."}
                            text={<div style={{fontSize: '10px', color: 'grey'}}>17万次观看 · 20小时前</div>}
                            topRight={
                                <div className="text-center pt-1" onClick={this.thumbsUp.bind(this)}>
                                    <Icon type="ellipsis" style={{ fontSize: 18, color: 'grey', transform: 'rotate(90deg)', fontWeight: 'bold'}}/>
                                </div>}
                            middleLeft={<div style={{fontSize: '10px', color: 'grey'}}>FreeDawkings</div>}
                            onClick={this.goCardDetails.bind(this)}
                        >
                        </Card>

                        <label>Example-7：仿Gmail卡片</label>
                        <Card key={11}
                            avatar={<img className={`align-self-start mr-1 mt-2`} 
                                        src={require("../images/larry.jpg")} alt="Generic placeholder image" 
                                        style={{'width': `48px`, borderRadius: '24px'}}/>}
                            // avatarSize={200}
                            avatarPosition={'start'}
                            title={<div style={{fontSize: '15px', color: '#000000'}}>Gmail安全中心</div>}
                            text={<div style={{fontSize: '10px', color: 'grey'}}>您的账号在新设备上有登陆行为，请注意。</div>}
                            topRight={<label>17:31:12</label>}
                            bottomRight={<Icon type="star-o" onClick={this.thumbsUp.bind(this)}/>}
                            middleLeft={<div style={{fontSize: '10px', color: '#000000'}}>您的账号有风险！</div>}
                            onClick={this.goCardDetails.bind(this)}
                        >
                        </Card>
                        <label>Example-8：无头像卡片</label>
                        <Card key={12}
                            avatarPosition={'start'}
                            title={<div style={{fontSize: '15px', color: '#000000'}}>Gmail安全中心</div>}
                            text={<div style={{fontSize: '10px', color: 'grey'}}>您的账号在新设备上有登陆行为，请注意。</div>}
                            topRight={<label>17:31:12</label>}
                            bottomRight={<Icon type="star-o" onClick={this.thumbsUp.bind(this)}/>}
                            middleLeft={<div style={{fontSize: '10px', color: '#000000'}}>您的账号有风险！</div>}
                            middleRight={
                                <div className="px-1" style={{fontSize: '8px', color: 'grey', backgroundColor: '#e3e3e3'}}>已归档</div>
                            }
                            onClick={this.goCardDetails.bind(this)}
                        >
                        </Card>

                        <label>Example-9：仿Medium（无头像且上方有图片卡片）</label>
                        <Card key={13} position="bottom"
                            title={<div style={{fontSize: '21px', color: '#000000', fontFamily: 'Lucida Grande'}}>The Singular Pursuit of Comrade Bezos</div>}
                            middleLeft={<div style={{fontSize: '16px', color: 'rgba(0, 0, 0, 0.54)', fontFamily: 'Lucida Grande'}}>Is Amazon’s plan to increase our efficiency a good thing?</div>}
                            text={
                                <div>
                                    <span className="mr-2" style={{fontSize: '12px', color: 'grey', fontFamily: 'Lucida Grande'}}>New York Magazine</span>
                                    <span className="mr-2" style={{fontSize: '12px', color: 'grey', fontFamily: 'Lucida Grande'}}>17:31:12</span>
                                    <Icon type="like-o" style={{ fontSize: 16, color: 'grey'}} onClick={this.thumbsUp.bind(this)}/>
                                </div>
                            }
                            onClick={this.goCardDetails.bind(this)}
                        >
                            <div className="mb-1" style={{'display': 'inline-table'}}>
                                <img src={require("../images/jeff-bezos.jpeg")} alt="" style={{'width': '100%', height: '190px'}}/>
                            </div>
                        </Card>
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
