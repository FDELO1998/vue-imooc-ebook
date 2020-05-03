# vue-imooc-ebook

## 项目组成
 vue-imooc-ebook 文件为代码文件。
 esouce 文件为电子书资源文件，部署在服务器上。
 node-book文件为后台代码文件，负责连接数据库等功能。
 
### 项目运行
电脑需安装环境 
node.js(npm会在包中一起下载）
cmd终端测试 node -v  npm -v显示版本既安装成功
nginx
mysql（sql文件导入）
安装完nginx后，修改nginx.conf配置文件，把我文件里的替换进去，并且把首行用户的名字改成自己的，底下9000端口的路径改为自己的esouce的文件路径。
mysql可以通过下载navicat可视化看到图表。

### 运行顺序
在node-book文件里node app.js
在vue-imooc-ebook文件夹npm run serve启动项目

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
