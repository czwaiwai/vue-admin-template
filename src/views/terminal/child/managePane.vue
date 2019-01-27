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
      <el-table-column label="终端编号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="型号" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.short }}</span>
        </template>
      </el-table-column>
      <el-table-column label="终端名称" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button v-if="tab.key==='tabPane1'" type="primary" size="mini" @click="updateHandle(scope.row)" >编辑</el-button>
          <el-button v-if="tab.key==='tabPane2'" type="primary" size="mini" @click="revertHandle(scope.row)" >撤回</el-button>
          <el-button size="mini" type="success" @click="viewHandle(scope.row)" >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <update-modal :visible.sync="updateVisible" :is-create="isCreate" :form-obj="itemObj"/>
    <detail-modal :visible.sync="detailVisible" :form-obj="itemObj"/>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import UpdateModal from './manage/update'
import DetailModal from './manage/detail'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { del } from '@/api/form.js'
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
    Pagination
  },
  props: {
    tab: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isCreate: true,
      updateVisible: false,
      detailVisible: false,
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
    // 查看
    viewHandle(item) {
      this.itemObj = item
      this.detailVisible = true
    },
    // 撤回
    async revertHandle(item) {
      await this.$confirm('你确定要撤回么？')
      const res = await del(item.id)
      this.$message.success(res.msg)
    }
  }
}
</script>
