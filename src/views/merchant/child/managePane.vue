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
      <el-table-column label="主商户号" width="110">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.person }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column label="BD负责人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.person }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="子商户号" width="110">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="门店数" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="终端数" width="110">
        <template slot-scope="scope">
          <span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createTime" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="linkHandle(scope.row)" >关联门店</el-button>
          <el-button type="primary" size="mini" @click="showShopHandle(scope.row)" >查看门店</el-button>
          <el-button type="primary" size="mini" >子账号</el-button>
          <el-button type="primary" size="mini" @click="updateHandle(scope.row)" >更新信息</el-button>
          <!-- <el-button v-if="scope.row.status!='published'" size="mini" type="success" >查看</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <update-modal :visible.sync="updateVisible" :is-create="isCreate" :form-obj="itemObj"/>
    <link-modal :visible.sync="linkVisible" :is-create="isCreate" :form-obj="itemObj"/>
    <list-modal :visible.sync="listShopVisible" />
    <detail-modal :visible.sync="detailVisible" :form-obj="itemObj"/>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import UpdateModal from './manage/update'
import LinkModal from './manage/link'
import DetailModal from './manage/detail'
import ListModal from './manage/list'
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
    UpdateModal,
    DetailModal,
    LinkModal,
    ListModal,
    Pagination
  },
  data() {
    return {
      isCreate: true,
      updateVisible: false,
      detailVisible: false,
      linkVisible: false,
      listShopVisible: false,
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
    // 关联门店
    linkHandle(item) {
      this.itemObj = item
      this.isCreate = false
      this.linkVisible = true
    },
    // 查看门店
    showShopHandle() {
      this.listShopVisible = true
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
    // 查看
    viewHandle(item) {
      this.itemObj = item
      this.detailVisible = true
    }
  }

}
</script>
