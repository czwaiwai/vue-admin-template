<template>
  <div class="">
    <div class="filter-container">
      <el-button type="primary" size="medium" icon="el-icon-edit" @click="createHandle" >添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> -->
      <el-table-column label="门店号" width="110">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="门店名称" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终端数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="商品数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="礼品数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="440" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="terminalHandle(scope.row)">终端</el-button>
          <el-button type="primary" size="mini" @click="goodHandle(scope.row)">商品</el-button>
          <el-button type="primary" size="mini" @click="giftHandle(scope.row)">礼品</el-button>
          <el-button type="primary" size="mini" @click="activityHandle(scope.row)">活动</el-button>
          <el-button type="primary" size="mini" @click="gameHandle(scope.row)">闯关</el-button>
          <el-button size="mini" type="success" @click="viewHandle(scope.row)" >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <update-modal :visible.sync="updateVisible" :is-create="isCreate" :form-obj="itemObj"/>
    <detail-modal :visible.sync="detailVisible" :form-obj="itemObj"/>
    <game-modal :visible.sync="gameVisible" :is-create="isCreate" :form-obj="itemObj"/>
    <activity-modal :visible.sync="activityVisible" :form-obj="itemObj"/>
    <terminal-modal :visible.sync="terminalVisible" :form-obj="itemObj"/>
    <good-modal :visible.sync="goodVisible" :form-obj="itemObj"/>
    <gift-modal :visible.sync="giftVisible" :form-obj="itemObj"/>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { del } from '@/api/form.js'
import UpdateModal from './shop/update'
import DetailModal from './shop/detail'
import ActivityModal from './shop/activityList'
import TerminalModal from './shop/terminalList'
import GiftModal from './shop/giftList'
import GoodModal from './shop/goodList'
import GameModal from './shop/game'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    Pagination,
    UpdateModal,
    DetailModal,
    ActivityModal,
    TerminalModal,
    GiftModal,
    GoodModal,
    GameModal
  },
  data() {
    return {
      addVisible: false,
      isCreate: true,
      updateVisible: false,
      detailVisible: false,
      activityVisible: false,
      terminalVisible: false,
      goodVisible: false,
      gameVisible: false,
      giftVisible: false,
      itemObj: {},
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total: 0,
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response.data.item)
        this.list = response.data.items
        this.total = response.data.total || 100
        this.listLoading = false
      })
    },
    // 新增
    createHandle() {
      this.isCreate = true
      this.updateVisible = true
    },
    // 修改
    updateHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.updateVisible = true
    },
    // 闯关游戏难度设置
    gameHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.gameVisible = true
    },
    // 活动
    activityHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.activityVisible = true
    },
    // 终端
    terminalHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.terminalVisible = true
    },
    // 商品
    goodHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.goodVisible = true
    },
    // 礼品
    giftHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.giftVisible = true
    },
    // 查看
    viewHandle(item) {
      this.itemObj = item
      this.detailVisible = true
    },
    // 上架
    async upHandle(item) {
      await this.$confirm('你确定要上架么？')
      const res = await del(item.id)
      item.bool = false
      this.$message.success(res.msg)
    },
    // 下架
    async downHandle(item) {
      await this.$confirm('你确定要下架么？')
      const res = await del(item.id)
      item.bool = true
      this.$message.success(res.msg)
    }
  }
}
</script>
