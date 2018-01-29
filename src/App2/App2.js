import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import './App2.css';
import request from '../Utils/fetchUtil';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Row from '../components/row/row';
import Content from '../components/content/content';
import Button from '../components/button/button';
import RadioGroup from '../components/radio/radio';
import Modals from '../components/modal/modal'; 
import Card from '../components/card/card'; 
import CardList from '../components/cardlist/cardlist';

import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';
import AButton from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';

import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import 'antd-mobile/lib/pull-to-refresh/style/css';
import InfiniteScroll from 'react-infinite-scroller/dist/InfiniteScroll';

import Toast from '../components/third-party/toast';
import '../components/third-party/toast/style/css';
import Icon from 'antd/lib/icon';

import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

class App extends Component {
	constructor() {
		super();
		this.state = {
			results: [],
			spin: true,
			isRefreshing: false,
			isLoading: false,
			hasMore: true,
			top: 10,
			height: document.documentElement.clientHeight,
			isSpinning: true
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
		return true
		} else {
		return false
		}
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		// const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
		let url = "http://jsonplaceholder.typicode.com/users";
		let self = this;
		let optionsGET = {
		};
		request(url, optionsGET, "json", "列表加载失败", "").then((resjson) => {
			// console.log(typeof(resjson) === "undefined")
			if(typeof(resjson) !== "undefined") {
				// console.log("refreshing...")
				let prevResults= self.state.results;
				let newResults= prevResults.concat(resjson);
				self.setState({
					results: newResults,
					isSpinning: false
					// height: hei
				});
			} else {
				console.log(self.state.results.length)
				console.log("else ")
			}
		})
	}

	loadMore(page) {
		console.log("Loading...");
		let url = "http://jsonplaceholder.typicode.com/users";
		let self = this;
		let optionsGET = {};
		request(url, optionsGET, "json", "列表加载失败", "").then((resjson) => {
			// console.log(typeof(resjson) === "undefined")
			if(typeof(resjson) !== "undefined") {
				let prevResults= self.state.results;
				let newResults= prevResults.concat(resjson);
				self.setState({
					results: newResults,
					isSpinning: false,
					hasMore: true
				});
			} else {}
		});
	}

