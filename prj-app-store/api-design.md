## 应用商店——接口设计

### 应用商店
1. 应用商店列表接口
2. 应用详情接口 —— 入参appId
    - 详细字端待定

3. 应用购买记录接口 —— 入参appId
4. 购买选项列表接口（目测已存在） 
    - 不清楚该接口在应用商店还是在工作号？
    - [x] A: getAllCommodities  在应用商店

5. 购买接口（目测已存在）
6. 获取各种合同接口
    - 建议合同变成一个接口，通过appId和type进行判断什么应用的什么合同
7. 应用商店层面，获取`最新的`未支付的接口

additional
2.1 判断是否有应用商店的管理权限（或者是获取个人信息那个接口自己抓取资源判断？）
2.2 判断商品是否已认证接口

### 购买
1. 应用商店订单列表接口 —— 入参 orderStatus
2. 商品订单详情接口
    - 不清楚工作号是否已存在
    - 不清楚这个接口在应用商店层面还是在各个商品层面
    - A: [x] getOrderDetailsByOrderNo

4.1 getAllPhoneRegisterLocationList
    - 获取工作号号码归属地 —— 并非全部省市区？



商品相关接口
getAllCommodities  ===== 购买工作号相关服务页面：获取所有套餐列表  


订单相关接口
购买商品下单时相关接口
getAllPhoneRegisterLocationList ===== 门店购买新号页面：查询可选工作号归属地列表
submitOrder =====  提交订单 ()
getShopGoldenBeanCount ===== 获取门店金豆量 ( )  ??? 有用吗？

订单查询相关接口
getOrderDetailsByOrderNo =====  获取指定订单号的订单详情
getMostRecentOrderDetails ===== 查询时间最近的一笔订单 ???
getMostRecentRemittance =====  获取最近门店提交的打款信息作为默认打款信息使用  ？？？ deprecate
getMostRecentInvoice =====  获取最近门店提交的发票信息作为默认发票信息使用
batchApplyInvoice =====  （门店）批量增开发票


大搜后台管理模块与订单相关接口
getPurchaseRecordList ======  查看购买明细
getShopOrderDetail =====  查看订单详情
getShopOrderWorkNumDetail =====  查看订单里购买的工作号
batchConfirmOrder ======  批量确认订单收款
batchIssueInvoice =====  批量开具发票,传入的订单编号应过滤掉未申请和已开具发票的订单
getWorkbenchOrderManagementDataList ===== 筛选大搜统一工作台所要展示的订单


### 设计稿研究问题