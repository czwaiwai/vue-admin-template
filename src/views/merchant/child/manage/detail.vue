<!-- detail.vue -->
<template>
  <el-dialog :visible.sync="visible" :before-close="modalClose" title="终端信息" >
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="型号" prop="id">
        {{ formObj.id }}
      </el-form-item>
      <el-form-item label="终端型号" prop="short">
        <p>{{ formObj.short }}</p>
      </el-form-item>
      <el-form-item label="终端名称" prop="title">
        {{ formObj.title }}
      </el-form-item>
      <el-form-item label="终端图" prop="image">
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
