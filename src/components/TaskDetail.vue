<template>
  <div class="TaskDetail">
    <v-header :name="'任务详情'" :searchable="false"></v-header>
    <div class="main" :style="{ height: wrapperHeight + 'px' }">
      <div class="customer_info">
        <div class="head"><i></i>客户信息</div>
        <div class="normal_line">
          <span>客户姓名</span>
          <span>王磊</span>
        </div>
        <div class="normal_line">
          <span>联系号码</span>
          <span>18225467541</span>
        </div>
        <div class="normal_line">
          <span>车型</span>
          <span>哈佛H2</span>
        </div>
        <div class="normal_line">
          <span>车牌</span>
          <span>皖AKJ893</span>
        </div>
        <div class="normal_line">
          <span>车架号</span>
          <span>47834928392</span>
        </div>
        <div class="normal_line">
          <span>发动机号</span>
          <span>47834928392</span>
        </div>
        <div class="normal_line">
          <span>保险到期日</span>
          <span>9.29</span>
        </div>
        <div class="normal_line">
          <span>初登日期</span>
          <span>2018.09.20</span>
        </div>
      </div>
      <div class="task_info">
        <div class="head"><i></i>任务信息</div>
        <div class="normal_line">
          <span>派单人</span>
          <span>刘贺</span>
        </div>
        <div class="normal_line">
          <span>派单时间</span>
          <span>2018.09.20 10:29</span>
        </div>
        <div class="normal_line">
          <span>预约时间</span>
          <span>2018.09.20 10:29</span>
        </div>
        <div class="normal_line">
          <span>接单时间</span>
          <span>2018.09.20 10:29</span>
        </div>
        <div class="normal_line">
          <span>客户地址</span>
          <span>合肥市蜀山区井岗镇</span>
        </div>
        <div class="normal_line">
          <span>驾意险</span>
          <span>¥200000.00</span>
        </div>
        <div class="normal_line">
          <span>商业险</span>
          <span>¥500000.00</span>
        </div>
        <div class="normal_line">
          <span>保费</span>
          <span>¥700000.00</span>
        </div>
      </div>
      <div class="marketing_log">
        <div class="head"><i></i>营销日志</div>
        <div class="note_item">
          <div class="note_status clearfix">
            <span>2018.09.03</span>
            <span class="half_border">未提交</span>
          </div>
          <div class="normal_line">滨河华悦2#708</div>
          <div class="normal_line bor_line">上门营销，客户购买意向不坚决，需要考虑。</div>
        </div>
        <div class="note_item">
          <div class="note_status clearfix">
            <span>2018.09.03</span>
            <span class="half_border done">已提交</span>
          </div>
          <div class="normal_line">滨河华悦2#708</div>
          <div class="normal_line bor_line">上门营销，客户购买意向不坚决，需要考虑。</div>
        </div>
      </div>
    </div>
    <div class="menu">
      <div>写日志</div>
      <div @click="toHanderTask()">处理</div>
    </div>
  </div>
</template>

<script>
  import Header from './component/header.vue'
  export default {
    data() {
      return {
        wrapperHeight: 0
      };
    },
    components: {
      "v-header": Header
    },
    methods: {
      toHanderTask:function () {
          this.$router.push('/HandlingTask')
        }
    },
    mounted: function () {
      this.wrapperHeight = document.documentElement.clientHeight - 90;
    }
  }

</script>

<style lang="scss">
  .TaskDetail {
    .main {
      overflow-y: scroll;
      .customer_info {
        background: #fff;
        padding: 15px 0 9px;
        .head {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
          vertical-align: middle;
          margin-bottom: 13px;
          i {
            display: inline-block;
            width: 3px;
            height: 14px;
            background: url(../assets/images/title_icon.png) no-repeat center / 100% 100%;
            margin: 0 9px 0 29px;
            vertical-align: middle;
          }
        }
        .normal_line {
          padding: 0 41px;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          height: 17px;
          margin-bottom: 3px;
          line-height: 17px;
          span {
            float: left;
          }
          span:last-child {
            float: right;
          }
        }
      }
      .task_info {
        background: #fff;
        padding: 15px 0 9px;
        margin-top: 10px;
        .head {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
          vertical-align: middle;
          margin-bottom: 13px;
          i {
            display: inline-block;
            width: 3px;
            height: 14px;
            background: url(../assets/images/title_icon.png) no-repeat center / 100% 100%;
            margin: 0 9px 0 29px;
            vertical-align: middle;
          }
        }
        .normal_line {
          padding: 0 41px;
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          height: 17px;
          margin-bottom: 3px;
          line-height: 17px;
          span {
            float: left;
          }
          span:last-child {
            float: right;
          }
        }
      }
      .marketing_log {
        background: #fff;
        padding: 15px 0 9px;
        margin-top: 10px;
        .head {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 600;
          vertical-align: middle;
          margin-bottom: 13px;
          i {
            display: inline-block;
            width: 3px;
            height: 14px;
            background: url(../assets/images/title_icon.png) no-repeat center / 100% 100%;
            margin: 0 9px 0 29px;
            vertical-align: middle;
          }
        }
        .note_item {
          padding: 0 41px;
          margin-top: 9px;
          .note_status {
            height: 20px;
            line-height: 20px;
            span {
              float: left;
              font-size: 14px; /*no*/
              color: #333333;
              letter-spacing: 0;
              font-weight: 600;
            }
            .half_border {
              float: right;
              font-size: 11px; /*no*/
              color: #FF2424;
              letter-spacing: 0;
              font-weight: 400;
              display: inline-block;
              height: 16px;
              padding: 0 5px;
              position: relative;
              line-height: 17px;
            }
            .half_border:before {
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
              border: 1px solid #FF2424; /*no*/
              border-radius: 15px;
              box-sizing: border-box;
            }
            .done {
              font-size: 11px;
              color: #333333;
              letter-spacing: 0;
            }
            .done:before {
              border: 1px solid #000000; /*no*/
              border-radius: 15px;
            }
          }
          .normal_line {
            font-size: 14px; /*no*/
            color: #666666;
            letter-spacing: 0;
            height: 20px;
            line-height: 20px;
            margin-top: 1px;
          }
          .bor_line {
            border-bottom: 1px solid #D8D8D8; /*no*/
            padding-bottom: 6px;
          }
        }
        .note_item:first-child {
          margin-top: 0;
        }
      }
    }
    .menu {
      height: 32px;
      padding: 7px 0 6px;
      background: #fff;
      text-align: center;
      font-size: 14px; /*no*/
      position: fixed;
      bottom: 0;
      left:0;
      color: #F8741B;
      letter-spacing: 0;
      -moz-box-shadow: 1px -1px 10px #B0B0B0;
      -webkit-box-shadow: 1px -1px 10px #B0B0B0;
      box-shadow: 1px -1px 10px #B0B0B0;
      div {
        border-right: 1px solid #D8D8D8; /*no*/
        height: 32px;
        line-height: 32px;
        width: 187px;
        float: left;
      }
      div:last-child {
        border: 0 none;
      }
    }
  }

</style>
