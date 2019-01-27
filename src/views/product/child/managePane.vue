<template>
  <div class="">
    <div v-show="$route.name==='ProductManage'" class="app_page">
      <div class="filter-container">
        <el-button type="primary" size="medium" icon="el-icon-edit" @click="routeAdd" >添加</el-button>
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
        <el-table-column label="成本" width="110" align="center">
          <template slot-scope="scope">
            ¥ {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column label="售价" width="110" align="center">
          <template slot-scope="scope">
            ¥ {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="单件利润（平台）" width="110" align="center">
          <template slot-scope="scope">
            ¥ {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="返积分" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="销量" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="设为礼品" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="库存" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="来源" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="上架时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="tab.key === 'tabPane1'" type="primary" size="mini" @click="allotHandle(scope.row)" >分配</el-button>
            <el-button v-if="tab.key === 'tabPane2'" type="primary" size="mini" > 补货</el-button>
            <el-button v-if="tab.key === 'tabPane3'" type="primary" size="mini" @click="upHandle" >上架</el-button>
            <el-button v-if="tab.key === 'tabPane1'" type="danger" size="mini" @click="downHandle" >下架</el-button>
            <a style="padding-left:10px;" href="http://www.baidu.com" target="_blank" size="mini" type="success" >来源</a>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    </div>
    <allot-modal :visible.sync="allotVisible" :form-obj="itemObj"/>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import AllotModal from './manage/allotList'
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
    AllotModal,
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
      itemObj: {},
      allotVisible: false,
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
    // 分配
    allotHandle(item) {
      this.isCreate = false
      this.itemObj = item
      this.allotVisible = true
    },
    // 上架
    async upHandle(item) {
      await this.$confirm('你确定要上架么？')
      const res = await del(item.id)
      this.$message.success(res.msg)
    },
    // 下架
    async downHandle(item) {
      await this.$confirm('你确定要下架么？')
      const res = await del(item.id)
      this.$message.success(res.msg)
    },
    // 跳转到添加商品
    routeAdd() {
      this.$router.push(this.$route.path + '/add')
    }
  }
}
</script>
