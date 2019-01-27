<!-- detail.vue -->
<template>
  <el-dialog :visible.sync="visible" :before-close="modalClose" title="查看门店" >
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="门店号" prop="short">
        {{ formObj.short }}
      </el-form-item>
      <el-form-item label="门店名称" prop="title">
        {{ formObj.title }}
      </el-form-item>
      <el-form-item label="联系人" prop="person">
        {{ formObj.person }}
      </el-form-item>
      <el-form-item label="联系电话" prop="num">
        {{ formObj.num }}
      </el-form-item>
      <el-form-item label="BD负责人" prop="person">
        {{ formObj.person }}
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        {{ formObj.city }}
      </el-form-item>
      <el-form-item label="门店地址" prop="content">
        <p>{{ formObj.content }}</p>
      </el-form-item>
      <el-form-item label="门店二维码" prop="image">
        <img v-if="formObj.image" :src="formObj.image" class="avatar">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },

  computed: {},

  created() {},

  methods: {
    createOrUpdate() {
      this.modalClose()
    },
    modalClose() {
      this.$emit('update:visible', false)
    }
  }
}

</script>
<style lang='scss' scoped>
.el-form-item{
    margin-bottom:10px;
}

</style>
