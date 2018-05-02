import React, {Component} from 'react';
import './ComponentDetails.css';
import { Fetch as requestObj, ShowMessage, ShowToast } from '../components';
import Header from '../components/header/header';
import Row from '../components/row/row';
import Button from '../components/button/button';
import Container from '../components/container/container';
import Content from '../components/content/content';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
			
        };
    }

    fetchGET() {
        let url = "http://jsonplaceholder.typicode.com/users";
		let optionsGET = {
		};
        let FETCH = new requestObj(url, optionsGET);
        FETCH.get()
        .subscribe(result => {
            this.setState({
                results: result
            }, () => {
                ShowMessage("success", "列表获取成功！");
            });
            
        }, function (err) {
            if(err.status === 'timeout') {
                ShowMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                ShowToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                ShowMessage("info", "列表获取失败，请重试");
            }
        })
    }

    fetchPOST() {
        let url = "http://jsonplaceholder.typicode.com/posts/1/comments";
        //上传的数据：body
        let cartInfoToUpload = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        /**
         * options格式:
         * method: POST|GET|PUT|DELETE|PATCH...
         * body: 用于POST|PUT等方法，不需要调用JSON.stringify()
         */
        let optionsPOST = {
            format: 'text', // 需要返回的数据类型，fetch对象内部会执行不同方法 response.json()|response.text()|response.blob()
            body: cartInfoToUpload
        };
        let FETCH = new requestObj(url, optionsPOST);
        FETCH.post()
        .subscribe(result => {
            this.setState({
                results: result
            }, () => {
                ShowMessage("success", "下单成功！");
            });
            
        }, function (err) {
            if(err.status === 'timeout') {
                ShowMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                ShowToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                ShowMessage("info", "下单失败，请重试");
            }
        })
    }


    fetchPUT() {
        let urlPut = 'https://jsonplaceholder.typicode.com/posts/1';
        let infoToUpload = {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1
        };
        let optionPUT = {
            body: infoToUpload
        };
        let FETCH = new requestObj(urlPut, optionPUT);
        FETCH.put()
        .subscribe(result => {
            this.setState({
                results: result
            }, () => {
                ShowMessage("success", "个人信息更新成功！");
            });
            
        }, function (err) {
            if(err.status === 'timeout') {
                ShowMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                ShowToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                ShowMessage("info", "信息更新失败，请重试");
            }
        })
    }

    fetchDELETE() {
        let urlDelete = "https://jsonplaceholder.typicode.com/posts/1";
        /**
         * options格式
         * method: POST|GET|PUT|DELETE|PATCH...
         * body: 用于POST|PUT等方法，不需要调用JSON.stringify()
         */
        let optionsDELETE = {
        };
        let FETCH = new requestObj(urlDelete, optionsDELETE);
        FETCH.delete()
        .subscribe(result => {
            this.setState({
                results: result
            }, () => {
                ShowMessage("success", "订单删除成功！");
            });
            
        }, function (err) {
            if(err.status === 'timeout') {
                ShowMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                ShowToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                ShowMessage("info", "订单删除失败，请重试");
            }
        })
    }

    fetchPATCH() {
        let urlPatch = 'https://jsonplaceholder.typicode.com/posts/1';
        let optionPATCH = {
            mode: 'cors',
            body: {
                title: 'foo'
            }
        };
        let FETCH = new requestObj(urlPatch, optionPATCH);
        FETCH.patch()
        .subscribe(result => {
            this.setState({
                results: result
            }, () => {
                ShowMessage("success", "订单信息更新成功！");
            });
            
        }, function (err) {
            if(err.status === 'timeout') {
                ShowMessage("info", "网络超时，请重试");
            }
            if(err.status=== 'offline') {
                ShowToast("offline", "网络连接不可用，请检查网络设置");
            }
            if(err.status=== 'error') {
                console.log(err);
                ShowMessage("info", "信息更新失败，请重试");
            }
        })
    }

    render() {
        console.log(this.state.results);
		
        return (
            <div className="transition-item detail-page">
                <Container>
                    <Header name="Fetch" 
                        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
                    </Header>
                    <Content padding={[1, 1, 1, 1]}>
                       <Row>
                            <Button bstyle={"inspur"} size="lg" text={"GET"} col={6} onClick={ this.fetchGET.bind(this)}/>
                            <Button bstyle={"primary"} size="lg" text={"POST"} col={6} onClick={ this.fetchPOST.bind(this)}/>
                            <Button bstyle={"warning"} size="lg" text={"DELETE"} col={6} onClick={this.fetchDELETE.bind(this)}/>
                            <Button bstyle={"success"} size="lg" text={"PUT"} col={6} onClick={this.fetchPUT.bind(this)}/>
                            <Button bstyle={"default"} size="lg" text={"PATCH"} col={6} onClick={this.fetchPATCH.bind(this)}/>
                        </Row>
                    </Content>
                </Container>
            </div>
        );
    }

    onLeftArrowClick() {
		this.props.history.goBack();
    }

}

export default Details;
