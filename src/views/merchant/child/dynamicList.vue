<template>
  <div >

    <div class="filter-container clearfix" style="height:44px;background:#f9f9f9; border:1px solid #e3e3e3;margin-bottom:15px;">
      <h3 >动态列表</h3>
      <el-button type="danger" class="close_button" icon="el-icon-close" size="small" circle @click="goBack"/>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="ID" width="110">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="动态详情" align="center">
        <template slot-scope="scope">
          <p class="line-clamp2">{{ scope.row.content }}</p>
        </template>
      </el-table-column>
      <el-table-column label="今日获赞" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="总获赞" align="center">
        <template slot-scope="scope">
          <p class="line-clamp2">{{ scope.row.num }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="viewHandle(scope.row)" >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <dynamic-detail :visible.sync="detailVisible" :form-obj="itemObj" />
  </div>

</template>

<script>
import { getList } from '@/api/table'
import DynamicDetail from './dynamicDetail'
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
    DynamicDetail,
    Pagination
  },
  data() {
    return {
      isCreate: true,
      addVisible: false,
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
    goBack() {
      window.history.back()
    },
    // 查看
    viewHandle(item) {
      this.itemObj = item
      this.detailVisible = true
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
