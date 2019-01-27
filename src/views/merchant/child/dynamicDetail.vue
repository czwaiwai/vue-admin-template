<!-- detail.vue -->
<template>
  <el-dialog :visible.sync="visible" :before-close="modalClose" title="查看门店" >
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="动态详情" prop="content">
        <p>{{ formObj.content }}</p>
      </el-form-item>
      <el-form-item label="图片" prop="image">
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
