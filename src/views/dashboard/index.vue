<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <section v-for="(item,index) in list" :key="index" class="section_bl">
      <div class="title">{{ item.name }}</div>
      <div class="content">
        <el-row>
          <el-col :span="3">
            <p class="text-center main_color">¥160</p>
            <p class="text-center">今日营收</p>
          </el-col>
          <el-col :span="3">
            <p class=" text-center main_color">¥160</p>
            <p class="text-center">今日营收</p>
          </el-col>
          <el-col :span="3">
            <p class="text-center main_color">¥160</p>
            <p class="text-center">今日营收</p>
          </el-col>
          <el-col :span="12"/>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      list: [
        { name: '营收', values: [] },
        { name: '终端', values: [] },
        { name: '商品', values: [] },
        { name: '礼品', values: [] },
        { name: '用户', values: [] },
        { name: '点赞', values: [] }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.main_color {
  color:#409EFF;
}
.section_bl {
  border:1px solid #e3e3e3;
  padding:10px 15px;
  margin-bottom:20px;
  & .title {
    font-size:16px;
    line-height:30px;
    border-bottom:1px solid #e3e3e3;
  }
  & .content {
    padding-top:10px;
  }
  & p {
    margin:0;
    line-height:1.5;
  }
}

</style>
