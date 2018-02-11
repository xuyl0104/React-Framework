# React framework使用说明

[TOC]

## Install and start

```
git clone https://github.com/xuyl0104/test-bootstrap.git
npm install
npm start
http://localhost:3000
```

## Layout

页面布局基于Bootstrap v4，采用Flex布局排版技术。

### Container

- Container组件设定了flex排列方式。


- Container组件需要包裹页面中的其他元素（当使用页面切换效果组件PageTransition时，Container须位于切换组件内部）。

### Content

Content组件包裹页面中主体内容部分（即Header、Footer之外的部分）。

| 属性      | 描述   | 默认值          | 类型     |
| ------- | ---- | ------------ | ------ |
| padding | 内边距  | [0, 0, 0, 0] | []     |
| bgColor | 背景颜色 | '#f8f9fa'    | string |

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

## Components

### PageTransition

- PageTransition需要与第三方组件[react-router-page-transition](https://github.com/trungdq88/react-router-page-transition)结合使用

  ```
  npm install react-router-page-transition --save
  ```


- 页面切换实现步骤

  1. 添加react-router-page-transition到router，设定timeout、location；须使用React-router-dom中的Switch组件。

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

     | 属性              | 描述        | 默认值  | 类型     |
     | --------------- | --------- | ---- | ------ |
     | transitionClass | 本页面的CSS属性 | —    | string |
     | direction       | 动画方向      | ""   | string |

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

```javascript
<Header name="Header" onLeftArrowClick={this.onLeftArrowClick.bind(this)}>
    <img src={require("../images/add.png")} width="25" 
        alt="" className="pull-right"
        onClick={this.props.onLeftArrowClick}></img>
</Header>
```

| 属性               | 描述       | 默认值  | 类型         |
| ---------------- | -------- | ---- | ---------- |
| name             | 标题       | —    | string     |
| onLeftArrowClick | 返回按钮调用方法 | —    | func       |
| 内部child元素        | 内嵌元素     | —    | React elem |

| ![](https://ws4.sinaimg.cn/large/006tKfTcly1fochic1y34j30lq0d20tm.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochibtjf5j30lq0cudgr.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochibkgjej30lo0d2gmj.jpg) |
| :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
|                  右侧无按钮                   |                  右侧一个按钮                  |                  右侧若干按钮                  |

### Footer

Footer组件可以包含不同数量的按钮

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

| 属性                        | 描述       | 默认值  | 类型                  |
| ------------------------- | -------- | ---- | ------------------- |
| buttonName                | 按钮名称数组   | —    | []: string          |
| callBackFooterButtonClick | 按钮调用方法数组 | —    | []: func            |
| style                     | 按钮样式数组   | —    | []: object          |
| size                      | 按钮高度     | "lg" | string ("lg", "sm") |

| ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochnr6iuoj30mo04w74a.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fochnr286wj30mc042t8s.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochnqx9j6j30ly03ujrk.jpg) |
| :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
| ![](https://ws4.sinaimg.cn/large/006tKfTcly1fochnqq5a2j30mm03iq2w.jpg) | ![](https://ws3.sinaimg.cn/large/006tKfTcly1fochnqhc9yj30me03smx7.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1fochnqcwwkj30m203gjri.jpg) |
|               一个按钮(lg, sm)               |               两个按钮(lg, sm)               |               三个按钮(lg, sm)               |

### Button

Button组件根据Bootstrap v4的[Button](https://getbootstrap.com/docs/4.0/components/buttons/)进行封装。

| 属性       | 描述               | 默认值       | 类型                                       |
| -------- | ---------------- | --------- | ---------------------------------------- |
| style    | 按钮样式             | "primary" | string (primary,  secondary, success, danger, warning, info, light, dark) |
| size     | 按钮大小             | "lg"      | string ("lg", "sm")                      |
| text     | 按钮文字             | —         | string                                   |
| col      | 按钮所占col          | —         | num (12, 6, 4, 3)                        |
| onClick  | 调用方法             |           | func                                     |
| newStyle | style={"new"}时设定 | —         | object，例如 {color: 'white', backgroundColor: '#318ccf'} |

```js
<Button style={"primary"} size="lg" text={"col-12"} col={12} onClick={this.buttonClick.bind(this)} />
<Button style={"primary"} size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)} />
<Button style={"default"} size="lg" text={"col-6"} col={6} onClick={this.buttonClick.bind(this)}/>
<Button style={"success"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
<Button style={"warning"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)} />
<Button style={"danger"} size="" text={"col-4"} col={4} onClick={this.buttonClick.bind(this)}/>
<Button style={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button style={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button style={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button style={"primary"} size="sm" text="col-3" col={3} onClick={this.buttonClick.bind(this)} />
<Button style={"new"} newStyle={{color: 'white', backgroundColor: '#318ccf'}} size="sm" text="自定义" col={12} onClick={this.buttonClick.bind(this)} />

```

![](https://ws3.sinaimg.cn/large/006tKfTcly1fochqrd7g4j30lw0i0my5.jpg) 

### Input

| 属性          | 描述           | 默认值    | 类型                       |
| ----------- | ------------ | ------ | ------------------------ |
| label       | 左侧描述性label信息 | —      | string                   |
| text        | 输入框内的内容      | —      | string                   |
| placeholder | placeholder  | —      | string                   |
| align       | 对其方式         | "left" | string ("left", "right") |
| clear       | 是否带有清空按钮     | —      | bool                     |
| onChange    | 输入时调用的方法     | —      | func                     |
| 内部child组件   | 嵌套的内部组件      | —      | React elem               |

```js
<Input label={"左对齐带清空"} text={this.state.text} onChange={this.onTextChange} placeholder={"姓		名"} align={"left"} clear={true} />
<Input label={"上级审批人"} text={this.state.text} onChange={this.onTextChange} placeholder={"上级审	批人姓名"} align={"left"} />
<Input label={"左对齐带图标"} text={this.state.text} onChange={this.onTextChange} placeholder={"审批	意见"} align={"left"} img={<Icon type="calendar" />}/>
<Input label={"右对齐带清空"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请	输入金额"} align={"right"} clear={true}/>
<Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入	金额"} align={"right"} img={<Icon type="right" />}/>
<Input label={"交易金额"} text={this.state.text2} onChange={this.onTextChange2} placeholder={"请输入	金额"} align={"right"} img={<Icon type="pay-circle-o" />}/>
```

![](https://ws1.sinaimg.cn/large/006tKfTcly1foci5gzil5j30lu0futah.jpg) 

### Message

消息提示Message组件完全移植自`antd`的`Message`组件和`antd-mobile`的`Toast`组件，将Message和Toast的调用进行了简单的封装，导出为 `showMessage`和`showToast`两个方法，易于调用。

| 属性       | 描述                       | 默认值  | 类型                                   |
| -------- | ------------------------ | ---- | ------------------------------------ |
| type     | Message的类型               | —    | String（success, fail, info, warning） |
| text     | Message内容                | —    | String                               |
| duration | Message显示时长（秒）           | 2    | num                                  |
| position | Message显示在屏幕的位置（距顶部的像素数） | 70   | num                                  |

| 属性       | 描述        | 默认值  | 类型                                     |
| -------- | --------- | ---- | -------------------------------------- |
| type     | Toast的类型  | —    | String（success, fail, offline,loading） |
| text     | Toast的内容  | —    | String                                 |
| duration | Toast显示时长 | 2    | num                                    |

```javascript
import showMessage from "../Utils/showMessage";
import showToast from '../Utils/showToast';

<Button style={"primary"} size="lg" text="info" col={12} onClick={() => showMessage("info", "这是一条消息", 2)}/>

<Button style={"primary"} size="lg" text={"success"} col={6} onClick={() => showToast("success", "加载成功")}/>


```

### Modal

Modal组件是弹出的对话框及输入框，移植自`antd-mobile`的`Modal`组件，导出为`showModals`方法。

| 属性           | 描述                             | 默认值  | 类型                         |
| ------------ | ------------------------------ | ---- | -------------------------- |
| mode         | Modal类型                        | —    | string （"alert", "prompt"） |
| title        | 标题                             | —    | string                     |
| message      | 提示信息                           | —    | string                     |
| actionArr    | 按钮文字及绑定的方法                     | —    | []:  {text, onPress}       |
| option       | mode为"prompt"时可以设置，用于设置输入框的默认值 | —    | string （"default"）         |
| defaultValue | mode为"prompt"时可以设置，输入框的默认值     | —    | string                     |

```javascript
import showModal from '../Utils/showModals';
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

| 属性             | 描述              | 默认值     | 类型         |
| -------------- | --------------- | ------- | ---------- |
| avatar         | 头像              | —       | <img>      |
| avatarPosition | 头像在在左侧的位置       | "start" | string     |
| title          | 标题              | —       | string     |
| text           | 标题下方文字          | —       | String     |
| onClick        | 点击卡片的调用方法       | —       | func       |
| 内部child组件      | 卡片header下方的其他内容 | —       | React elem |
| topRight       | header右上方显示内容   | —       | React elem |
| bottomRight    | header右下方显示的内容  | —       | React elem |

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

| ![](https://ws2.sinaimg.cn/large/006tKfTcly1focifk4xcbj30ky0b2n33.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1focifjo6sqj30l00d8tb7.jpg) | ![](https://ws4.sinaimg.cn/large/006tKfTcly1focifjedd4j30l209qwfl.jpg) | ![](https://ws2.sinaimg.cn/large/006tKfTcly1focifj4u0gj30l20j8n6g.jpg) |
| :--------------------------------------: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
|                   餐厅卡片                   |                  仿微信卡片                   |                  机票申请卡片                  |                   复杂卡片                   |

### Picker

目前只有时间选择器。

时间选择器基于`react-mobile-datepicker` 开发，可以对YYYY、MM、DD、hh、mm进行选择。

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
    <label onClick={this.handleClick3.bind(this)}>{this.state.timestring3}			</label>
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

### Refresh/Loadmore

**下拉刷新**组件知识对antd-mobile的PullToRefresh进行了简单的封装，调用过程相对简单。

如需在刷新时显示旋转加载动画，可以引入<Spin />组件并包裹在外层。

![](https://ws4.sinaimg.cn/large/006tKfTcly1focmzm3f4eg309i0goe85.gif)

```js
import PullRefresh from '../components/pullToRefresh/PullToRefresh';
import Spin from 'antd/lib/spin';
```

```js
<Spin spinning={this.state.isSpinning} tip={"加载中"} delay={500} size="large">
    <PullRefresh 
        style={{
            height: this.state.height - 56,
        }}
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
            isSpinning: false
        });
    }, function (err) {
        if(err.status === 'timeout') {
            showMessage("info", "网络超时，请重试");
        }
        if(err.status=== 'offline') {
            showToast("offline", "网络连接不可用，请检查网络设置");
        }
        if(err.status=== 'error') {
            showMessage("info", "列表获取失败，请重试");
        }
    })
}
```

| 属性                | 描述                           | 默认值                                      | 类型         |
| ----------------- | ---------------------------- | ---------------------------------------- | ---------- |
| style             | （目前没搞明白原理…）可以控制<Spin />的显示位置 | —                                        | objec      |
| distanceToRefresh | 激活刷新的的拉动距离                   | 80                                       | num        |
| indicator         | 组件不同状态时的提示文字                 | { activate: '松开立即刷新', deactivate: '下拉可以刷新', finish: '完成刷新' } | object     |
| refreshing        | （不建议修改该属性）是否显示刷新状态           | false                                    | bool       |
| onRefresh         | 必选，刷新回调函数                    | —                                        | func       |
| 内部child组件         | 调用下拉刷新的长列表                   | —                                        | React elem |

**上滑加载**功能因为需要调用React自身的生命周期函数，所以尚未封装为独立的组件。（antd-mobile中的上划加载功能因为强制使用其List组件，且调用不便，所以目前未采用）

实现步骤：

1. 为页面添加ref

   ```js
   <div className="content" ref={ node => this.contentNode = node }>
     <Spin spinning={this.state.isSpinning} tip={"加载中"} delay={500} size="large">		
         <PullRefresh 
             style={{
                 height: this.state.height - 56,
             }}
             distanceToRefresh={80}
             refreshing={this.state.isRefreshing} 
             onRefresh={this.refresh.bind(this)}
         >
             {listDiv}
         </PullRefresh>
     </Spin>
   </div>
   ```

2. 挂载scroll监听方法至contentNode上

   ```js
   componentDidMount() {
       if (this.contentNode) {
           this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
       }
       this.refresh();
   }

   ```

3. scroll监听方法，滚动至底部时，自动加载loadMore()方法—>更新state中的数据—>更新dom

   ```js
   onScrollHandle(event) {
       const clientHeight = event.target.clientHeight; // 屏幕高度
       const scrollHeight = event.target.scrollHeight; // 总的内容高度
       const scrollTop = event.target.scrollTop; // 已经滑动的距离
       const isBottom = (clientHeight + scrollTop === scrollHeight)
       if(isBottom) {
           this.loadMore();
           console.log(this.state.results);
       }
   }
   ```

   ```js
   loadMore() {
       let url = "http://jsonplaceholder.typicode.com/users";
       let self = this;
       let optionsGET = {};

       Toast.loading("加载中", 1, () => {
           let FETCH = new requestObj(url, optionsGET);
           FETCH.get()
           .subscribe(result => {
               let prevResults = self.state.results;
               let newResults = prevResults.concat(result);
               self.setState({
                   results: newResults,
                   isSpinning: false,
                   hasMore: true
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
       }, false);  
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

### Listitem

- Listitem组件方便用户在页面上进行信息设定。


- 左侧为提示性信息，右侧根据用户需要可以嵌套不同数量、不同种类的元素(Icon，image， Input， label，Switch，Button等)；

- 右侧部分应用了Bootstrap v4定位，根据元素数量自动定位

- Trick：右侧只有一个元素而又想帖靠在右侧时，可以添加一个空的div进行占位（此时右侧实际包含两个元素，详见“索要发票”示例）

  | 属性        | 描述      | 默认值  | 类型         |
  | --------- | ------- | ---- | ---------- |
  | text      | 左侧描述性信息 | —    | string     |
  | 内部child组件 | 右侧元素    | —    | React elem |

  | 右侧元素数量 | 右侧分布情况                           |
  | ------ | -------------------------------- |
  | 1      | A                                |
  | 2      | A ———————————————————————————  B |
  | 3      | A——————————————B—————————————C   |
  | 4      | A——————B————————— C ———————————D |

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

