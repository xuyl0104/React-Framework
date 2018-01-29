import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Container from '../components/container/container';
import Content from '../components/content/content';
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
                <Container>
                    <Header name="PageTemplate" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[0,0,0,0]}>
                        <label className="text-dark text-uppercase font-weight-bold">卡片样式</label>
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
                        <label className="text-dark text-uppercase font-weight-bold">文字段落样式</label>
                        <div className="bg-white p-2 text-justify">
                            <p className="text-uppercase">使用说明：</p> 
                            <p>本页面模板基于Bootstrap V4设计与编码，采用了Flex布局排版技术。</p>
                            <p>如要使用切换动画，在最外层添加<code>div</code>，并将<code>className</code>设置为<code>transition-item detail-page</code>;</p>
                            <p><code>Container</code>：<code>Container</code>定义了页面的height和width，并分别设置为100%，同时用户可以根据实际需要改变属性
                                <code>padding</code>以实现对页面整体内边距的设置；使用时须将<code>Container</code>至于外层；
                            </p>
                            <p><code>Header</code>：<code>Header</code>组件为固定在屏幕顶部的蓝色区域，高度为<code>56px</code>，不随页面滚动而消失；</p>
                            <p><code>Content</code>：<code>Content</code>组件定义了屏幕中央内容区域，该区域在内容较多时可以滚动显示；</p>
                            <p><code>Footer</code>：<code>Footer</code>组件定义了固定于屏幕底部的区域，该区域内的按钮数量、按钮样式、按钮回调方法可以自由定义。</p>

                        </div>
                        <label className="text-dark text-uppercase font-weight-bold">行内多个按钮</label>
                        <div className="p-2">
                            <Button style="new" newStyle={{backgroundColor: 'white', color: '#318ccf'}} size="lg" text={"取消"} col={6} onClick={this.buttonClick.bind(this)} />
                            <Button style="inspur" size="lg" text={"评论"} col={6} onClick={this.buttonClick.bind(this)} />
                        </div>
                        <label className="text-dark text-uppercase font-weight-bold">复选框样式</label>
                        <CheckGroup 
                            option={['待确认', '制作中', '待结算', '已完成']}
                            val={[0, 1, 2, 3]}
                            selected={this.state.selectedCheckbox}
                            onChange={this.checkChange.bind(this)}/>

                        <label className="text-dark text-uppercase font-weight-bold">行内一个按钮</label>
                        <div className="p-2">
                            <Button style="inspur" size="lg" text={"提交"} col={12} onClick={this.buttonClick.bind(this)} />
                        </div>

                        <label className="text-success text-lowercase font-italic">lowercase-italic-success</label>
                        <div className="bg-light text-black p-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            <p className="text-uppercase">使用说明：</p> 
                            <p>本页面模板基于Bootstrap V4设计与编码，采用了Flex布局排版技术。</p>
                            <p>如要使用切换动画，在最外层添加<code>div</code>，并将<code>className</code>设置为<code>transition-item detail-page</code>;</p>
                            <p><code>Container</code>：<code>Container</code>定义了页面的height和width，并分别设置为100%，同时用户可以根据实际需要改变属性
                                <code>padding</code>以实现对页面整体内边距的设置；使用时须将<code>Container</code>至于外层；
                            </p>
                            <p><code>Header</code>：<code>Header</code>组件为固定在屏幕顶部的蓝色区域，高度为<code>56px</code>，不随页面滚动而消失；</p>
                            <p><code>Content</code>：<code>Content</code>组件定义了屏幕中央内容区域，该区域在内容较多时可以滚动显示；</p>
                            <p><code>Footer</code>：<code>Footer</code>组件定义了固定于屏幕底部的区域，该区域内的按钮数量、按钮样式、按钮回调方法可以自由定义。</p>

                        </div>
                    
                    </Content>
                    <Footer size={"lg"}
                        style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
                                {'color': 'white', 'backgroundColor': '#318ccf'}]}
                        buttonName={["拒单", "接单"]}
                        callBackFooterButtonClick={[
                            this.callBackFooter0, 
                            this.callBackFooter1
                            ]}>
                    </Footer>
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
