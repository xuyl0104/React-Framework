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

#### Container

Container组件需要包裹页面中的其他元素（当使用页面切换效果组件PageTransition时，Container须位于切换组件内部）。

Container组件设定了flex排列方式。

#### Content

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



## Transition

## Components

## Header

## Footer

## Button

## Input

## Message

## Modal

## Card

## Stepper

## Picker

## Refresh/Loadmore

## Listitem