	render() {
		// console.log(this.props.history);
		console.log(this.state.results);
		// const loader = <div className="loader">Loading ...</div>;
		let headerImageSrc = "../../images/arrowback-large.png";
		let listDiv = this.state.results.length === 0 ? (<div></div>) : this.state.results.map((item, index) => {
			return (
				<Card key={index}
					avatarURL={"../images/avatar.png"}
					avatarSize={40}
					avatarPosition={'start'}
					title={(this.state.results.length - index) + item.name}
					text={item.username}
					onClick={this.goCardDetails.bind(this)}
				>
					<p>
						每到年终岁尾的新年晚宴，中国人总得有点讲究的内容，比如说一定要有鱼，
						就是要年年有余。今天给大伙儿准备的就是一道不光有余，
						还天长地久的私房菜，蒜烧海鳗鱼。
					</p>
					{/* <p>
						每到年终岁尾的新年晚宴，中国人总得有点讲究的内容，比如说一定要有鱼，
						就是要年年有余。今天给大伙儿准备的就是一道不光有余，
						还天长地久的私房菜，蒜烧海鳗鱼。
					</p>
					<p>
						每到年终岁尾的新年晚宴，中国人总得有点讲究的内容，比如说一定要有鱼，
						就是要年年有余。今天给大伙儿准备的就是一道不光有余，
						还天长地久的私房菜，蒜烧海鳗鱼。
					</p> */}
					<div style={{'display': 'inline-table'}}>
						<img src={require("../images/timg.jpg")} alt="" style={{'width': '200px'}}/>
						{/* <img src={require("../images/timg.jpg")} alt="" style={{'width': '150px'}}/> */}
					</div>
					<div style={{'display': 'inline-flex', 'margin': '10px 10px 5px 10px'}}>
						<div className="col-4" style={{'textAlign': 'center'}} onClick={this.thumbsUp.bind(this)}>
							<Icon type="heart-o" style={{ fontSize: 26, color: '#318ccf'}}/>
						</div>
						<div className="col-4" style={{'textAlign': 'center'}} onClick={this.shareToWeibo.bind(this)}>
							<Icon type="weibo-circle" style={{ fontSize: 26, color: '#318ccf' }}/>
						</div>
						{/* <div className="col-4" style={{'textAlign': 'center'}} onClick={this.shareToWeChat.bind(this)}>
							<Icon type="wechat" style={{ fontSize: 26, color: '#318ccf' }}/>
						</div> */}
						<div className="col-4" style={{'textAlign': 'center'}} onClick={this.editForm.bind(this)}>
							<Icon type="form" style={{ fontSize: 26, color: '#318ccf' }}/>
						</div>
					</div>
				</Card>
			);
		});
		
		return (
		<div className="transition-item detail-page">
			<Header name="列表" 
				headerImageSrc={headerImageSrc}
				onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
			</Header>

			<div className="content">
				<Content padding={[8, 0, 8, 0]}>
					<Spin spinning={this.state.isSpinning} tip={"加载中"} delay={500} size="large">		
						<PullToRefresh 
							ref={el => this.ptr = el}
							style={{
								height: this.state.height - 56,
							}}
							distanceToRefresh={80}
							refreshing={this.state.isRefreshing} 
							onRefresh={this.loadMore.bind(this)}>
							{/* <InfiniteScroll
								pageStart={0}
								loadMore={this.loadMore.bind(this)}
								hasMore={this.state.hasMore}
								> */}
								<CardList>
									<ReactCSSTransitionGroup
										transitionName="example"
										transitionEnterTimeout={500}
										transitionLeaveTimeout={300}>
										{listDiv}
									</ReactCSSTransitionGroup>
								</CardList>
							{/* </InfiniteScroll> */}
						</PullToRefresh>
					</Spin>
				</Content>
			</div>

			<Footer
				style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
						{'color': 'white', 'backgroundColor': '#318ccf'}]}
				buttonName={["常规", "输入"]}
				callBackFooterButtonClick={[
					this.callBackFooter0, 
					this.callBackFooter1,]}>
			</Footer>
		</div>
		);
	}
	
	editForm(e) {
		e.stopPropagation(); //重要！
		console.log("编辑！");
		this.props.history.push({
			pathname: '/Details',
			state: {}
		});
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

	goCardDetails() {
		console.log("Going to details page...");
	}

	onRefresh() {
		console.log("Freshing...");
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            this.refresh();
            this.setState({
                refreshing: false,
                isLoading: false,
            });
        }, 600);
    }
  
	onLeftArrowClick() {
		// console.log("Quit button is clicked...");
		this.props.history.goBack();
		// this.componentDidMount(); //临时测试刷新
	}

	//#region //footer callback function
	callBackFooter0() {
		console.log("Footer 0 is clicked...");
		Modal.alert('删除订单', '确定删除？', [
		{ text: '取消', 
			onPress: () => console.log('cancel') 
		},
		{
			text: '删除',
			onPress: () => console.log('OK')
		},
		{
			text: '确定',
			onPress: () => console.log('Confirm')
		}
		]);
	}

	callBackFooter1() {
		console.log("Footer 1 is clicked...");
		Modal.prompt('就餐时间', '请输入就餐时间', [
		{ text: 'Cancel' },
		{ text: 'Submit', onPress: value => console.log(`就餐时间:${value}`) },
		], 'plain-text', '18：00')
	}
	callBackFooter2(key) {
		console.log("Footer 2 is clicked...");
		// this.showModal('modal2');
		this.setState({
		[key]: true,
		});
	}
	//#endregion

}

export default App;
