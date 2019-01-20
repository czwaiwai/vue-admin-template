<template>
  <div class="">
    <div class="filter-container">
      <el-button type="primary" size="medium" icon="el-icon-edit" @click="addVisible=true" >添加</el-button>
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
      <el-table-column label="礼品图" width="95">
        <template slot-scope="scope">
          <div class="img_wrap60 text-center inline-block">
            <img :src="scope.row.image">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称（id）" min-width="110" align="center">
        <template slot-scope="scope">
          <p><span>{{ scope.row.title }}</span><br >
          <span>{{ scope.row.id }}</span></p>
        </template>
      </el-table-column>
      <el-table-column label="成本" width="110" align="center">
        <template slot-scope="scope">
          ¥ {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="售价" width="110" align="center">
        <template slot-scope="scope">
          ¥ {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="单件利润（平台）" width="110" align="center">
        <template slot-scope="scope">
          ¥ {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="已分配门店" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="可分配库存" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.num }}
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
          <el-button type="primary" size="mini" >分配</el-button>
          <el-button type="primary" size="mini" >下架</el-button>
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
    }
  }
}
</script>
