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
| size                      | 按钮大小     | "lg" | string ("lg", "sm") |

### Button

Button组件根据Bootstrap v4的button进行封装。

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

### Modal

### Card

### Stepper

### Picker

### Refresh/Loadmore

### Listitem