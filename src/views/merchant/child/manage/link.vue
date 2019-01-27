<!-- add.vue 创建和编辑-->
<template>
  <el-dialog :visible.sync="visible" :before-close="modalClose" title="关联门店" @open="modalOpen" >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="门店号" prop="id">
        <el-input v-model="ruleForm.id">
          <el-button slot="append" icon="el-icon-search">查询</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="门店名称" prop="title">
        {{ ruleForm.title }}
      </el-form-item>
      <el-form-item label="门店地址" prop="city">
        {{ ruleForm.city }}
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="ruleForm.bool"
          active-text="已关联"
          inactive-text="已解除"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="modalClose">取消</el-button>
      <el-button type="primary" @click="createOrUpdate()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { create, update } from '@/api/form.js'
export default {
  components: {},
  props: {
    isCreate: {
      type: Boolean,
      default: true
    },
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
      ruleForm: {
        id: '',
        image: '',
        title: '',
        short: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入终端的名字', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // id: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        content: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  created() {
    this.copyform = this.ruleForm
  },

  methods: {
    modalOpen() {
      this.ruleForm = { ...this.copyform }
      this.$nextTick(() => {
        if (!this.isCreate) {
          this.ruleForm = { ...this.copyform, ...this.formObj }
        }
      })
      console.log('打开了')
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            resolve(true)
          } else {
            reject(false)
          }
        })
      })
    },
    async createOrUpdate() {
      let res
      if (await this.validateForm()) {
        if (this.isCreate) { // 创建
          res = await create(this.ruleForm)
        } else { // 更新
          res = await update(this.ruleForm)
        }
        console.log(res)
        if (res.msg) {
          this.$message.success(res.msg)
        }
        this.modalClose()
      }
    },
    modalClose() {
      this.$refs['ruleForm'].resetFields()
      this.$emit('update:visible', false)
    },
    handleAvatarSuccess(res, file) {
      console.log(res, '-----')
      this.ruleForm.image = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}

</script>
<style lang='scss' scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
