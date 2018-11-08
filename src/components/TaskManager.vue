<template>
  <div class="TaskManager">
    <v-header :name="'任务管理'"></v-header>
    <div class="head clearfix">
      <div class="item" :class="selected == 1 ? 'checked' : '' " @click="choose(1)">待跟踪</div>
      <div class="item" :class="selected == 2 ? 'checked' : '' " @click="choose(2)">已成单</div>
      <div class="item" :class="selected == 3 ? 'checked' : '' " @click="choose(3)">失败</div>
    </div>
    <div class="mainBox" v-if="selected == 1" :style="{ height: wrapperHeight + 'px' }">
      <div class="item" @click="toDetail('10')">
        <div class="item_title">张三丰-包河区-15872839283</div>
        <div class="item_content">
          <i></i>
          <span>车牌号：<b>皖A898KI</b></span>
          <span>保险到期日：<b>9.20</b></span>
          <p>上次营销时间：<b>2018.09.15</b></p>
        </div>
        <div class="item_menu clearfix">
          <div>现场任务单</div>
          <div>写日志</div>
          <div>处理</div>
        </div>
      </div>
    </div>
    <div class="mainBox" v-if="selected == 2" :style="{ height: wrapperHeight + 'px' }">
      <div class="item h365"  @click="toDetail('10')">
        <div class="item_title">张三丰-包河区-15872839283</div>
        <div class="item_content">
          <i class="handle_success"></i>
          <span>车牌号：<b>皖A898KI</b></span>
          <span>保险到期日：<b>9.20</b></span>
          <p>处理时间：<b>2018.09.15</b></p>
        </div>
        <div class="item_menu clearfix">
          <div>
            <p>驾意险</p>
            <p>¥100000.00</p>
          </div>
          <div>
            <p>交强险</p>
            <p>¥1500.00</p>
          </div>
          <div>
            <p>商业险</p>
            <p>¥200000.00</p>
          </div>
        </div>
      </div>

    </div>
    <div class="mainBox" v-if="selected == 3" :style="{ height: wrapperHeight + 'px' }">
      <div class="item"  @click="toDetail('10')">
        <div class="item_title">张三丰-包河区-15872839283</div>
        <div class="item_content">
          <i class="handle_fail"></i>
          <span>车牌号：<b>皖A898KI</b></span>
          <span>保险到期日：<b>9.20</b></span>
          <p>处理时间：<b>2018.09.15</b></p>
        </div>
        <div class="item_menu clearfix">
          <div class="w230">客户无意向购买</div>
          <div>再处理</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './component/header.vue'
  export default {
    data() {
      return {
        wrapperHeight:0,
        selected:1
      };
    },
    components: {
      "v-header": Header
    },

    methods: {
      choose:function (val) {
        this.selected = val
      },
      toDetail:function (id) {
        console.log(id)
        this.$router.push('/TaskDetail')
      }
    },
    mounted:function () {
      this.wrapperHeight = document.documentElement.clientHeight - 109;
    }
  }

</script>

<style lang="scss">
  .TaskManager {
    .head{
      height: 50px;
      width: 375px;
      font-size: 14px;/*no*/
      background: #fff;
      .item{
        float: left;
        margin: 0 25px 0 30px;
        line-height: 50px;
        height: 50px;
        width: 70px;
        text-align: center;
        color: #777777;
      }
      .checked{
        border-bottom: 2px solid #F8741B;/*no*/
        box-sizing: border-box;
        color: #F8741B;
      }
    }
    .mainBox{
      padding-top: 15px;
      overflow-y: scroll;
      .item{
        width: 345px;
        height: 144px;
        padding: 5px;
        font-size: 14px;/*no*/
        margin: 10px 10px -5px;
        background: url(../assets/images/task_bg.png) no-repeat center / 355px 154px;
        .item_title{
          color: #333333;
          height: 20px;
          line-height: 20px;
          margin: 17px 0 13px 16px;
          font-weight: 600;
        }
        .item_content{
          height: 37px;
          line-height: 17px;
          position: relative;
          i{
            width: 8px;
            height: 13px;
            display: inline-block;
            position: absolute;
            top:-3px;
            right:12px;
            background: url(../assets/images/arrow_right.png) no-repeat center / 100% 100%;
          }
          .handle_success{
            background: url(../assets/images/handle_success.png) no-repeat center / 100% 100%;
            width: 90px;
            height: 73px;
            top:-38px;
            right: 17px;
          }
          .handle_fail{
            background: url(../assets/images/handle_fail.png) no-repeat center / 100% 100%;
            width: 90px;
            height: 73px;
            top:-38px;
            right: 17px;
          }
          span{
            font-size: 12px;/*no*/
            line-height: 17px;
            color: #888888;
            margin-left: 18px;
            display: inline-block;
            b{
              font-weight: 400;
              color: #333333;
            }

          }
          p{
            font-size: 12px;/*no*/
            line-height: 17px;
            color: #888888;
            margin-left: 18px;
            b{
              font-weight: 400;
              color: #333333;
            }
          }
        }
        .item_menu{
          height: 44px;
          color: #F8741B;
          border-top: 1px solid #D8D8D8;/*no*/
          margin-top: 12px;
          div{
            float: left;
            height: 32px;
            line-height: 32px;
            margin: 5px 0 7px;
            text-align: center;
            width: 114px;
            border-right: 1px solid #D8D8D8;/*no*/
            p{
              font-size: 12px;/*no*/
              color: #888888;
              letter-spacing: 0;
              text-align: center;
              height: 17px;
              line-height: 17px;
              margin-top: 2px;
            }
            p:last-child{
              font-size: 13px;/*no*/
              color: #CC2626;
              letter-spacing: 0;
              text-align: center;
              height: 18px;
              line-height: 18px;
              margin-top: 2px;
            }
          }
          .w230{
            width: 230px;
            font-size: 13px;/*no*/
            color: #333333;
            font-weight: 600;
          }
          div:last-child{
            border: 0 none;
          }
        }
      }
      .item:first-child{
        margin: 0 10px -5px;
      }
      .h365{
        height: 154px;
        background: url(../assets/images/task_bg.png) no-repeat center / 355px 164px;
        .item_menu{
          div{
            height: auto;
          }
        }
      }
    }
  }
</style>
