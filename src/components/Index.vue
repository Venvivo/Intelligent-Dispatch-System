<template>
  <div class="Index">
    <div class="header">车险管家</div>
    <div class="watermark"></div>
    <div class="main">
      <div class="top">
        <span>89</span>总任务单
      </div>
      <div class="card">
        <div class="card_top clearfix">
          <div class="card_top_left">
            <div class="num">15</div>
            <div class="name">待营销任务</div>
          </div>
          <div class="card_top_right">
            <div class="num">7</div>
            <div class="name">当日日程</div>
          </div>
        </div>
        <div class="card_bottom clearfix">
          <div>本月接单<span>20</span></div>
          <div>本月成功<span>8</span></div>
          <div>本月失败<span>2</span></div>
        </div>
      </div>
    </div>
    <div class="icon clearfix">
      <div class="icon_item">
        <div class="icon_1"></div>
        <p>任务管理</p>
      </div>
      <div class="icon_item">
        <div class="icon_2"></div>
        <p>派单记录</p>
      </div>
      <div class="icon_item">
        <div class="icon_3"></div>
        <p>日程管理</p>
      </div>
      <div class="icon_item">
        <div class="icon_4"></div>
        <p>服务单</p>
      </div>
    </div>
    <div class="message">
      <div class="message_item">
        <div class="message_item_top">
          <i></i><!----><span>系统消息</span>
          <div class="extra">查看</div>
        </div>
        <div class="message_item_bottom">20分钟前  系统有新的派单</div>
      </div>
      <div class="message_item">
        <div class="message_item_top">
          <i></i><!----><span>系统消息</span>
          <div class="extra">查看</div>
        </div>
        <div class="message_item_bottom">25分钟前  系统有新的派单</div>
      </div>
      <div class="message_item">
        <div class="message_item_top">
          <i></i><!----><span>系统消息</span>
          <div class="extra">查看</div>
        </div>
        <div class="message_item_bottom">30分钟前  系统有新的派单</div>
      </div>
    </div>
    <div class="menu clearfix">
      <div class="menu_item checked">
        <i class="menu_1"></i>
        <p>首页</p>
      </div>
      <div class="menu_item">
        <i class="menu_2"></i>
        <p>派单中心</p>
      </div>
      <div class="menu_item">
        <i class="menu_3"></i>
        <p>我的</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    mounted: function () {

    }
  }

</script>

