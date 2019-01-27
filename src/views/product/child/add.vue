<!-- add.vue -->
<template>
  <div style="border:1px solid #e3e3e3;">

    <div class="filter-container clearfix" style="height:44px;background:#f9f9f9; border-bottom:1px solid #e3e3e3;margin-bottom:15px;">
      <h3 >商品添加</h3>
      <el-button type="danger" class="close_button" icon="el-icon-close" size="small" circle @click="goBack"/>
    </div>

    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item label="商品图片" prop="region">
        <el-upload
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card">
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-form-item label="成本" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="售价" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="库存" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="返积分" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-form-item label="来源" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-form-item label="来源链接" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="商品详情" prop="desc">
        <tinymce :height="300" v-model="ruleForm.desc"/>
        <!-- <el-input v-model="ruleForm.desc" type="textarea"/> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/form.js'
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  props: {
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  created() {},

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    goBack() {
      window.history.back()
    },
    validateForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            resolve(true)
          } else {
            console.log('error submit!!')
            reject(false)
          }
        })
      })
    },
    async submitForm(formName) {
      let res
      if (await this.validateForm(formName)) {
        res = await create(this.ruleForm)
        console.log(res)
        if (res.msg) {
          await this.$alert(res.msg)
          this.goBack()
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>
<style lang='scss' scoped>
.float_right {
  float:right;
}
.filter-container h3 {
  margin-top:0;
  line-height:44px;
  margin-right:40px;
  font-size:16px;font-weight:bold;padding-left:30px;vertical-align:middle;
}
.filter-container .close_button {
  position:absolute;
  top:6px;
  right:10px;

}
</style>
