<template>
  <div class="header clearfix">
    <div class="back" v-if="backable" @click="back()"><i></i></div>
    <div class="name">{{name}}</div>
    <div class="search" v-if="searchable" @click="search()"><i></i></div>
    <div class="explain" v-if="explainable" @click="explain()"><i></i></div>
  </div>
</template>
<script>
  export default {
    name: "Header",
    props: {
      name: {
        type: String,
        default: '主页'
      },
      backable: {
        type: Boolean,
        default: true
      },
      searchable: {
        type: Boolean,
        default: true
      },
      explainable: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {

      };
    },
    methods: {
      back:function () {
        this.$router.push('/')
      },
      quit:function () {
        this.$confirm('是否确认退出登录？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            localStorage.removeItem('mjInfo');
            this.$router.replace('/')
          })
          .catch(action => {
            console.log('cancel')
          });
      }
    }
  };
</script>
<style lang="scss">
  .header{
    height: 44px;
    width: 375px;
    background:#F8741B;
    font-size: 18px;/*no*/
    line-height: 44px;
    color: #fff;
    text-align: center;
    font-weight: 300;
    .back{
      float: left;
      i{
        width: 11px;
        height: 19px;
        display: inline-block;
        background: url(../../assets/images/back.png) no-repeat center / 100% 100%;
        vertical-align: middle;
        margin:0 19px 0 16px;
      }
    }
    .name{
      float: left;
      width: 282px;
    }
    .search{
      float: right;
      i{
        width: 20px;
        height: 20px;
        display: inline-block;
        background: url(../../assets/images/search.png) no-repeat center / 100% 100%;
        vertical-align: middle;
        margin-right: 26px;
      }
    }
  }
</style>
