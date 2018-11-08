<template lang="html">
  <div>
    <mt-popup ref="popup" position="bottom" class="mt-attr-picker" v-model="visible" >
      <mt-picker :slots="attrSlots" @change="onAttrChange" :value-key="valueKey" :current-value="value"
                  :visible-item-count="3" show-toolbar>
        <span class="mt-attr-picker-action mt-attr-picker-cancel" @click="close">{{ cancelText }}</span>
        <span class="mt-attr-picker-action mt-attr-picker-confirm" @click="confirm">{{ confirmText }}</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    props: {
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      values: {
        type: Array
      },
      showKey: {
        type: String
      },
      defaultIndex: {
        type: Number
      }
    },

    data: function() {
      const currentValue = (this.values || [])[this.defaultIndex || 0];
      return {
        visible: false,
        attrSlots: [{
          flex: 1,
          values: this.values,
          defaultIndex: this.defaultIndex
        }],
        valueKey: this.showKey,
        value: currentValue
      };
    },

    watch: {
      values (v) {
        this.values = v;
        this.$set(this.attrSlots, 0, {
          flex: 1,
          values: this.values,
          defaultIndex: 0,
          className: 'slot1'
        })
      }
    },

    methods: {
      onAttrChange: function (picker, value) {
        this.value = value[0];
      },
      confirm: function() {
        this.close();
        this.$emit('confirm', this.value);
      },
      open: function() {
        this.$refs['popup'].currentValue = true;
        this.visible = true;
      },
      close: function() {
        this.$refs['popup'].currentValue = false;
        this.visible = false;
      }
    }
  }
</script>
<style lang="scss">
  .mt-attr-picker {
    width: 100%;
    z-index: 9999;
  }

  .mt-attr-picker .picker-slot-wrapper, .mt-attr-picker .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .mt-attr-picker .picker-toolbar {
    border-bottom: solid 1px #eaeaea;/*no*/
  }

  .mt-attr-picker-action {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 16px; /*no*/
    color: #26a2ff;
  }

  .mt-attr-picker-cancel {
    float: left;
  }

  .mt-attr-picker-confirm {
    float: right;
  }
  .picker-items{
    width: 100%;
  }
  .picker-slot {
    font-size: 14px;/*no*/

  }
  .picker-toolbar{
    height: auto;
  }
  .mt-attr-picker-cancel,.mt-attr-picker-confirm{
    border-bottom: solid 1px #eaeaea;/*no*/
  }
  .mt-attr-picker-cancel{
    border-right: solid 1px #eaeaea;/*no*/ ;
    margin-right: -1px;/*no*/
  }
</style>
