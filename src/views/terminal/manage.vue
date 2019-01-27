<!-- manage.vue -->
<template>
  <div class="app-container">
    <div class="tab-container">
      <el-tabs v-model="activeName" >
        <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
          <component v-if="activeName===item.key" :tab="currTab" :is="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Pane from './child/managePane'
export default {
  name: 'Manage',
  components: {
    tabPane1: Pane,
    tabPane2: Pane,
    tabPane3: Pane
  },
  data() {
    return {
      tabMapOptions: [
        { label: '待投放', key: 'tabPane1' },
        { label: '已投放', key: 'tabPane2' },
        { label: '已撤回', key: 'tabPane3' }
      ],
      activeName: 'tabPane1'
    }
  },

  computed: {
    currTab() {
      return this.tabMapOptions.find(item => item.key === this.activeName)
    }
  },

  created() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
