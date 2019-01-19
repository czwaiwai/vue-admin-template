<!-- orders.vue -->
<template>
  <div class="app-container">
    <div class="tab-container">
      <el-tabs v-model="activeName" >
        <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key="item.key" :name="item.key">
          <component v-if="activeName===item.key" :is="activeName"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Pane from './child/ordersPane'
export default {
  components: {
    tabPane1: Pane,
    tabPane2: Pane,
    tabPane3: Pane,
    tabPane4: Pane,
    tabPane5: Pane,
    tabPane6: Pane
  },
  data() {
    return {
      tabMapOptions: [
        { label: '待付款', key: 'tabPane1' },
        { label: '已付款', key: 'tabPane2' },
        { label: '已领取', key: 'tabPane3' },
        { label: '待发货', key: 'tabPane4' },
        { label: '已发货', key: 'tabPane5' },
        { label: '已收货', key: 'tabPane6' }
      ],
      activeName: 'tabPane1'
    }
  },

  computed: {},

  created() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
