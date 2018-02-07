import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';
import './ComponentDetails.css';
import requestObj from '../Utils/fetch';
import showMessage from '../Utils/showMessage';
import showToast from '../Utils/showToast';
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
        let self = this;
        FETCH.get()
        .subscribe(result => {
            this.setState({
                results: result
            }, () => {
                showMessage("success", "列表获取成功！");
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

    fetchPOST() {
        let url = "http://jsonplaceholder.typicode.com/posts/1/comments";
        let self = this;
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
            body: cartInfoToUpload
        };
        let FETCH = new requestObj(url, optionsPOST);
        FETCH.post()
        .then((resp) => {
            if(!resp.ok) {
                showMessage("info", "下单失败，请重试");
            }
            return resp.json()
        })
        .then((resp) => {
            self.setState({
                results: resp
            }, () => {
                showMessage("success", "下单成功！");
            })
        })
        .catch((e) => {
            console.log(e);
            showMessage("info", "网络超时，请重试");
        })
    }


    fetchPUT() {
        let urlPut = 'https://jsonplaceholder.typicode.com/posts/1';
        let self = this;
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
        .then((resp) => {
            //API出现异常时，给出友好提示
            if(!resp.ok) {
                showMessage("info", "信息更新失败，请重试");
            }
            return resp.json()
        })
        .then((resp) => {
            //API调用正常，处理数据
            self.setState({
                results: resp
            })
        })
        .catch((e) => {
            //网络超时，显示超时提示信息
            console.log(e);
            showMessage("info", "网络超时，请重试");
        })
    }

    fetchDELETE() {
        let urlDelete = "https://jsonplaceholder.typicode.com/posts/1";
        let self = this;
        /**
         * options格式
         * method: POST|GET|PUT|DELETE|PATCH...
         * body: 用于POST|PUT等方法，不需要调用JSON.stringify()
         */
        let optionsDELETE = {
        };
        let FETCH = new requestObj(urlDelete, optionsDELETE);
        FETCH.delete()
        .then((resp) => {
            // console.log(resp);
            if(!resp.ok) {
                showMessage("info", "订单删除失败，请重试");
            }
            return resp.json()
        })
        .then((resp) => {
            self.setState({
                results: resp
            }, () => {
                showMessage("success", "订单删除成功！");
            })
        })
        .catch((e) => {
            console.log(e);
            showMessage("info", "网络超时，请重试");
        })
    }

    fetchPATCH() {
        let self = this;
        let urlPatch = 'https://jsonplaceholder.typicode.com/posts/1';
        let optionPATCH = {
            mode: 'cors',
            body: {
                title: 'foo'
            }
        };
        let FETCH = new requestObj(urlPatch, optionPATCH);
        FETCH.patch()
        .then((resp) => {
            console.log(resp);
            if(!resp.ok) {
                showMessage("info", "订单删除，请重试");
            }
            return resp.json()
        })
        .then((resp) => {
            self.setState({
                results: resp
            })
        })
        .catch((e) => {
            console.log(e);
            showMessage("info", "网络超时，请重试");
        })
    }

    fetchCheckNetworkStatus() {
        let url = "http://jsonplaceholder.typicode.com/users";
		let optionsGET = {};
        let FETCH = new requestObj(url, optionsGET);
        let self = this;
        let flag = FETCH.checkNetworkStatus();
        console.log(flag);
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
                            <Button style="inspur" size="lg" text={"GET"} col={6} onClick={ this.fetchGET.bind(this)}/>
                            <Button style="primary" size="lg" text={"POST"} col={6} onClick={ this.fetchPOST.bind(this)}/>
                            <Button style="warning" size="lg" text={"DELETE"} col={6} onClick={this.fetchDELETE.bind(this)}/>
                            <Button style="success" size="lg" text={"PUT"} col={6} onClick={this.fetchPUT.bind(this)}/>
                            <Button style="default" size="lg" text={"PATCH"} col={6} onClick={this.fetchPUT.bind(this)}/>
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
