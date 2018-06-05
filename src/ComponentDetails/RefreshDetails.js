import React, {Component} from 'react';
import './ComponentDetails.css';
import { Fetch as requestObj, showMessage, showToast } from '../components';
import PullRefresh from '../components/pull-to-refresh/pull-to-refresh';
import Header from '../components/header/header';
import Container from '../components/container/container';
import Content from '../components/content/content';
import Card from '../components/card/card';
import Icon from 'antd/lib/icon';
import 'antd/lib/spin/style/css';
import Spin from '../components/spin/spin';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
			isRefreshing: false,
            isLoading: false,
            timesOfLoad: 0,
			hasMore: true, // 是否继续上划加载
			height: document.documentElement.clientHeight,
            isSpinning: true
        };
    }

    // /**
    //  * 1. 挂载scroll监听方法至contentNode上
    //  * 该contentNode为scrollable的实体dom
    //  */
    // componentDidMount() {
    //     if (this.contentNode) {
    //         this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
    //     }
    //     this.refresh();
    //     this.setState({
    //         timesOfLoad: 1
    //     });
    // }

    // /**
    //  * 3. 卸载scroll监听方法
    //  */
    // componentWillUnmount() {
    //     if (this.contentNode) {
    //         this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
    //     }
    // }

    // /**
    //  * 2. scroll监听方法，滚动至底部时，在自动加载更多数据的方法-->更新state中的数据-->更新dom
    //  * @param {*} event 
    //  */
    // onScrollHandle(event) {
    //     const clientHeight = event.target.clientHeight; // 屏幕高度
    //     const scrollHeight = event.target.scrollHeight; // 总的内容高度
    //     const scrollTop = event.target.scrollTop; // 已经滑动的距离
    //     const isBottom = (clientHeight + scrollTop === scrollHeight)
    //     if(isBottom) {
    //         if(this.state.hasMore) {
    //             this.loadMore();
    //         }
    //     }
    // }
    /**
     * 1. 挂载scroll监听方法至contentNode上
     * 该contentNode为scrollable的实体dom
     */
    componentDidMount() {
        let scrollableElement = document.getElementsByClassName("scroll");
        console.log(scrollableElement)
        if (scrollableElement && scrollableElement.length > 0) {
            scrollableElement[0].addEventListener('scroll', this.onScrollHandle.bind(this));
            this.refresh();
            this.setState({
                timesOfLoad: 1
            });
        }
    }

    /**
     * 3. 卸载scroll监听方法
     */
    componentWillUnmount() {
        let scrollableElement = document.getElementsByClassName("scroll");
        if (scrollableElement && scrollableElement.length > 0) {
            scrollableElement[0].removeEventListener('scroll', this.onScrollHandle.bind(this));
        }
    }

    /**
     * 2. scroll监听方法，滚动至底部时，在自动加载更多数据的方法-->更新state中的数据-->更新dom
     * @param {*} event 
     */
    onScrollHandle(event) {
        const clientHeight = event.target.clientHeight; // 屏幕高度
        const scrollHeight = event.target.scrollHeight; // 总的内容高度
        const scrollTop = event.target.scrollTop; // 已经滑动的距离
        const isBottom = (clientHeight + scrollTop === scrollHeight);
        if(isBottom) {
            if(this.state.hasMore) {
				this.setState({
					isSpinning: true
				});
                this.loadMore();
            }
        }
    }
    
    refresh() {
		let url = "http://jsonplaceholder.typicode.com/users";
		// let self = this;
		let optionsGET = {
		};
        
        let FETCH = new requestObj(url, optionsGET);
        FETCH.get()
        .subscribe(result => {
            this.setState({
                results: result,
                isSpinning: false,
                hasMore: true,
                timesOfLoad: 0
            });
        }, function (err) {
            if(err.status === 'timeout') {
                showMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                showToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                showMessage("info", "列表获取失败，请重试");
            }
        })
	}

    loadMore() {
		let url = "http://jsonplaceholder.typicode.com/users";
		let self = this;
        let optionsGET = {};
        
        let FETCH = new requestObj(url, optionsGET);
        FETCH.get()
        .subscribe(result => {
            let prevResults = self.state.results;
            let newResults = prevResults.concat(result);
            let timesOfLoad = self.state.timesOfLoad + 1;
            let hasMore = timesOfLoad > 2 ? false : true;
            self.setState({
                timesOfLoad: timesOfLoad,
                results: newResults,
                isSpinning: false,
                hasMore: hasMore
            });
        }, function (err) {
            if(err.status === 'timeout') {
                showMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                showToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                showMessage("info", "列表获取失败，请重试");
            }
        })
	}

    render() {
        console.log(this.state.results);
		let listDiv = this.state.results.length === 0 ? (<div></div>) : this.state.results.map((item, index) => {
			return (
				<Card key={index}
					avatar={<img className={`align-self-start mr-3`} 
								src={require("../images/avatar.png")} alt="" 
								style={{'width': `40px`}}/>}
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
                <Container>
                    <Header name="Refresh" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content>
                        {/* <div className="scroll" ref={ node => this.contentNode = node }> */}
                            <Spin isSpinning={this.state.isSpinning} indicator="c" size={40} color={"#318ccf"}/>
                            <PullRefresh 
                                // style={{
                                //     height: this.state.height - 56,
                                // }}
                                // distanceToRefresh={80}
                                // indicator={{ activate: '松开刷新', deactivate: '继续下拉刷新', finish: '刷新完成' }}
                                refreshing={this.state.isRefreshing} 
                                onRefresh={this.refresh.bind(this)}
                                className={"scroll"}
                            >
                                {listDiv}

                                {/* 下方组件为列表底部提示性信息：列表还有内容时，显示"正在加载"；列表无更多内容时，显示"—— 已无更多 ——" */}
                                {<div className="text-center" 
                                    style={{backgroundColor: '#ededed', color: '#808080', fontSize: '14px', height: '45px', 
                                        verticalAlign: 'middle', paddingTop: '10px'}}>
                                    {this.state.hasMore ? <div><Icon type="loading" />  正在加载...</div> : "———— 已无更多 ————"}
                                </div>}
                            </PullRefresh>
                        {/* </div> */}
                    </Content>
                </Container>
            </div>
        );
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

    goCardDetails() {
        console.log("Go to see details...");
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
