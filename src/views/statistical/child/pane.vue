<template>
  <div class="">
    <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"/>
      <el-button type="primary" size="medium" icon="el-icon-search" @click="searchHandle" >查询</el-button>
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
      <el-table-column label="日期" width="200" >
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="商品销量" width="110" align="center">
        <template slot-scope="scope">
          ¥<span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台营收" width="110" align="center">
        <template slot-scope="scope">
          ¥<span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="门店收益" width="110" align="center">
        <template slot-scope="scope">
          ¥<span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="流水" width="110" align="center">
        <template slot-scope="scope">
          ¥<span>{{ scope.row.num }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <add :visible.sync="addVisible" />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Add from './add'
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
    Add,
    Pagination
  },
  data() {
    return {
      dateRange: '',
      addVisible: false,
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
    searchHandle() {
      this.fetchData()
    }
  }
}
</script>
