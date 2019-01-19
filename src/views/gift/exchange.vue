<!-- exchange.vue -->
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
import Pane from './child/exchangePane'
export default {
  name: 'Exchange',
  components: {
    tabPane1: Pane
  },
  data() {
    return {
      tabMapOptions: [
        { label: '礼品兑换', key: 'tabPane1' }
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
