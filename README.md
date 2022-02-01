# React组件使用说明
[![Build Status](https://travis-ci.org/xuyl0104/React-Framework.svg?branch=master)](https://travis-ci.org/xuyl0104/React-Framework)


- [React组件使用说明](#react组件使用说明)
  - [Release notes](#release-notes)
  - [Install and start](#install-and-start)
  - [Layout](#layout)
    - [Container](#container)
    - [Content](#content)
  - [Components](#components)
    - [PageTransition](#pagetransition)
    - [Header](#header)
    - [Footer](#footer)
    - [Button](#button)
    - [Input](#input)
    - [Message](#message)
    - [Modal](#modal)
    - [Card](#card)
    - [DatePicker](#datepicker)
    - [Spin](#spin)
    - [Refresh/Loadmore](#refreshloadmore)
    - [Tab](#tab)
    - [Listitem](#listitem)
    - [Radio/Check](#radiocheck)
    - [Switch](#switch)
  - [断网检测](#断网检测)
  - [API调用操作](#api调用操作)
  - [按需加载](#按需加载)
  - [发布至npm](#发布至npm)

[TOC]

## Release notes

- 0.1.18

  Added pull down to refresh and swipe up for loading more

## Install and start

👉 [Demo](http://116.62.207.59:81) http://116.62.207.59:81

- Installation

```
npm install gsp-react --save
```

- Demo

```
git clone https://github.com/xuyl0104/React-Framework.git
npm install
npm start
http://localhost:3000
```

## Layout

Based on Bootstrap v4，with`Flex` layout。

### Container

- Container use Flex layout。

  ```js
  <div className="w-100 d-flex flex-column" style={{height: '100vh'}}>
      {this.renderChildren(this.props)}
  </div>
  ```


- Container needs to wrap up all the components in the app page (if there is PageTransition component in this page, Container should be inside PageTransition)

### Content

Content should be outside all the other content components (such as components excluding header, footer)

| Attributes | Description      | Default                                     | Type   |
| ---------- | ---------------- | ------------------------------------------- | ------ |
| padding    | Inner padding    | [0, 0, 0, 0] （[top, right, bottom, left]） | []     |
| bgColor    | Background color | '#f8f9fa'                                   | string |

```js
<PageTransition>
	<Container>
		<Header></Header>
		<Content>
			...
		</Content>
		<Footer></Footer>
	</Container>
</PageTransition>
```

Please click the  Page template button for more details.



## Components

### PageTransition

- PageTransition is developed based on a third-party package [react-router-page-transition](https://github.com/trungdq88/react-router-page-transition)

- Install react-router-page-transition before using the page transition

  ```
  npm install react-router-page-transition --save
  ```


- Page transition implementation steps

  1. Add react-router-page-transition to `Router`, set`timeout`, `location`;  you need to use `switch` in `React-router-dom`.

     ```javascript
     <Router>
         <Route
             render={({location}) => (
                 <PageTransition timeout={500}>
                     <Switch location={location}>
                           <Route exact path="/" component={ComponentList}/>
                           <Route path="/PageTransitionDeatils" component={PageTransitionDeatils}/>
                           <Route path="/test" component={Test}/>
                           <Route path="/test2" component={Test2}/>
                           <Route path="/test3" component={Test3}/>
                     </Switch>
                 </PageTransition>
          )}/>
     </Router>
     ```

  2. Coding the animation

     See more details in `CSS/transition-main.css`  (you can name the names such as list-page, detail-page according to your need).

     In this demo app, we name the first page`ComponentList` to be `list-page` , and the following details page to be `detail-page`.

  3. Add our PageTransition component to each page

     Set the `transitionClass` and `direction` attributes

     ```javascript
     <PageTransition transitionClass={"detail-page"} direction={this.state.className}>
         <Container>
             <Header name="PageTransition" 
                 onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
             </Header>
             <Content>
                 <Row>
                     <Button style={"primary"} size="lg" text={"Page transition animation"} col={12} onClick={this.goToSeeDetails.bind(this)} />
                 </Row>
             </Content>
         </Container>
     </PageTransition>
     ```

     > | 属性            | 描述            | 默认值 | 类型   |
     > | --------------- | --------------- | ------ | ------ |
     > | transitionClass | 本页面的CSS类名 | —      | string |
     > | direction       | 动画方向        | ""     | string |

  4. Code the React life cycle functions to set the transition animation direction

     Image we have four pages: A、B、C、D

     A <—> B <—> C <—>D

     B and C are middle pages and we need to write functions to set the transition animation directions

     ```javascript
     /**
      * this functions is written in middle pages (such as page B, C) to decide which direction this page appears
      * If this page appears after being poped, the animation should be set to be detail-page-reverse;
      * If this page appears after being pushed into the history stack, we do not need to set the direction to be reversed.
      */
     componentWillMount() {
         let middle = this.props.history.action === "POP" ? "-reverse" : "";
         this.setState({
             className: middle
         });
     }
     ```

     ```javascript
     /**
      * this funciton is used to set the transition animation direction when leave this page
      * @param {*} nextProps 
      */
     componentWillReceiveProps(nextProps) {
         // go back to the previous page (pop)
         if (nextProps.history.action === 'POP') {
             this.setState({
                 className: ""
             });
         } else {
             if (nextProps.history.action === 'REPLACE') {
                 this.setState({
                     className: ""
                 });
             }
             // to a new page (push)
             this.setState({
                 className: "-reverse"
             });
         }
     }
     ```
     
     ![](https://i.imgur.com/u4bow5C.gif)

### Header

- Header consists of back button, header title, and right hand side button (optional)
- Header can have no, one or multiple right hand side button(s)
- Users can embed icons in the header

| 属性             | 描述                          | 默认值 | 类型       |
| ---------------- | ----------------------------- | ------ | ---------- |
| name             | Title                         | —      | string     |
| onLeftArrowClick | Callback of the return button | —      | func       |
| Child components | Embedded components           | —      | React elem |

```Js
import { Header } from 'gsp-react';
```

```js
<Header name="Header" 
    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
</Header>
```

```js
<Header name="Header" 
    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
    <img src={require("../images/add.png")} style={{width: '25px', height: '25px'}} 
        alt="" className="pull-right"
        onClick={this.props.onLeftArrowClick}></img>
</Header>
```

```javascript
<Header name="Header" 
    onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
    <img src={require("../images/add.png")} style={{width: '25px', height: '25px'}} alt="" className="pull-right" onClick={this.props.onLeftArrowClick}></img>
    <div className="ml-2"><Icon key="1" type="ellipsis" size={'md'}/></div>
</Header>
```

| ![](https://i.imgur.com/uDn0Lad.png) | ![](https://i.imgur.com/byN7xjX.png) | ![](https://i.imgur.com/vkBYpVt.png) |
| :----------------------------------: | :----------------------------------: | :----------------------------------: |
|              No button               |            Single button             |           Multiple buttons           |

### Footer

- Footer can have different number of buttons (1,2,3... but we do not recommend more than 3)
- The text, callback functions, styles of each button can be set by users easily
- We provide two height for the footer (lg and sm)

| 属性                      | 描述                 | 默认值 | 类型                |
| ------------------------- | -------------------- | ------ | ------------------- |
| buttonName                | Names of buttons     | —      | []: string          |
| callBackFooterButtonClick | Callbacks of buttons | —      | []: func            |
| style                     | Styles of buttons    | —      | []: object          |
| size                      | Button size          | "lg"   | string ("lg", "sm") |

```js
import { Footer } from 'gsp-react';
```

```Js
<Footer size="sm"
    style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
    buttonName={["Submit"]}
    callBackFooterButtonClick={[
        this.callBackFooter0]}>
</Footer>
```

```javascript
<Footer size="lg"
    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
            {'color': 'white', 'backgroundColor': '#318ccf'},
            {'color': '#318ccf', 'backgroundColor': '#ffffff'}]}
    buttonName={["Cancel", "Delele", "OK"]}
    callBackFooterButtonClick={[
        this.callBackFooter0, 
        this.callBackFooter1,
        this.callBackFooter2
        ]}>
</Footer>
```

| ![](https://i.imgur.com/N6B0rXk.png) | ![](https://i.imgur.com/uoQ5YCt.png) | ![](https://i.imgur.com/s2P0Qdq.png) |
| :----------------------------------: | :----------------------------------: | :----------------------------------: |
| ![](https://i.imgur.com/1IP7Dfe.png) | ![](https://i.imgur.com/gAcz2uO.png) | ![](https://i.imgur.com/pX3mAVI.png) |
|        Single button (lg, sm)        |         Two buttons (lg, sm)         |        Three buttons (lg, sm)        |

### Button

Button is an encapsulation of Bootstrap v4 [Button](https://getbootstrap.com/docs/4.0/components/buttons/)。

| 属性     | 描述                    | 默认值    | 类型                                                         |
| -------- | ----------------------- | --------- | ------------------------------------------------------------ |
| bstyle   | Button styles           | "primary" | string ("primary", "secondary", "success", "danger", "warning", "info", "light", "dark") |
| size     | Button size             | "lg"      | string ("lg", "sm")                                          |
| text     | Button text             | —         | string                                                       |
| col      | Num of cols occupied    | —         | num (12, 6, 4, 3)                                            |
| onClick  | Callback funcion        |           | func                                                         |
| newStyle | Used when style={"new"} | —         | object, such as {color: 'white', backgroundColor: '#318ccf'} |

```js
import { Button } from 'gsp-react';
```

```js
<Button bstyle={"primary"} size="lg" text={"col-12"} col={12} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"primary"} size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"default"} size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)}/>
<Button bstyle={"success"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"warning"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"danger"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)}/>
<Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button bstyle={"new"} newStyle={{color: 'white', backgroundColor: '#318ccf'}} size="sm" text="自定义" col={12} onClick={this.buttonClick.bind(this)} />

```

![](https://i.imgur.com/SYi34I5.png)

### Input

| 属性        | 描述                     | 默认值 | 类型                     |
| ----------- | ------------------------ | ------ | ------------------------ |
| label       | Label of input           | —      | string                   |
| text        | Text content of input    | —      | string                   |
| placeholder | placeholder              | —      | string                   |
| align       | Alignment                | "left" | string ("left", "right") |
| clear       | Has a clear button?      | —      | bool                     |
| onChange    | Callback                 | —      | func                     |
| child       | Embedded child component | —      | React element            |
| name        | Bind the column (name)   | —      | string                   |
| required    | Required?                | false  | boolean                  |

> ==name attribute should be consistent with the column in data ==  📌

```js
import { Input } from 'gsp-react';
```

```js
this.state = {
    info: [{"a": "", "b": "", "c": "", "d": "", "e": "", "f": ""}]
};
```

```js
<Input label={"左对齐带清空"} name={"a"} text={this.state.info[0]["a"]} onChange={this.onTextChange} placeholder={"姓名"} align={"left"} clear={true} />
  
<Input label={"上级审批人"} name={"b"} text={this.state.info[0]["b"]} onChange={this.onTextChange} placeholder={"上级审批人姓名"} align={"left"} />
  
<Input label={"左对齐带图标"} name={"c"} text={this.state.info[0]["c"]} onChange={this.onTextChange} placeholder={"审批意见"} align={"left"} 
    img={<Icon type="calendar" />}/>
      
<Input label={"右对齐带清空"} name={"d"} text={this.state.info[0]["d"]} onChange={this.onTextChange} placeholder={"请输入金额"} align={"right"} clear={true}/>
  
<Input label={"交易金额"} name={"e"} text={this.state.info[0]["e"]} onChange={this.onTextChange} placeholder={"请输入金额"} align={"right"} 
    img={<Icon type="right" />}/>
      
<Input label={"交易金额"} name={"f"} text={this.state.info[0]["f"]} onChange={this.onTextChange} placeholder={"请输入金额"} align={"right"} 
    img={<Icon type="pay-circle-o" />}/>
```

```js
onTextChange(e) {
    let info = this.state.info;
    info[0][e.target.name] = e.target.value;
    this.setState({
        info: info
    });
}
```

![](https://i.imgur.com/zgh52r4.png)

### Message

Message component combines the advantages of `Message` in `antd` and `Toast` in `antd-mobile`. We encapsulate these two third party components and expose two easy using functions-- `showMessage()` and `showToast()`.

- Message

|     属性 | 描述                                                    | 默认值 | 类型                                   |
| -------: | ------------------------------------------------------- | ------ | -------------------------------------- |
|     type | Message type                                            | —      | String（success, fail, info, warning） |
|     text | Message content                                         | —      | String                                 |
| duration | Message display duration (in seconds)                   | 2      | num                                    |
| position | Message display position (pixels off the top of screen) | 70     | num                                    |

- Toast

| 属性     | 描述                                | 默认值 | 类型                                      |
| -------- | ----------------------------------- | ------ | ----------------------------------------- |
| type     | Toast type                          | —      | String（success, fail, offline, loading） |
| text     | Toast content                       | —      | String                                    |
| duration | Toast display duration (in seconds) | 2      | num                                       |

```javascript
import { ShowMessage } from "gsp-react";
import { ShowToast } from 'gsp-react';

<Row>
  	<Button bstyle={"primary"} size="lg" text="info" col={12} 
							onClick={() => {ShowMessage("info", "this is a message", 2)}}/>
  	<Button bstyle={"success"} size="lg" text="success" col={12} 
							onClick={() => {ShowMessage("success", "this is a success message")}}/>
  	<Button bstyle={"danger"} size="lg" text="danger" col={12} 
							onClick={() => {ShowMessage("fail", "this is a danger message")}}/>
  	<Button bstyle={"warning"} size="lg" text="warning" col={12} 
							onClick={() => {ShowMessage("warning", "this is a warning message")}}/>
</Row>


<Row>
  	<Button bstyle={"primary"} size="lg" text={"success"} col={6} 
						onClick={() => ShowToast("success", "SUCCESS")}/>
  	<Button bstyle={"primary"} size="lg" text={"fail"} col={6} 
						onClick={() => ShowToast("fail", "Fail")}/>
  	<Button bstyle={"primary"} size="lg" text={"network failure"} col={6} 
						onClick={() => ShowToast("offline", "NETWORK FAILURE")}/>
  	<Button bstyle={"primary"} size="lg" text={"loading"} col={6} 
						onClick={() => ShowToast("loading", "LOADING...")}/>
</Row>


```

| ![](https://i.imgur.com/RF2WHIk.png) | ![](https://i.imgur.com/YYv2XR2.png) | ![](https://i.imgur.com/A7BoALA.png) | ![](https://i.imgur.com/egCigGL.png) |
| :----------------------------------: | :----------------------------------: | :----------------------------------: | ------------------------------------ |
|                 info                 |               success                |                 fail                 | Warning                              |

| ![](https://i.imgur.com/1g0Fk74.png) | ![](https://i.imgur.com/cAIrPvv.png) | ![](https://i.imgur.com/dofWN3F.png) | ![](https://i.imgur.com/l7l15qs.png) |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| success                              | fail                                 | Network failure                      | Loading                              |



### Modal

Modal is dialogue box or input box on the screen.

| 属性         | 描述                                        | 默认值 | 类型                         |
| ------------ | ------------------------------------------- | ------ | ---------------------------- |
| mode         | Modal type                                  | —      | string （"alert", "prompt"） |
| title        | Title                                       | —      | string                       |
| message      | Information shown on the modal              | —      | string                       |
| actionArr    | Button texts and callback functions         | —      | []:  {text, onPress}         |
| option       | Set when mode is "prompt", placeholder text | —      | string （"default"）         |
| defaultValue | Set when Mode is "prompt", default value    | —      | string                       |

```javascript
import { ShowModal } from 'gsp-react';
```

```javascript
<Button style={"primary"} size="lg" text="普通提示框" col={12} 
    onClick={
        () => {ShowModal("alert", 
            "这是一个提示框", 
            "确定要删除？", 
            [
                { text: 'Button1', onPress: () => this.callback1() },
                { text: 'Button2', onPress: () => this.callback2() },
            ]
            )
        }
    }
/>
```

```javascript
<Button style={"success"} size="lg" text="普通输入框" col={12} 
    onClick={
        () => {ShowModal("prompt", 
            "这是一个输入框", 
            "请输入要导出的邮箱", 
            [
                { text: '取消', onPress: () => this.callback1() },
                { text: '确认', onPress: (pswd) => this.callback4(pswd) },
            ]
            )
        }
    }
/>
```

```javascript
<Button style={"success"} size="lg" text="带默认值输入框" col={12} 
    onClick={
        () => {ShowModal("prompt", 
            "这是一个输入框", 
            "请输入要导出的邮箱", 
            [
                { text: '取消', onPress: () => this.callback1() },
                { text: '确认', onPress: (pswd) => this.callback4(pswd) },
            ], 'default', 'abc@inspur.com'
            )
        }
    }
/>
```

| ![](https://i.imgur.com/ABuh6Sb.png) | ![](https://i.imgur.com/thKtXXg.png) | ![](https://i.imgur.com/YR5UNIG.png) | ![](https://i.imgur.com/4SOtFOt.png) | ![](https://i.imgur.com/2TTEzeY.png) |
| :----------------------------------: | :----------------------------------: | :----------------------------------: | :----------------------------------: | ------------------------------------ |
|             Two buttons              |           Multiple buttons           |              Input box               |     Input box with default value     | Modal  sliding from Botton           |

### Card

Card component is a great choice to bundle information together and display in a concise way.

You can make beautiful card header and embed whatever information inside.

Based on [Media-object](https://getbootstrap.com/docs/4.0/layout/media-object/).

| 属性        | 描述                                         | 默认值 | 类型                         |
| ----------- | -------------------------------------------- | ------ | ---------------------------- |
| avatar      | Avatar (optional)                            | —      | `<img>`                      |
| position    | header position in the card                  | "top"  | string （"top", "bottom"）   |
| title       | header title                                 | —      | string                       |
| text        | Header text                                  | —      | String                       |
| onClick     | Callback when clicking the card              | —      | func                         |
| child       | Info displayed under the header              | —      | React elem                   |
| topRight    | Info displayed on top right of the header    | —      | React elem                   |
| bottomRight | Info displayed on Bottom right of the header | —      | React elem                   |
| middleLeft  | Info displayed on middle left of the header  | —      | React elem                   |
| middleRight | Info displayed on middle right of the header | —      | React elem                   |
| width       | Width of the card                            | “100%” | string                       |
| padding     | Inner padding                                | "8px"  | string （"6px 5px 6px 5px"） |
| margin      | Outer margin                                 | "0"    | string （"6px 5px 6px 5px"） |

解释

![](https://ws3.sinaimg.cn/large/006tKfTcly1fori6v30w4j30fr0cp400.jpg)

```Js
import { Card } from 'gsp-react';
```



```javascript
<label>Example-1：餐厅卡片</label>
<Card key={3}
    avatar={<img className={`align-self-center mr-2`} 
                src={require("../images/canteen.jpg")} alt="image" 
                style={{'width': `120px`}}/>}
    // avatarSize={200}
    avatarPosition={'start'}
    title={"舜华餐厅（S05负一楼）"}
    text={"点菜时间：周一至周五下午4点前。"}
    onClick={this.goCardDetails.bind(this)}>
</Card>
```

```js
<label>Example-2：仿微信消息卡片</label>
<Card key={7}
    avatar={<img className={`align-self-center mr-1`} 
                src={require("../images/avatar2.jpg")} alt="image" 
                style={{'width': `60px`, borderRadius: '5px'}}/>}
    // avatarSize={200}
    avatarPosition={'start'}
    title={"张三"}
    text={"马上到家！"}
    topRight={<label>17:31:12</label>}
    bottomRight={<Icon type="star-o" />}
    onClick={this.goCardDetails.bind(this)}>
</Card>
```

```js
<label>Example-3：机票申请</label>
<Card key={2}
    avatar={<img className={`align-self-center mr-3`} 
                src={require("../images/avatar.png")} alt="image" 
                style={{'width': `54px`}}/>}
    // avatarSize={54}
    avatarPosition={'start'}
    title={"张经理"}
    text={"平台与技术部"}
    onClick={this.goCardDetails.bind(this)}
>
    <div className="ticketInfo">
      <label>起止城市：</label> <label>济南 - 成都</label>
    </div>
    <div className="ticketInfo">
      <label>航班信息：</label> <label>2018-01-26 ca4527 经济舱</label>
    </div>
    <div className="ticketInfo">
      <label>出票时间：</label> <label>2018-01-22</label>
    </div>
</Card>
```

```js
<label>Example-4: 复杂卡片</label>
<Card key={1}
    avatar={<img className={`align-self-start mr-3`} 
                src={require("../images/avatar.png")} alt="Generic placeholder image" 
                style={{'width': `54px`}}/>}
    // avatarSize={54}
    avatarPosition={'start'}
    title={"美食频道"}
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

```

```js
<label>Example-5：仿Youtube卡片(图片在上方)</label>
<Card key={9} position={"below"}
    avatar={<img className={`align-self-start mr-1 mt-1`} 
                src={require("../images/avatar.jpg")} alt="Generic placeholder image" 
                style={{'width': `48px`, borderRadius: '24px'}}/>}
    // avatarSize={200}
    avatarPosition={'start'}
    title={"Stephen Curry UNREAL 44 Pts, 14-19 FG 2018.02.22 Golden States Warrious vs LA Clippers"}
    text={<div style={{fontSize: '10px', color: 'grey'}}>FreeDawkings · 17万次观看 · 20小时前</div>}
    topRight={
        <div className="text-center" onClick={this.thumbsUp.bind(this)}>
            <Icon type="heart-o" style={{ fontSize: 18, color: 'grey'}}/>
        </div>}
    onClick={this.goCardDetails.bind(this)}
>
    <div className="mb-1" style={{'display': 'inline-table'}}>
        <img src={require("../images/nba.jpg")} alt="" style={{'width': '100%', height: '200px'}}/>
    </div>
</Card>
```

```js
<label>Example-6：仿Gmail卡片</label>
<Card key={10}
    avatar={<img className={`align-self-start mr-1 mt-2`} 
                src={require("../images/avatar.jpg")} alt="Generic placeholder image" 
                style={{'width': `48px`, borderRadius: '24px'}}/>}
    // avatarSize={200}
    avatarPosition={'start'}
    title={<div style={{fontSize: '15px', color: '#000000'}}>Google安全中心</div>}
    text={<div style={{fontSize: '10px', color: 'grey'}}>您的账号在新设备上有登陆行为，请注意。</div>}
    topRight={<label>17:31:12</label>}
    bottomRight={<Icon type="star-o" />}
    middleLeft={<div style={{fontSize: '10px', color: '#000000'}}>您的账号有风险！</div>}
    onClick={this.goCardDetails.bind(this)}
>
</Card>
```

```js
<label>Example-9：仿Medium（无头像且上方有图片卡片）</label>
<Card key={13} position="bottom"
    title={<div style={{fontSize: '21px', color: '#000000', fontFamily: 'Lucida Grande'}}>The Singular Pursuit of Comrade Bezos</div>}
    middleLeft={<div style={{fontSize: '16px', color: 'rgba(0, 0, 0, 0.54)', fontFamily: 'Lucida Grande'}}>Is Amazon’s plan to increase our efficiency a good thing?</div>}
    text={
        <div>
            <span className="mr-2" style={{fontSize: '12px', color: 'grey', fontFamily: 'Lucida Grande'}}>New York Magazine</span>
            <Icon type="like-o" style={{ fontSize: 16, color: 'grey'}}/>
        </div>
    }
    onClick={this.goCardDetails.bind(this)}
>
    <div className="mb-1" style={{'display': 'inline-table'}}>
        <img src={require("../images/jeff-bezos.jpeg")} alt="" style={{'width': '100%', height: '190px'}}/>
    </div>
</Card>
```

```js
<label>横向滑动卡片列表</label>
<div className="horizontalSlide">
    <div className="wrapper d-inline-flex">
        <Card key={14} position="bottom" width={"40%"} margin={"0 5px 0 0"}
            title={<div style={{fontSize: '21px', color: '#000000', fontFamily: 'Lucida Grande'}}>Larry</div>}
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
                <img src={require("../images/larry.jpg")} alt="" style={{'width': '100%'}}/>
            </div>
        </Card>
         .
         .
         .
    </div>
</div>
```



|             ![](https://i.imgur.com/XaQTRo4.png)             | ![](https://i.imgur.com/fDYsnmK.png) | ![](https://i.imgur.com/3P7aCLi.png) | ![](https://i.imgur.com/gwWUrSN.png) | ![image-20210615220657595](../../../../../Library/Application Support/typora-user-images/image-20210615220657595.png) |
| :----------------------------------------------------------: | :----------------------------------: | :----------------------------------: | :----------------------------------: | ------------------------------------------------------------ |
|                          Diner card                          |               WhatsApp               |          Ticket application          |           Complicated card           | Medium website card                                          |
| ![image-20210615220713757](../../../../../Library/Application Support/typora-user-images/image-20210615220713757.png) | ![](https://i.imgur.com/zhaHSMv.png) | ![](https://i.imgur.com/qxzfj7u.png) | ![](https://i.imgur.com/6uDFoUl.png) | ![](https://i.imgur.com/DpLhYGe.png)                         |
|                         YouTube card                         |            Youtube card2             |              Gmail card              |            No avatar card            | Horizontally scrollable card (width < 100%)                  |



### DatePicker

DatePicker is based on `react-mobile-datepicker` ; users can finger scroll to change and select YYYY, MM, DD, hh, mm.

| 属性       | 描述                       | 默认值    | 类型                                           |
| ---------- | -------------------------- | --------- | ---------------------------------------------- |
| value      | Value of the datepicker    | —         | object: Date()                                 |
| isOpen     | Display the picker?        | false     | bool                                           |
| onSelect   | Callback when click OK     | —         | func                                           |
| onCancel   | Callback when click Cancel | —         | Func                                           |
| dateFormat | Time format                | —         | []: string                                     |
| showFormat | Format shown on the picker | —         | string                                         |
| theme      | Theme                      | "android" | string ("android", "ios")，recommend "android" |
| min        | Minimum time               | —         | object: Date()                                 |

```js
import { Picker } from 'gsp-react';
```

```js
<label>日期时间DateTime</label>
<Listview text={"时间"} onClick={this.handleClick1.bind(this)}>
    <label onClick={this.handleClick1.bind(this)}>{this.state.timestring1}			</label>
    <div className="pt-2"><Icon type="right" size={'lg'}/></div>
</Listview>
<div>
    <DatePicker
        value={this.state.time1}
        isOpen={this.state.isOpen1}
        onSelect={this.handleSelect1.bind(this)}
        onCancel={this.handleCancel1.bind(this)}
        dateFormat={['YYYY', 'MM', 'DD', 'hh', 'mm']}
        showFormat={'YYYY-MM-DD hh:mm'}
        theme={'android'}
    />
</div>
```

```js
<label>日期Date</label>
<Listview text={"借款日期"} onClick={this.handleClick3.bind(this)}>
    <label onClick={this.handleClick3.bind(this)}>{this.state.timestring3}</label>
    <div className="pt-2"><Icon type="right" size={'lg'}/></div>
</Listview>
<div>
    <DatePicker
        value={this.state.time3}
        isOpen={this.state.isOpen3}
        onSelect={this.handleSelect3.bind(this)}
        onCancel={this.handleCancel3.bind(this)}
        dateFormat={['YYYY', 'MM', 'DD']}
        showFormat={'YYYY-MM-DD'}
        theme={'android'}
        min={this.state.time}
    />
</div>
```

```js
<label>起止时间</label>
<Listview text={"起止时间"}>
    <input type="text" value={this.state.timestring5} placeholder={"起始时间"}
        onClick={this.handleClick5.bind(this)} readOnly="true"/>
    <div className="pt-2 ml-2 mr-2"><Icon type="arrow-right" size={'lg'}/></div>
    <input type="text" value={this.state.timestring6} placeholder={"结束时间"}
        onClick={this.handleClick6.bind(this)} readOnly="true"/>
</Listview>
<div>
    <DatePicker
        value={this.state.time5}
        isOpen={this.state.isOpen5}
        onSelect={this.handleSelect5.bind(this)}
        onCancel={this.handleCancel5.bind(this)}
        dateFormat={['hh', 'mm']}
        showFormat={'hh:mm'}
        theme={'android'}
        min={this.state.time}
    />
</div>
<div>
    <DatePicker
        value={this.state.time6}
        isOpen={this.state.isOpen6}
        onSelect={this.handleSelect6.bind(this)}
        onCancel={this.handleCancel6.bind(this)}
        dateFormat={['hh', 'mm']}
        showFormat={'hh:mm'}
        theme={'android'}
        min={this.state.time}
    />
</div>
```

```js
handleClick1() {
    this.setState({ isOpen1: true });
}
```

```js
handleCancel1() {
    this.setState({ isOpen1: false });
}
```

```js
handleSelect1(time) {
    this.setState({
        time1: time,
        timestring1: this.getDateString(time), 
        isOpen1: false 
    });
}
```

| ![](https://i.imgur.com/4ZYZqgE.png) | ![](https://i.imgur.com/Uv651Jy.png) | ![](https://i.imgur.com/kFhJZ5K.png) |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |
| DateTime                             | Date                                 | Start-End time                       |



### Spin

Spin animation when waiting for the data loading

| 属性       | 描述                     | 默认值    | 类型                   |
| ---------- | ------------------------ | --------- | ---------------------- |
| isSpinning | Show the animation?      | —         | boolean                |
| indicator  | Pattern of the animation | "a"       | string ("a", "b", "c") |
| size       | Size of the animation    | 30        | num                    |
| color      | Color of the pattern     | “#318ccf” | string                 |

```js
import { Spin } from 'gsp-react';

...
<Spin isSpinning={this.state.isSpinning} indicator="a" size={40} color={"red"}/>
```

|       |       |       |
| ----- | ----- | ----- |
| 样式a | 样式b | 样式c |

### Refresh/Loadmore

Pull-to-refresh is just an improvement over the [PullToRefresh](https://mobile.ant.design/components/pull-to-refresh-cn/); the use is relatively easy.

If you want to show the spin animation when refreshing the page, you need to import the `<Spin />`.

![](https://i.imgur.com/9xim8Uh.gif)



```js
import { PullRefresh } from 'gsp-react';
import { Spin } from 'gsp-react';
```

```js
this.state = {
    results: [],
    isRefreshing: false,
    timesOfLoad: 0, // 计数加载次数（实际应用中可以采用其他方法）
    hasMore: true, // 是否继续上划加载
    isSpinning: true // 是否显示加载动画
};
```

```js
/**
 * 1. 挂载scroll监听方法
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
```



```js
<Spin isSpinning={this.state.isSpinning} indicator="c" size={40} color={"#318ccf"}/>
<PullRefresh 
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

```

```js
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
            showMessage("info", "timeout, try later");
        }
        if(err.status=== 'offline') {
            showToast("offline", "No connection, please check");
        }
        if(err.status=== 'error') {
            console.log(err);
            showMessage("info", "Data error");
        }
    })
}
```

```js
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
            showMessage("info", "timeout, try later");
        }
        if(err.status=== 'offline') {
            showToast("offline", "No connection, please check");
        }
        if(err.status=== 'error') {
            console.log(err);
            showMessage("info", "Data error");
        }
    })
}
```



| 属性              | 描述                                           | 默认值                                                       | 类型       |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------ | ---------- |
|                   |                                                |                                                              |            |
| distanceToRefresh | Distance to drag before activate refresh       | 80                                                           | num        |
| indicator         | Information shown with different drag distance | { activate: 'release to refresh', deactivate: 'drag to refresh', finish: 'refreshed' } | object     |
| refreshing        | Do not change this                             | false                                                        | bool       |
| onRefresh         | Required, callback of refresh                  | —                                                            | func       |
| child             | Long list view that want to do drag to refresh | —                                                            | React elem |

**Swipe-to-load-more** needs to call the life cycle functions of react, so we haven't encapsulated this to be a standalone component.

We do not recommend use the swipe to load more component in and-mobile as it requires to use its own List component as the container and not easy to DIY.

Steps：

1. Add `ref` to the page, let's name it contentNode

   ```js
    //className=content; overflow-y: scroll，this is a must, otherwise it wont activate the loadmore function
   <div className="content" ref={ node => this.contentNode = node }> 
       <Spin spinning={this.state.isSpinning} tip={"loading"} delay={500} size="large">		
           <PullRefresh 
               style={{
                   height: this.state.height - 56,
               }}
               distanceToRefresh={80}
               // indicator={{ activate: 'release to refresh', deactivate: 'drag to refresh', finish: 'refreshed' }}
               refreshing={this.state.isRefreshing} 
               onRefresh={this.refresh.bind(this)}
           >
               {listDiv}

               {/* show helpful information in this bottom area: if there are more content to load, show 'refreshing'; otherwise, show '—— No more data ——' */}
               {<div className="text-center" 
                   style={{backgroundColor: '#ededed', color: '#808080', fontSize: '14px', height: '45px', 
                       verticalAlign: 'middle', paddingTop: '10px'}}>
                   {this.state.hasMore ? <div><Icon type="loading" />  refreshing</div> : "———— No more data ————"}
               </div>}
           </PullRefresh>
       </Spin>
   </div>
   ```

2. Mount the scroll callback to `contentNode` in the componentDidMount() function

   ```js
   /**
    * 1. mount the scroll callback to contentNode
    */
   componentDidMount() {
       if (this.contentNode) {
           this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
       }
       this.refresh();
       this.setState({
           timesOfLoad: 1
       });
   }
   ```
   
3. scroll callback, when scroll to the end of the screen, activate loadMore() —> update state—>update dom

   ```js
   /**
    * 2. scroll callback, when scroll to the end of the screen, activate loadMore() —> update state—>update dom
    * @param {*} event 
    */
   onScrollHandle(event) {
       const clientHeight = event.target.clientHeight; // screen height
       const scrollHeight = event.target.scrollHeight; // content height
       const scrollTop = event.target.scrollTop; // distance scrolled
       const isBottom = (clientHeight + scrollTop === scrollHeight)
       if(isBottom) {
           if(this.state.hasMore) {
               this.loadMore();
           }
       }
   }
   ```

   ```js
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
               showMessage("info", "timeout, try later");
           }
           if(err.status=== 'offline') {
               showToast("offline", "No connection, please check");
           }
           if(err.status=== 'error') {
               console.log(err);
               showMessage("info", "Data error");
           }
       })
   }
   ```

4. Unmount the scroll callback

   ```js
   componentWillUnmount() {
       if (this.contentNode) {
           this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
       }
   }
   
   ```



### Tab

- Tab can be 2 <= n <= 5
- Tab style is easy to set (activated and inactivated tab font, color, etc.)
- Underline style in the Current tab can be set (stroke, style, color)

| 属性           | 描述                                 | 默认值                                           | 类型       |
| -------------- | ------------------------------------ | ------------------------------------------------ | ---------- |
| tabs           | tab title list                       | —                                                | []: string |
| selected       | Current selected tab                 | 0                                                | num        |
| callBack       | Tab click callback                   | —                                                | func       |
| activeStyle    | Activated tab style                  | {color: '#318ccf', backgroundColor: '#ffffff'}   | {}         |
| inactiveStyle  | Inactivated tab style                | {color: '#000000', backgroundColor: '#ffffff'}   | {}         |
| indicatorStyle | Activated tab bottom underline style | {color: '#318ccf', style: 'solid', width: '2px'} | {}         |

Tab组件添加位置：

```html
<Container>
    <Header name="Tab" 
        onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
    </Header>
    {/* Tab */}
    {tabDiv}
    <Content>

    </Content>
</Container>
```



示例：

```js
import { Tab } from 'gsp-react';
```



```Js
<Tab tabs={['本日', '本周']} 
    selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
```

```Js
<Tab tabs={['本日', '本周', '本月']} 
	selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
```

```Js
<Tab tabs={['本日', '本周', '本月']} 
    activeStyle={{color: 'red', backgroundColor: '#ffffff', fontWeight: 'bold'}}
    inactiveStyle={{color: 'green', backgroundColor: '#ffffff'}}
    indicatorStyle={{width: '2px', color: '#318ccf', style: 'dashed'}}
    selected={this.state.selected} callBack={this.changeTab.bind(this)}/>
```

| ![](https://i.imgur.com/RK7wMcB.png) | ![](https://i.imgur.com/RK7wMcB.png) | ![](https://i.imgur.com/ein1N3W.png) | ![](https://i.imgur.com/nRMFXte.png) | ![](https://i.imgur.com/VGTfj9j.png) |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| 2 tab                                | 3 tab                                | 4 tab                                | 5 tab                                | DIY                                  |



### Listitem

- Listitem is used to easily input and display information on the page.


- Left side of Listitem is label, right side can be embedded in other elements (`Icon`，`image`， `Input`， `label`，`Switch`，`Button`, etc.)
- Automatic layout techniques based on number of right side elements from Bootstrap v4 👉[here](https://getbootstrap.com/docs/4.0/utilities/flex/#justify-content)

| 右侧元素数量 | 右侧分布情况                       |
| ------------ | ---------------------------------- |
| 1            | A                                  |
| 2            | A —————————————————————————————  B |
| 3            | A——————————————B———————————————C   |
| 4            | A————————B————————— C ———————————D |

| 属性     | 描述                  | 默认值 | 类型       |
| -------- | --------------------- | ------ | ---------- |
| text     | Label on the left     | —      | string     |
| child    | Elements on the right | —      | React elem |
| required | Required?             | false  | boolean    |

```Js
import { Listview } from 'gsp-react';
```



```js
<Listview text={"时间"}>
    <input type="text" value={"2018-01-30 16:45:30"} placeholder={"请输入时间"}
        onClick={this.onClick.bind(this)} readOnly="true" style={{width: '100%'}}/>
</Listview>
```

```js
<Listview text={"所在单位"}>
    <label onClick={this.onClick.bind(this)}>{"浪潮国际平台与技术部"}</label>
    <div className="pt-2 ml-2" onClick={this.onClick.bind(this)}><Icon type="right" size={'lg'}/></div>
</Listview>
```

```js
<Listview text={"起止时间"}>
    <input type="text" value={this.state.timestring5} placeholder={"起始时间"}
        onClick={this.handleClick5.bind(this)} readOnly="true"/>
    <div className="pt-2 ml-2 mr-2"><Icon type="arrow-right" size={'lg'}/></div>
    <input type="text" value={this.state.timestring6} placeholder={"结束时间"} className="text-right"
        onClick={this.handleClick6.bind(this)} readOnly="true"/>
</Listview>
<div>
    <DatePicker
        value={this.state.time5}
        isOpen={this.state.isOpen5}
        onSelect={this.handleSelect5.bind(this)}
        onCancel={this.handleCancel5.bind(this)}
        dateFormat={['hh', 'mm']}
        showFormat={'hh:mm'}
        theme={'android'}
        min={this.state.time}
    />
</div>
<div>
    <DatePicker
        value={this.state.time6}
        isOpen={this.state.isOpen6}
        onSelect={this.handleSelect6.bind(this)}
        onCancel={this.handleCancel6.bind(this)}
        dateFormat={['hh', 'mm']}
        showFormat={'hh:mm'}
        theme={'android'}
        min={this.state.time}
    />
</div>
```

```js
<Listview text={"城市区间"}>
    <input type="text" value={"济南市"} placeholder={"始发城市"}
        onClick={this.onClick.bind(this)} readOnly="true"/>
    {/* <div className="pt-2 ml-2 mr-2"><Icon type="arrow-right" size={'lg'}/></div> */}
    <img className="mt-3" src={require("../images/arrowdotted.png")} alt="" style={{width: "20px", height: "10px"}}/>
    <input type="text" value={"布宜诺斯艾利斯"} placeholder={"到达城市"} className="text-right"
        onClick={this.onClick.bind(this)} readOnly="true"/>
</Listview>
```

```js
<Listview text={"索要发票"}>
    <div></div>
    <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)}/>
</Listview>
```

```js
<Listview text={"支付方式"}>
    <div></div>
    <div className="pt-1">
        <RadioGroup name="payment" mode="divide"
            size="sm"
            option={['签单', '工卡', '微信']} 
            val={[0, 1, 2]} 
            id={['op1', 'op2', 'op3']}
            selected={this.state.selectedRadio}
            onChange={this.radioChange.bind(this)}>
        </RadioGroup>
    </div>
</Listview> 
```

| ![](https://i.imgur.com/WLLntbb.png) |
| ------------------------------------ |
| Listitem                             |

### Radio/Check

Two kinds of radio - divide and inline

CheckGroup has only one style now

- Radio

| 属性     | 描述                            | 默认值   | 类型                       |
| -------- | ------------------------------- | -------- | -------------------------- |
| mode     | Radio style                     | “divide” | string（"divide", "line"） |
| size     | Radio button size               | "md"     | string ("lg", "md", "sm")  |
| option   | Radio options                   | —        | []                         |
| val      | Radio value bound to the button | —        | []                         |
| id       | Optional                        | —        | []                         |
| selected | Current selected button         | —        | num                        |
| onChange | callback                        | —        | func                       |

- Check

| 属性     | 描述                                  | 默认值 | 类型    |
| -------- | ------------------------------------- | ------ | ------- |
| option   | Check option                          | —      | []      |
| val      | Check value bound to the check button | —      | []      |
| selected | Current selected button               | —      | []: num |
| onChange | callback                              | —      | func    |

| ![](https://i.imgur.com/ovPItyN.png) | ![](https://i.imgur.com/w1jKEyI.png) | ![](https://i.imgur.com/dnRdLNm.png) | ![](https://i.imgur.com/FffefaE.png) |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| divide单选按钮                       | divide按钮在listitem中               | line单选按钮                         | 多选按钮                             |

```js
import { CheckGroup, RadioGroup } from 'gsp-react;
```



```js
<RadioGroup name="payment" mode="divide"
    size="lg"
    option={['签单', '工卡', '微信']} 
    val={[0, 1, 2]} 
    id={['op1', 'op2', 'op3']}
    selected={this.state.selectedRadio}
    onChange={this.radioChange.bind(this)}>
</RadioGroup>
```

```js
<RadioGroup name="payment" mode="line"
    size="sm"
    option={['签单', '工卡', '微信']} 
    val={[0, 1, 2]} 
    id={['op1', 'op2', 'op3']}
    selected={this.state.selectedRadio}
    onChange={this.radioChange.bind(this)}>
</RadioGroup>
```

```js
<CheckGroup 
    option={['待确认', '制作中', '待结算', '已完成']}
    val={[0, 1, 2, 3]}
    selected={this.state.selectedCheckbox}
    onChange={this.checkChange.bind(this)}
/>
```



### Switch

- 建议与Listitem组件一起使用

| 属性       | 描述     | 默认值       | 类型     |
| -------- | ------ | --------- | ------ |
| checked  | 是否开启   | —         | bool   |
| onChange | 点击回调函数 | —         | func   |
| color    | 开启后的颜色 | "#4dd865" | string |
| disabled | 禁用     | false     | bool   |

| ![](https://ws1.sinaimg.cn/large/006tKfTcly1fodh0758yuj30ky02eaa5.jpg) | ![](https://ws1.sinaimg.cn/large/006tKfTcly1fodh070tfhj30q80320sz.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fodh1e9ft6j30ky02m74d.jpg) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 默认样式                                     | 自定义按钮颜色                                  | 禁用状态                                     |

```js
import { Switch } from 'gsp-react';
```



```js
<Listview text={"索要发票"}>
    <div></div>
    <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)}/>
</Listview>
<Listview text={"索要发票"}>
    <div></div>
    <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)} disabled/>
</Listview>

<Listview text={"删除购买历史"}>
    <div></div>
    <Switch checked={this.state.switchChecked} onChange={this.onSwitchChange.bind(this)} color={"#318ccf"}/>
</Listview>
```



## 断网检测

- 断网监测功能使用了[offline.js插件](http://github.hubspot.com/offline/docs/welcome/) 。
- Offline.js插件按照一定时间间隔对网络资源进行请求，以此判断设备的网络状况
- 当设备处于断网状态时，屏幕顶部弹出全局提示条对用户进行友好提示；网络恢复时，自动对网络进行重连并提示用户

使用方法

1. 在`./public` 文件夹中添加一下三个文件:（可去官网下载更多样式或者自定义）

   - offline.min.js		// 断网监测功能
   - offline-theme-chrome.css        // 提示条样式
   - offline-language-chine se-simplified.css         // 提示条语言

2. 在`./public/index.html` 文件中引入以上文件并设置定时访问的URL及检测间隔：

   ```Html
   <head>
       <link rel="stylesheet" href="./offline-language-chinese-simplified.css" />
       <link rel="stylesheet" href="./offline-theme-chrome.css" />
       <script src="./offline.min.js"></script>    
       <script>
         Offline.options = {
           game: false,
           checks: { xhr: { url: 'http://jsonplaceholder.typicode.com/posts/1/comments' } }
         }
         var run = function () {
           if (Offline.state === 'up')
             Offline.check();
         }
         setInterval(run, 10000);
       </script>
   </head>
   ```

效果展示

![](https://ws1.sinaimg.cn/large/006tNc79ly1fourmh4hnhg30ar06rq3p.gif)



## API调用操作

- 对API的操作使用fetch，导出为对象，并对基本的操作方法（GET，POST，PUT，DELETE，PATCH等）进行了简单封装
- 采用了流式数据操作方式，融入了RxJS的技术
- 对异常情况进行了简单分类(timeout， offline， error)，方便用户调用及异常信息提示

使用方法

1. 引入fetch文件

   ```js
   import { Fetch as requestObj } from 'gsp-react';
   ```

2. 初始化对象示例

   接收参数：

   - url：API url
   - options：API参数，包括需要上传的数据，数据返回的类型（"json"、"text"、"blob"）…

   ```Js
   let url = "http://jsonplaceholder.typicode.com/users";
   let options = {format: 'text'}; // options不需要进行stringify操作;可以设置返回值类型
   let FETCH = new requestObj(url, options);
   ```

3. 根据操作方法（GET，POST，PUT，DELETE，PATCH等）的不同，调用不同对象方法，并对获取的数据、产生的异常进行处理

   ```Js
   FETCH.get()  // .get()|.post()|.put()|.delete()|.patch() ...
   .subscribe(result => {
       this.setState({
           results: result
       }, () => {
           showMessage("success", "列表获取成功！"); // 操作成功提示信息
       });
   
   }, function (err) {
       if(err.status === 'timeout') {
           showMessage("info", "网络超时，请重试");  // 网络超时提示信息
       }
       if(err.status=== 'offline') {
           showToast("offline", "网络连接不可用，请检查网络设置");  // 网络断开提示信息
       }
       if(err.status=== 'error') {
           console.log(err);
           showMessage("info", "列表获取失败，请重试");  // API操作异常提示信息
       }
   })
   ```

> 网络超时时长可在`fetch.js`文件`request() `方法中设置：
>
> ```Js
> //这里使用Promise.race设置网络超时
> let abortable_promise = Promise.race([fetch_promise, abort_promise]);
> setTimeout(function () {
>     abort_fn();
> }, 5 * 1000); // 默认网络超时时长为5秒
> ```

| ![](https://ws4.sinaimg.cn/large/006tNc79ly1fours7bdsrg30ti06nn0l.gif) | ![](https://ws1.sinaimg.cn/large/006tNc79ly1fouru5gitcg30ah0inacp.gif) | ![](https://ws2.sinaimg.cn/large/006tNc79ly1fourw33zwxg30ah0il768.gif) | ![](https://ws1.sinaimg.cn/large/006tNc79ly1fourzdzjlyg30ae0ihabk.gif) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 正常获取数据并弹出提示信息                                   | 网络连接中断                                                 | 网络超时                                                     | API调用失败                                                  |



## 按需加载

为了优化打包速度及打包生成文件的大小，需要使用按需加载技术，根据实际用到的gsp-react组件，打包相应的CSS样式文件，具体步骤如下：

1. 安装插件

   ```bash
   npm install babel-plugin-import --save-dev
   ```

   

2. 将项目进行降级处理

   ```
   npm run eject
   ```

3. 暴露出的webpack配置文件（webpack.config.dev.js和webpack.config.prod.js）中添加如下插件配置，babel-loader配置器如下：

   ```Bash
   // Process JS with Babel.
     {
       test: /\.(js|jsx|mjs)$/,
       include: paths.appSrc,
       loader: require.resolve('babel-loader'),
       options: {
         plugins: [
           ['import', { libraryName: 'gsp-react', style: "css" }],
           ['import', { libraryName: 'antd', style: true }],
         ],
         // This is a feature of `babel-loader` for webpack (not Babel itself).
         // It enables caching results in ./node_modules/.cache/babel-loader/
         // directory for faster rebuilds.
         cacheDirectory: true,
       },
     },
   ```

4. 按需在页面中引入组件

   ```js
   import { Header, Footer, Container, Content, Card } from 'gsp-react';
   ```

   webpack会自动引入相应组件的CSS文件，未使用组件的样式文件不会引入。



> 注意：为了使babel-plugin-import插件能够顺利实现按需引入css文件，在进行组件文件夹命名时，需要保证组件名须与其所在文件夹相同，但大小写可以不同，如Button组件所在文件夹为/button，PullToRefresh组件文件夹为/pull-to-refresh。若将RadioGroup组件置于Radio文件夹，则加载出错。



## 发布至npm

- 将`~/package.json` 的`babel` 配置项修改为如下所示(presets处)

  ```json
  "babel": {
      "presets": [
        "react",
        "es2015"
      ],
      "plugins": [
        "transform-object-rest-spread",
        "transform-class-properties"
      ]
    },
  ```

- 将修改后的待发版组件文件夹` ~/src/components` 内所有文件拷贝至`~/es6es5` 文件夹下

  | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fp38kwsp14j30eg0ti0ue.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fp38lpyhxkj30eo0tiwg4.jpg) |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | ` ~/src/components`                                          | `~/es6es5`                                                   |

- 在根目录执行命令

  ```Bash
  babel es6es5 -d es6es5
  ```

  此时`~/es6es5` 文件夹内的所有js文件被转码为ES5语法，css及其他文件不受影响。

- 拷贝`~/es6es5` 内所有文件至`~/publish/lib` 

  | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fp38lpyhxkj30eo0tiwg4.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fp38kwkwsfj30e20umq4l.jpg) |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | `~/es6es5`                                                   | `~/publish/lib`                                              |

- 在`~/publish` 目录执行命令

  ```Shell
  npm adduser //只在第一次发布时执行
  
  npm publish
  ```

  > 注意：
  >
  > 1、需要先在npm官网注册账号；
  >
  > 2、每次发布新版本需要修改publish文件夹下package.json中的version。
  >
  > 3、若使用了其他npm源（如taobao的registry），需切换至默认的npm源。推荐使用nrm进行源管理。
