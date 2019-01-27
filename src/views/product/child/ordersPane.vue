<template>
  <div class="">
    <div class="filter-container">
      <el-input v-model="listQuery.search" placeholder="请输入订单号" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchHandle" />
      </el-input>
      <!-- <el-button type="primary" size="medium" icon="el-icon-edit" @click="addVisible=true" >添加</el-button> -->
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
      <el-table-column label="商品" width="95">
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
      <el-table-column label="订单号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="已付金额" width="110" align="center">
        <template slot-scope="scope">
          ¥ {{ scope.row.num }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="物流信息" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.province }} {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="收货信息" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.province }} {{ scope.row.city }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="收货时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="tab.key === 'tabPane4'" type="primary" size="mini" @click="sendPostHandle(scope.row)">发货</el-button>
          <el-button size="mini" type="success" @click="viewHandle(scope.row)" >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    <send-post-modal :visible.sync="sendPostVisible" :form-obj="itemObj"/>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import SendPostModal from './orders/sendPost'
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
    SendPostModal,
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
      addVisible: false,
      sendPostVisible: false,
      itemObj: {},
      listQuery: {
        page: 1,
        limit: 20,
        search: '',
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
    },
    viewHandle(item) {
      this.$message.error('暂无视图显示')
    },
    // 新增
    createHandle() {
      this.isCreate = true
      this.updateVisible = true
    },
    // 发货
    sendPostHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.sendPostVisible = true
    }
  }
}
</script>
