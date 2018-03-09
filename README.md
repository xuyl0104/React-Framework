# React组件使用说明
[![Build Status](https://travis-ci.org/xuyl0104/React-Framework.svg?branch=master)](https://travis-ci.org/xuyl0104/React-Framework)

- [React framework使用说明](#react-framework%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)
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
        - [Picker](#picker)
        - [Refresh/Loadmore](#refreshloadmore)
        - [Tab](#tab)
        - [Listitem](#listitem)
        - [Radio/Check](#radiocheck)
        - [Switch](#switch)
    - [断网检测](#%E6%96%AD%E7%BD%91%E6%A3%80%E6%B5%8B)
    - [API调用操作](#api%E8%B0%83%E7%94%A8%E6%93%8D%E4%BD%9C)
    - [发布至npm](#%E5%8F%91%E5%B8%83%E8%87%B3npm)

[TOC]

## Install and start

👉 [组件包Demo](http://45.63.37.8:8080/) http://45.63.37.8:8080/

- 安装组件包

```
npm install gsp-react --save
```

- 组件包演示程序

```
git clone https://github.com/xuyl0104/React-Framework.git
npm install
npm start
http://localhost:3000
```

## Layout

页面布局基于Bootstrap v4，采用`Flex`布局排版技术。

### Container

- Container组件设定了flex排列方式。

  ```js
  <div className="w-100 d-flex flex-column" style={{height: '100vh'}}>
      {this.renderChildren(this.props)}
  </div>
  ```


- Container组件需要包裹页面中的其他元素（当使用页面切换效果组件PageTransition时，Container须位于切换组件内部）。

### Content

Content组件包裹页面中主体内容部分（即Header、Footer之外的部分）。

| 属性    | 描述     | 默认值                                      | 类型   |
| ------- | -------- | ------------------------------------------- | ------ |
| padding | 内边距   | [0, 0, 0, 0] （[top, right, bottom, left]） | []     |
| bgColor | 背景颜色 | '#f8f9fa'                                   | string |

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

详情请在演示程序中点击进入PageTemplate页面查看。



## Components

### PageTransition

- PageTransition页面切换过渡动画需要与第三方组件[react-router-page-transition](https://github.com/trungdq88/react-router-page-transition)结合使用

  ```
  npm install react-router-page-transition --save
  ```


- 页面切换实现步骤

  1. 添加react-router-page-transition到`Router`，设定`timeout`、`location`；须使用`React-router-dom`中的`Switch`组件。

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

  2. 编写动画切换效果

     见`CSS/transition-main.css`  （list-page、detail-page等类名可以自定义）

     第一个页面`ComponentList`设定为`list-page` ，之后的页面设定为`detail-page`。

  3. 每个页面添加我们编写的PageTransition组件

     设定PageTransition的`transitionClass`和`direction`属性

     ```javascript
     <PageTransition transitionClass={"detail-page"} direction={this.state.className}>
         <Container>
             <Header name="PageTransition" 
                 onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
             </Header>
             <Content>
                 <Row>
                     <Button style={"primary"} size="lg" text={"点击测试翻页效果"} col={12} onClick={this.goToSeeDetails.bind(this)} />
                 </Row>
             </Content>
         </Container>
     </PageTransition>
     ```

     > | 属性            | 描述            | 默认值 | 类型   |
     > | --------------- | --------------- | ------ | ------ |
     > | transitionClass | 本页面的CSS类名 | —      | string |
     > | direction       | 动画方向        | ""     | string |

  4. 编写React生命周期函数，实现动画方向的正确设定

     假如有四个界面A、B、C、D

     A <—> B <—> C <—>D

     B、C作为中间界面，需要编写生命周期函数进行方向调整：

     ```javascript
     /**
      * 该方法用于中间页面中（如A->B->C->D 时，用于B,C页面），用于判断中间页面的appear动画方向
      * 当该中间页面是因为路由POP操作出现，则执行detail-page-reverse的appear；
      * 否则（被PUSH进路由history），执行detail-page的appear。
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
      * 根据当前页面的路由动作，设定当前页面执行的leave动画方向
      * POP：detail-page的leave方向
      * REPLACE：detail-page的leave方向
      * PUSH：detail-page-reverse的leave方向
      * @param {*} nextProps 
      */
     componentWillReceiveProps(nextProps) {
         // 后退的时候，直接pop最上面的page
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
             // 跳转新页面的时候，push
             this.setState({
                 className: "-reverse"
             });
         }
     }
     ```

     ![](https://ws3.sinaimg.cn/large/006tKfTcly1fochd6f2rjg309h0go7gk.gif)

### Header

- Header组件包含左侧返回按钮、中间标题、右侧按钮
- Header组件根据右侧按钮的种类，分为右侧无按钮、右侧一个按钮、右侧多个按钮
- 可以根据实际需要，在Header内部嵌套不同图标，实现不同功能。该方法易于对不同图标设定相应的调用方法

| 属性             | 描述             | 默认值 | 类型       |
| ---------------- | ---------------- | ------ | ---------- |
| name             | 标题             | —      | string     |
| onLeftArrowClick | 返回按钮调用方法 | —      | func       |
| 内部child元素    | 内嵌元素         | —      | React elem |

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

| ![](https://ws4.sinaimg.cn/large/006tKfTcly1fochic1y34j30lq0d20tm.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochibtjf5j30lq0cudgr.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1forbgevm9oj30lk0cy0tl.jpg) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|                          右侧无按钮                          |                         右侧一个按钮                         |                         右侧若干按钮                         |

### Footer

- Footer组件可以包含不同数量的按钮。用户可设定footer的按钮数量为1、2、3…（建议不超过3）
- 每个按钮显示的文字、调用的方法、按钮的样式均可以自由设定
- 提供了两种高度的footer供用户选择

| 属性                      | 描述             | 默认值 | 类型                |
| ------------------------- | ---------------- | ------ | ------------------- |
| buttonName                | 按钮名称数组     | —      | []: string          |
| callBackFooterButtonClick | 按钮调用方法数组 | —      | []: func            |
| style                     | 按钮样式数组     | —      | []: object          |
| size                      | 按钮高度         | "lg"   | string ("lg", "sm") |

```js
import { Footer } from 'gsp-react';
```

```Js
<Footer size="sm"
    style={[{'color': 'white', 'backgroundColor': '#318ccf'}]}
    buttonName={["下单"]}
    callBackFooterButtonClick={[
        this.callBackFooter0]}>
</Footer>
```

```javascript
<Footer size="lg"
    style={[{'color': '#318ccf', 'backgroundColor': '#ffffff'}, 
            {'color': 'white', 'backgroundColor': '#318ccf'},
            {'color': '#318ccf', 'backgroundColor': '#ffffff'}]}
    buttonName={["取消", "删除", "确定"]}
    callBackFooterButtonClick={[
        this.callBackFooter0, 
        this.callBackFooter1,
        this.callBackFooter2
        ]}>
</Footer>
```

| ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochnr6iuoj30mo04w74a.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fochnr286wj30mc042t8s.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochnqx9j6j30ly03ujrk.jpg) |
| :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
| ![](https://ws4.sinaimg.cn/large/006tKfTcly1fochnqq5a2j30mm03iq2w.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fochnqhc9yj30me03smx7.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochnqcwwkj30m203gjri.jpg) |
|               一个按钮(lg, sm)               |               两个按钮(lg, sm)               |               三个按钮(lg, sm)               |

### Button

Button组件根据Bootstrap v4的[Button](https://getbootstrap.com/docs/4.0/components/buttons/)进行封装。

| 属性     | 描述                | 默认值    | 类型                                                         |
| -------- | ------------------- | --------- | ------------------------------------------------------------ |
| bstyle   | 按钮样式            | "primary" | string ("primary", "secondary", "success", "danger", "warning", "info", "light", "dark") |
| size     | 按钮大小            | "lg"      | string ("lg", "sm")                                          |
| text     | 按钮文字            | —         | string                                                       |
| col      | 按钮所占col         | —         | num (12, 6, 4, 3)                                            |
| onClick  | 调用方法            |           | func                                                         |
| newStyle | style={"new"}时设定 | —         | object，例如 {color: 'white', backgroundColor: '#318ccf'}    |

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

![](https://ws3.sinaimg.cn/large/006tKfTcly1fochqrd7g4j30lw0i0my5.jpg) 

### Input

| 属性          | 描述                         | 默认值 | 类型                     |
| ------------- | ---------------------------- | ------ | ------------------------ |
| label         | 左侧描述性label信息          | —      | string                   |
| text          | 输入框内的内容               | —      | string                   |
| placeholder   | placeholder                  | —      | string                   |
| align         | 对其方式                     | "left" | string ("left", "right") |
| clear         | 是否带有清空按钮             | —      | bool                     |
| onChange      | 输入时调用的方法             | —      | func                     |
| 内部child组件 | 嵌套的内部组件               | —      | React elem               |
| name          | 绑定数据表中的名为name的字段 | —      | string                   |

> ==name属性需与数据表中的数据属性对应==  📌

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



![](https://ws3.sinaimg.cn/large/006tNc79ly1fotw3r7atdj30le0f6jt8.jpg) 

### Message

消息提示Message组件完全基于`antd`的`Message`组件和`antd-mobile`的`Toast`组件，将Message和Toast的调用进行了简单的封装，导出为 `showMessage`和`showToast`两个方法，易于调用。

- Message

|     属性 | 描述                                      | 默认值 | 类型                                   |
| -------: | ----------------------------------------- | ------ | -------------------------------------- |
|     type | Message的类型                             | —      | String（success, fail, info, warning） |
|     text | Message内容                               | —      | String                                 |
| duration | Message显示时长（秒）                     | 2      | num                                    |
| position | Message显示在屏幕的位置（距顶部的像素数） | 70     | num                                    |

- Toast

| 属性     | 描述          | 默认值 | 类型                                     |
| -------- | ------------- | ------ | ---------------------------------------- |
| type     | Toast的类型   | —      | String（success, fail, offline,loading） |
| text     | Toast的内容   | —      | String                                   |
| duration | Toast显示时长 | 2      | num                                      |

```javascript
import { showMessage } from "gsp-react";
import { showToast } from 'gsp-react';

<Button style={"primary"} size="lg" text="info" col={12} onClick={() => showMessage("info", "这是一条消息", 2)}/>

<Button style={"primary"} size="lg" text={"success"} col={6} onClick={() => showToast("success", "加载成功")}/>


```

### Modal

Modal组件是弹出的对话框及输入框，基于`antd-mobile`的`Modal`组件开发，导出为`showModal`方法。

| 属性           | 描述                             | 默认值  | 类型                         |
| ------------ | ------------------------------ | ---- | -------------------------- |
| mode         | Modal类型                        | —    | string （"alert", "prompt"） |
| title        | 标题                             | —    | string                     |
| message      | 提示信息                           | —    | string                     |
| actionArr    | 按钮文字及绑定的方法                     | —    | []:  {text, onPress}       |
| option       | mode为"prompt"时可以设置，用于设置输入框的默认值 | —    | string （"default"）         |
| defaultValue | mode为"prompt"时可以设置，输入框的默认值     | —    | string                     |

```javascript
import { showModal } from 'gsp-react';
```

```javascript
<Button style={"primary"} size="lg" text="普通提示框" col={12} 
    onClick={
        () => {showModal("alert", 
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
        () => {showModal("prompt", 
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
        () => {showModal("prompt", 
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

| ![](https://ws2.sinaimg.cn/large/006tKfTcly1foci8opa6aj30hw0a0dgd.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1foci8oja8yj30hw0foq3m.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1foci8odxfgj30hq0cq0tg.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1foci8o5fekj30i60ciq3r.jpg) |
| :--------------------------------------: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
|                 两个按钮的提示框                 |                 多个按钮的提示框                 |                  普通输入框                   |                 带默认值的输入框                 |

### Card

Card组件用于设计页面中的卡片元素以更好地展示内容。

Card组件基于Bootstrap v4的[Media-object](https://getbootstrap.com/docs/4.0/layout/media-object/) 设计，可以制作美观的卡片header部分，并在下方嵌套所需的其他组件。

| 属性          | 描述                     | 默认值 | 类型                         |
| ------------- | ------------------------ | ------ | ---------------------------- |
| avatar        | 头像                     | —      | `<img>`                      |
| position      | header在Card中的位置     | "top"  | string （"top", "bottom"）   |
| title         | header标题               | —      | string                       |
| text          | Header内容               | —      | String                       |
| onClick       | 点击卡片的调用方法       | —      | func                         |
| 内部child组件 | 卡片header下方的其他内容 | —      | React elem                   |
| topRight      | header右上方显示内容     | —      | React elem                   |
| bottomRight   | header右下方显示的内容   | —      | React elem                   |
| middleLeft    | header中间行左侧的内容   | —      | React elem                   |
| middleRight   | header中间行右侧的内容   | —      | React elem                   |
| width         | 卡片所占的宽度           | “100%” | string                       |
| padding       | 卡片内边距               | "8px"  | string （"6px 5px 6px 5px"） |
| margin        | 卡片外边距               | "0"    | string （"6px 5px 6px 5px"） |

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



| ![](https://ws2.sinaimg.cn/large/006tKfTcly1focifk4xcbj30ky0b2n33.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1focifjo6sqj30l00d8tb7.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1focifjedd4j30l209qwfl.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1focifj4u0gj30l20j8n6g.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fornzuypa4j30m40l67c4.jpg) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | ------------------------------------------------------------ |
|                           餐厅卡片                           |                          仿微信卡片                          |                         机票申请卡片                         |                           复杂卡片                           | 仿Medium卡片                                                 |
| ![](https://ws1.sinaimg.cn/large/006tKfTcly1fordx6qenij30l80io1bu.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1forj5a2qjnj30qm08wq9r.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1forhsw3xbtj30lg06amyb.jpg) | ![](https://ws1.sinaimg.cn/large/006tKfTcly1forj8vfiycj30lc06swf7.jpg) | ![](https://ws3.sinaimg.cn/large/006tNc79ly1fotnn8bsauj30lk0fkgq7.jpg) |
|                        仿YouTube卡片1                        |                        仿YouTube卡片2                        |                         仿Gmail卡片                          |                          无头像卡片                          | 卡片width不为100%（可横向滑动）                              |

### Picker

目前只有时间选择器。

时间选择器基于`react-mobile-datepicker` 开发，可以对YYYY、MM、DD、hh、mm进行选择。（计划在未来使用antd-mobile的时间选择器）

| 属性         | 描述              | 默认值       | 类型                                    |
| ---------- | --------------- | --------- | ------------------------------------- |
| value      | 时间控件的值          | —         | object: Date()                        |
| isOpen     | 是否显示选择器         | false     | bool                                  |
| onSelect   | 点击“完成”调用的方法     | —         | func                                  |
| onCancel   | 点击“取消”调用的方法     | —         | Func                                  |
| dateFormat | 时间格式            | —         | []: string                            |
| showFormat | 显示在选择器上方的事件字符样式 | —         | string                                |
| theme      | 样式主题            | "android" | string ("android", "ios")，推荐"android" |
| min        | 最小时间            | —         | object: Date()                        |

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



### Spin

加载数据时显示的等待动画，目前只有三种样式。

| 属性       | 描述     | 默认值    | 类型                   |
| ---------- | -------- | --------- | ---------------------- |
| isSpinning | 是否显示 | —         | boolean                |
| indicator  | 样式图案 | "a"       | string ("a", "b", "c") |
| size       | 图案大小 | 30        | num                    |
| color      | 图案颜色 | “#318ccf” | string                 |

```js
import { Spin } from 'gsp-react';

...
<Spin isSpinning={this.state.isSpinning} indicator="a" size={40} color={"red"}/>
```

| ![](https://ws3.sinaimg.cn/large/006tNc79ly1fp6nf0uanyg30al0iqdh4.gif) | ![](https://ws3.sinaimg.cn/large/006tNc79ly1fp6nf0nh23g30am0iq75j.gif) | ![](https://ws3.sinaimg.cn/large/006tNc79ly1fp6nf0uanyg30al0iqdh4.gif) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 样式a                                                        | 样式b                                                        | 样式c                                                        |

### Refresh/Loadmore

**下拉刷新**组件只是对antd-mobile的[PullToRefresh](https://mobile.ant.design/components/pull-to-refresh-cn/)进行了简单的封装，调用过程相对简单。

如需在刷新时显示旋转加载动画，可以引入`<Spin />`组件。

![](https://ws4.sinaimg.cn/large/006tNc79ly1fotyb0fzw1g30aq0iwx6s.gif)

```js
import { PullRefresh } from 'gsp-react';
import { Spin } from 'gsp-react';
```

```js
this.state = {
    results: [],
    isRefreshing: false,
    isLoading: false,
    timesOfLoad: 0,
    hasMore: true, // 是否继续上划加载
    height: document.documentElement.clientHeight,
    isSpinning: true
};
```



```js
<Spin isSpinning={this.state.isSpinning} indicator="a" size={40} />
    <PullRefresh 
        distanceToRefresh={80}
        indicator={{ activate: '松开刷新', deactivate: '继续下拉刷新', finish: '刷新完成' }}
        refreshing={false} 
        onRefresh={this.refresh.bind(this)}
    >
        {listDiv}
    </PullRefresh>
</Spin>

refresh() {
    let url = "http://jsonplaceholder.typicode.com/users";
    let self = this;
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
```

| 属性              | 描述                                                  | 默认值                                                       | 类型       |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ---------- |
| ~~style~~         | （~~目前没搞明白原理…）可以控制`<Spin />`的显示位置~~ | —                                                            | ~~object~~ |
| distanceToRefresh | 激活刷新的的拉动距离                                  | 80                                                           | num        |
| indicator         | 组件不同状态时的提示文字                              | { activate: '松开立即刷新', deactivate: '下拉可以刷新', finish: '完成刷新' } | object     |
| refreshing        | （不建议修改该属性）是否显示刷新状态                  | false                                                        | bool       |
| onRefresh         | 必选，刷新回调函数                                    | —                                                            | func       |
| 内部child组件     | 调用下拉刷新的长列表                                  | —                                                            | React elem |

**上滑加载**功能因为需要调用React自身的生命周期函数，所以尚未封装为独立的组件。（antd-mobile中的上划加载功能因为强制使用其List组件，且调用不便，所以目前未采用）

实现步骤：

1. 为页面添加`ref` ，这里起名为contentNode

   ```js
    //此处的className=content的div具有属性 overflow-y: scroll，必须添加，否则无法触发loadMore方法
   <div className="content" ref={ node => this.contentNode = node }> 
       <Spin spinning={this.state.isSpinning} tip={"加载中"} delay={500} size="large">		
           <PullRefresh 
               style={{
                   height: this.state.height - 56,
               }}
               distanceToRefresh={80}
               // indicator={{ activate: '松开刷新', deactivate: '继续下拉刷新', finish: '刷新完成' }}
               refreshing={this.state.isRefreshing} 
               onRefresh={this.refresh.bind(this)}
           >
               {listDiv}

               {/* 下方组件为列表底部提示性信息：列表还有内容时，显示"正在加载"；列表无更多内容时，显示"—— 已无更多 ——" */}
               {<div className="text-center" 
                   style={{backgroundColor: '#ededed', color: '#808080', fontSize: '14px', height: '45px', 
                       verticalAlign: 'middle', paddingTop: '10px'}}>
                   {this.state.hasMore ? <div><Icon type="loading" />  正在加载</div> : "———— 已无更多 ————"}
               </div>}
           </PullRefresh>
       </Spin>
   </div>
   ```

2. 挂载scroll监听方法至`contentNode`上，该过程可以在componentDidMount()声明函数上执行

   ```js
   /**
    * 1. 挂载scroll监听方法至contentNode上
    * 该contentNode为scrollable的实体dom
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

3. scroll监听方法，滚动至底部时，自动加载loadMore()方法—>更新state中的数据—>更新dom

   ```js
   /**
    * 2. scroll监听方法，滚动至底部时，在自动加载更多数据的方法-->更新state中的数据-->更新dom
    * @param {*} event 
    */
   onScrollHandle(event) {
       const clientHeight = event.target.clientHeight; // 屏幕高度
       const scrollHeight = event.target.scrollHeight; // 总的内容高度
       const scrollTop = event.target.scrollTop; // 已经滑动的距离
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
   ```

4. 卸载scroll监听方法

   ```js
   componentWillUnmount() {
       if (this.contentNode) {
           this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
       }
   }

   ```



### Tab

- Tab数量可以设定（2 <= n <= 5）
- Tab样式可以设定（激活和未激活Tab的字体，背景色等）
- 当前Tab下方横线样式可以设定（粗细、样式、颜色等）

| 属性           | 描述                    | 默认值                                           | 类型       |
| -------------- | ----------------------- | ------------------------------------------------ | ---------- |
| tabs           | tab标签文字数组         | —                                                | []: string |
| selected       | 当前被选中tab           | 0                                                | num        |
| callBack       | 点击tab的回调方法       | —                                                | func       |
| activeStyle    | 激活状态tab样式         | {color: '#318ccf', backgroundColor: '#ffffff'}   | {}         |
| inactiveStyle  | 未激活状态tab样式       | {color: '#000000', backgroundColor: '#ffffff'}   | {}         |
| indicatorStyle | 激活状态tab下方横线样式 | {color: '#318ccf', style: 'solid', width: '2px'} | {}         |

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

| ![](https://ws2.sinaimg.cn/large/006tNc79ly1foy8eyf1laj30lg0d40tc.jpg) | ![](https://ws1.sinaimg.cn/large/006tNc79ly1foy8ey7wnoj30la0d0js0.jpg) | ![](https://ws3.sinaimg.cn/large/006tNc79ly1foy8exzs9tj30le0cywf5.jpg) | ![](https://ws3.sinaimg.cn/large/006tNc79ly1foy8extosrj30lg0d63z7.jpg) | ![](https://ws3.sinaimg.cn/large/006tNc79ly1foy8exlpynj30la0d0aam.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 2个tab                                                       | 3个tab                                                       | 4个tab                                                       | 5个tab                                                       | 样式修改                                                     |

TODO：

- 高度自定义
- 动画切换效果



### Listitem

- Listitem组件方便用户在页面上进行信息设定。


- 左侧为提示性信息，右侧根据用户需要可以嵌套不同数量、不同种类的元素(`Icon`，`image`， `Input`， `label`，`Switch`，`Button`等)；
- 右侧部分应用了Bootstrap v4定位，根据元素数量自动定位 👉[here](https://getbootstrap.com/docs/4.0/utilities/flex/#justify-content)
- Trick：右侧只有一个元素而又想帖靠在右侧时，可以添加一个空的`div`进行占位（此时右侧实际包含两个元素，详见“索要发票”示例）(很矬，待改进)

| 右侧元素数量 | 右侧分布情况                       |
| ------------ | ---------------------------------- |
| 1            | A                                  |
| 2            | A —————————————————————————————  B |
| 3            | A——————————————B———————————————C   |
| 4            | A————————B————————— C ———————————D |

| 属性          | 描述           | 默认值 | 类型       |
| ------------- | -------------- | ------ | ---------- |
| text          | 左侧描述性信息 | —      | string     |
| 内部child组件 | 右侧元素       | —      | React elem |

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

| ![](https://ws1.sinaimg.cn/large/006tKfTcly1focijwpf9tj30ky02oq30.jpg) | ![](https://ws1.sinaimg.cn/large/006tKfTcly1focijwko5gj30l002qq34.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1focijwf5pbj30l202g0sv.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1focijw9nmjj30l202mwen.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1focijx18h1j30kw02idfx.jpg) | ![](https://ws1.sinaimg.cn/large/006tKfTcly1focijwxcitj30l002mq32.jpg) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| 时间                                       | 所在单位                                     | 起止时间                                     | 城市区间                                     | 索要发票                                     | 支付方式                                     |

### Radio/Check

单选按钮分为divide型和line型两种；

Checkbox目前有一种样式（之后可能会扩展）。

- Radio

| 属性       | 描述                      | 默认值      | 类型                        |
| -------- | ----------------------- | -------- | ------------------------- |
| mode     | Radio样式                 | “divide” | string（"divide", "line"）  |
| size     | Radio按钮大小               | "md"     | string ("lg", "md", "sm") |
| option   | Radio选项                 | —        | []                        |
| val      | Radio按钮的值               | —        | []                        |
| id       | （可选）按钮的ID，在传统Radio中需要设置 | —        | []                        |
| selected | 当前选中项                   | —        | num                       |
| onChange | 点击调用的方法                 | —        | func                      |

- Check

| 属性       | 描述        | 默认值  | 类型      |
| -------- | --------- | ---- | ------- |
| option   | Check选项   | —    | []      |
| val      | Check按钮的值 | —    | []      |
| selected | 当前选中项     | —    | []: num |
| onChange | 点击调用方法    | —    | func    |

| ![](https://ws1.sinaimg.cn/large/006tKfTcly1fodglix6jij30kw0agjs4.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fodglj4cy4j30l202kjrj.jpg) | ![](https://ws1.sinaimg.cn/large/006tKfTcly1fodglj9eu0j30l007k0sv.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fodgljgpjsj30l209ywey.jpg) |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| divide单选按钮                               | divide按钮在listitem中                       | line单选按钮                                 | 多选按钮                                     |

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