# React framework使用说明

## install and start

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

```
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

- PageTransition需要与第三方组件**[react-router-page-transition](https://github.com/trungdq88/react-router-page-transition)**结合使用

  ```
  npm install react-router-page-transition --save
  ```


- 页面切换实现步骤

  1. 添加react-router-page-transition到router，设定timeout、location；须使用Switch组件。

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

     ​

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

     ​

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

```Js
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
<label>Example-1: 复杂卡片</label>
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



### Stepper

### Picker

### Refresh/Loadmore

### Listitem