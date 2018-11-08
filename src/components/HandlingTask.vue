<template>
  <div class="HandlingTask">
    <v-header :name="'任务处理'" :searchable="false"></v-header>
    <div class="main">
      <div class="line">
        <span>处理结果</span>
        <span>营销成功<i></i></span>
      </div>
      <div class="line">
        <span>驾意险</span>
        <span class="spend">￥1024.00</span>
      </div>
      <div class="line">
        <span>商业险</span>
        <span class="spend">￥1024.00</span>
      </div>
      <div class="line">
        <span>交强险</span>
        <span class="spend">￥1024.00</span>
      </div>
      <div class="line">
        <span>身份证</span>
        <span>34012284393343043409</span>
      </div>
      <div class="line">
        <span>服务单</span>
        <span>
          <i class="switch" :class="service ? 'checked' : ''" @click="service = !service"></i>
        </span>
      </div>
      <div class="line">
        <span>服务商</span>
        <span @click="openGroupPicker">{{groupValue || group[0].name}}<i></i></span>
      </div>
    </div>
    <div class="normal_button">
      提交
    </div>
    <v-picker
      :values="group"
      :showKey="'name'"
      ref="groupPicker"
      @confirm="groupChange"
      v-model="groupValue">
    </v-picker>

  </div>
</template>

<script>
  import Header from './component/header.vue'
  import picker from './component/data-picker.vue'
  export default {
    data() {
      return {
        service: true,
        group: [
          {
            id: 1,
            name: "和谐团队1"
          },
          {
            id: 2,
            name: "和谐团队2"
          },
          {
            id: 3,
            name: "和谐团队3"
          },
          {
            id: 4,
            name: "和谐团队4"
          },
          {
            id: 5,
            name: "和谐团队5"
          }
        ],
        groupValue:''
      };
    },
    components: {
      "v-header": Header,
      "v-picker": picker,
    },
    methods: {
      openGroupPicker: function (picker) {
        this.$refs.groupPicker.open();
      },
      groupChange:function (val) {
          console.log(val)
        this.groupValue = val.name;
      }
    }
  }

</script>

<style lang="scss">
  .HandlingTask {
    .main {
      background: #fff;
      .line {
        font-size: 14px; /*no*/
        color: #666666;
        letter-spacing: 0;
        line-height: 44px;
        height: 44px;
        padding: 0 17px 0 16px;
        border-bottom: 1px solid #D8D8D8; /*no*/
        span {
          float: left;
        }
        span:last-child {
          float: right;
          color: #000000;
          i {
            width: 14px;
            height: 9px;
            display: inline-block;
            background: url(../assets/images/down_arrow.png) no-repeat center / 100% 100%;
            margin-left: 7px;
          }
          .switch {
            display: inline-block;
            vertical-align: middle;
            width: 50px;
            height: 26px;
            background: url(../assets/images/off.png) no-repeat center / 100% 100%;
          }
          .checked {
            background: url(../assets/images/on.png) no-repeat center / 100% 100%;
          }
        }
        .spend {
          color: #CC2626 !important;
        }
      }
    }
    .normal_button {
      font-size: 16px; /*no*/
      color: #FFFFFF;
      letter-spacing: 10px;
      text-align: center;
      width: 335px;
      height: 45px;
      line-height: 45px;
      margin-left: 20px;
      border-radius: 10px;
      background: #F8741B;
      margin-top: 40px;
    }
  }
</style>
