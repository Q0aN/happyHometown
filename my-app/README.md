## 开始

npm install
npm run dev (进入开发模式，启动比较慢)

## 项目结构

#### app(应用层)：
page对应渲染的视图

layout对应界面的布局

一个文件夹对应一个路由（app为根路由）

#### components(组件层)：
该目录用于编写组件供app层使用，app层原则上不进行复杂的ui编写

其中base层用于编写原子组件，例如input、div、span、svgIcon等，以供components层中其他复杂组件使用

public层用于存放静态资源例如图片、svg、txt

#### src(核心功能层)
info目录用于定义项目中会使用到的参数

script目录用于存放app层和components层剥离出的逻辑代码，保证ui层的

style目录用于存放app层和components层的样式，便于管理与调整，后期将统一定义颜色、字体、字号等元素，便于主题的切换

type目录用于存放类型定义

未来可能会有其他功能目录