<style lang="scss">
  .Index {
    min-height: 100vh;
    background: #fff;
    overflow: hidden;
    .header {
      height: 29px;
      line-height: 28px;
      padding: 9px 0;
      font-size: 20px; /*no*/
      text-align: center;
      color: #FC6C0B;
      background: #EEF0F2;
    }
    .watermark {
      width: 150px;
      height: 151px;
      background: url(../assets/images/watermark.png) no-repeat center / 100% 100%;
      position: fixed;
      z-index: 1;
      right: 0;
      top: -20px;
    }
    .main {
      width: 375px;
      background: #EEF0F2;
      .top {
        height: 37px;
        line-height: 37px;
        font-size: 12px; /*no*/
        color: #676767;
        span {
          font-size: 26px; /*no*/
          color: #000;
          margin: 0 7px 0 31px;
          vertical-align: middle;
        }
      }
      .card {
        width: 375px;
        height: 161px;
        background: url(../assets/images/card_bg.png) no-repeat center / 100% 100%;
        z-index: 2;
        position: relative;
        .card_top {
          height: 50px;
          width: 295px;
          margin: 0 40px;
          padding: 36.5px 0 17.5px;
          position: relative;
          .card_top_left {
            width: 147px;
            height: 50px;
            float: left;
            position: relative;
            .num {
              margin-left: 21px;
              font-size: 22px; /*no*/
              color: #111111;
              line-height: 30px;
            }
            .name {
              margin-left: 21px;
              height: 20px;
              line-height: 20px;
              font-size: 14px; /*no*/
              color: #444444;
              margin-top: 2px;
            }
          }
          .card_top_left:before {
            content: "";
            position: absolute;
            top: -50%;
            bottom: -50%;
            left: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            border-right: solid 1px #ffffff; /*no*/
            opacity: 0.45;
            box-sizing: border-box;
          }
          .card_top_right {
            width: 147px;
            height: 50px;
            float: left;
            .num {
              margin-left: 39.5px;
              font-size: 22px; /*no*/
              color: #111111;
              line-height: 30px;
            }
            .name {
              margin-left: 39.5px;
              height: 20px;
              line-height: 20px;
              font-size: 14px; /*no*/
              color: #444444;
              margin-top: 2px;
            }
          }

        }
        .card_top:before {
          content: "";
          position: absolute;
          top: -50%;
          bottom: -50%;
          left: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          border-bottom: 1px solid #ffffff; /*no*/
          opacity: 0.45;
          box-sizing: border-box;
        }
        .card_bottom {
          color: #fff;
          font-size: 12px; /*no*/
          width: 295px;
          margin: 0 40px;
          height: 56px;
          line-height: 56px;
          div {
            float: left;
            span {
              font-size: 20px; /*no*/
              margin: 0 43px 0 6px;
            }
          }
          div:last-child {
            span {
              margin: 0 0 0 6px;
            }
          }
        }
      }
    }
    .icon {
      height: 136px;
      position: relative;
      width: 375px;
      .icon_item {
        width: 93px;
        text-align: center;
        float: left;
        position: relative;
        z-index: 2;
        div {
          margin: 31px 0 19px 25px;
          width: 44px;
          height: 44px;
        }
        .icon_1 {
          background: url(../assets/images/icon_1.png) no-repeat center / 100% 100%;
        }
        .icon_2 {
          background: url(../assets/images/icon_2.png) no-repeat center / 100% 100%;
        }
        .icon_3 {
          background: url(../assets/images/icon_3.png) no-repeat center / 100% 100%;
        }
        .icon_4 {
          background: url(../assets/images/icon_4.png) no-repeat center / 100% 100%;
        }
        p {
          color: #333333;
          font-size: 14px; /*no*/
        }
      }
    }
    .icon:before {
      content: "";
      position: absolute;
      top: -50%;
      bottom: -50%;
      left: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom: solid 1px #E7E7E7; /*no*/
      box-sizing: border-box;
      z-index: 1;
    }
    .message {
      margin-top: 16px;
      .message_item {
        height: 60px;
        position: relative;
        margin-left: 19px;
        .message_item_top {
          z-index: 2;
          position: relative;
          font-size: 14px; /*no*/
          i {
            width: 20px;
            height: 20px;
            display: inline-block;
            vertical-align: middle;
            background: url(../assets/images/system_message.png) no-repeat center / 100% 100%;
            margin: 10px 10px 0 0;
          }
          span {
            margin-top: 10px;
            display: inline-block;
            vertical-align: middle;
          }
          .extra {
            float: right;
            color: #F8741B;
            margin-right: 22px;
            padding: 0 1px 2px;
            border-bottom: 2px solid #F8741B; /*no*/
            font-size: 12px; /*no*/
            position: relative;
            bottom: -10px;
          }
        }
        .message_item_bottom {
          font-size: 12px; /*no*/
          margin: 5px 0 0 30px;
          color: #666F77;
        }
      }
      .message_item:before {
        content: "";
        position: absolute;
        top: -50%;
        bottom: -50%;
        left: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
        border-bottom: solid 1px #E7E7E7; /*no*/
        box-sizing: border-box;
        z-index: 1;
      }
    }
    .menu {
      font-size: 12px; /*no*/
      position: fixed;
      width: 375px;
      height: 49px;
      bottom: 0;
      left: 0;
      background: #fff;
      -moz-box-shadow: 0 5px 19px #B0B0B0;
      -webkit-box-shadow: 0 5px 19px #B0B0B0;
      box-shadow: 0 5px 19px #B0B0B0;
      .menu_item {
        float: left;
        width: 80px;
        margin-top: 5px;
        p{
          text-align: center;
        }
        i{
          display: inline-block;
          width: 25px;
          margin-left: 27px;
          height: 25px;
        }
        .menu_1{
          background: url(../assets/images/menu_1.png) no-repeat center / 100% 100%;
        }
        .menu_2{
          background: url(../assets/images/menu_2.png) no-repeat center / 100% 100%;
        }
        .menu_3{
          background: url(../assets/images/menu_3.png) no-repeat center / 100% 100%;
        }
      }
      .checked{
        .menu_1{
          background: url(../assets/images/menu_1_checked.png) no-repeat center / 100% 100%;
        }
        .menu_2{
          background: url(../assets/images/menu_2_checked.png) no-repeat center / 100% 100%;
        }
        .menu_3{
          background: url(../assets/images/menu_3_checked.png) no-repeat center / 100% 100%;
        }
      }
      .menu_item:nth-child(1){
        margin-left: 11px;
      }
      .menu_item:nth-child(2){
        margin-left: 54px;
      }
      .menu_item:nth-child(3){
        margin-left: 57px;
      }
    }
  }
</style>
