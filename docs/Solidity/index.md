---
aside: true
layout: doc
---
区块链学习

根据https://juejin.cn/post/7141217595264335903#heading-0 文章制定学习路线

# 01-Web3和区块链等基本概念
## Web1，2，3

Web1：可读 静态页面，网站的搭建者提供内容，用户不能主动选择内容的导向，也不参与网站的建设。

Web2：可读+可写 动态页面，用户成为网站的一部分，并为网站的内容提供活力，用户主导着社区，比如tikTok

Web3：可读+可写+拥有 用户向网站贡献或提供的内容的所有者是用户，用户的内容无法被删除修改。

## 区块链（blockchain）
区块链是相互链接的计算机的组合，而不是中央服务器，这意味着整个网络是去中心化的

比如支付宝的支付功能并不是通过你去操作你的钱包增长的同时扣除他的钱包的操作，而是你向支付宝发送请求来扣除钱包余额，或者增加。而不是由你去操作。
## 分布式账本
分布式账本指的是交易记账由分布在不同地方的多个节点共同完成，而且每一个节点记录的是完整的账目，因此它们都可以参与监督交易合法性，同时也可以共同为其作证。

简单理解:你在区块链中写入一个数据，这个数据写入成功后，每一个节点都会保存这个数据，一旦有人在某一个节点修改，但是与其他的节点的数据不一致就无法修改。而传统的分布式在中心节点改变后其他节点上的数据也会跟着改变。
## 什么是加密货币？
普通货币是有实体的，而加密货币是数字货币，从本质上来说就是一串加密过后的代码，加密就是对货币进行防伪验证。
加密货币的价值是什么？传统货币的价值大部分是国家强制要求的，他的购买力取决于市场的反馈，加密货币也是一样的，它虽然不受国家的强制要求，但是依然会根据市场来变化价格，没了国家的束缚，它的购买力和货币价值更加不受影响。
## 什么是加密钱包？
加密钱包就是管理属于你自己的加密货币的工具，是你与区块链连接的重要桥梁，是区块链中的银行账户，协助你管理加密货币
## 什么是区块链浏览器？
区块链浏览器是一种软件，它使用 API 和区块链节点从区块链中提取各种数据，然后使用数据库来排列搜索到的数据，并以可搜索的格式将数据呈现给用户。用户的输入是资源管理器上的可搜索词，然后通过数据库上的组织表进行搜索。浏览器已经将区块链中的数据组织成表格格式

# 在以上基本概念后，区块链到底能干什么？
基于去中心化，出现了Dapp的概念
## 什么是Dapp
Dapp： 去中心化应用程序，具有去中心化特征的都能称作Dapp。
和普通app区别只在于Dapp的搭建平台是区块链，它同样由前端页面，后端数据处理保存构成
前端:使用 JavaScript 或 React、Vue、Svelte 等框架/库构建的标准前端。
后端:使用 Solidity/Solana/Rust 等语言构建的后端，它们建立在区块链之上。
钱包连接：ethers.js
主要部分：
    智能合约：业务逻辑
    用户界面：Web/App
    用户钱包：用户掌控，第三方工具，类似于用户身份认证