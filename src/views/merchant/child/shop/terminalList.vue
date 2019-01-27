terminaltable<!-- detail.vue -->
<template>
  <el-dialog :visible.sync="visible" :before-close="modalClose" :title="'门店号：'+formObj.short+ ' 门店名称：'+formObj.title" width="80%" @open="modalOpen" >
    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row>
        <!-- <el-table-column label="型号" width="110">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column> -->
        <el-table-column label="图片" width="110" align="center">
          <template slot-scope="scope">
            <div class="img_wrap60 text-center inline-block">
              <img :src="scope.row.image">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="终端编号" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.short }}
          </template>
        </el-table-column>
        <el-table-column label="型号" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="终端名称" align="center">
          <template slot-scope="scope">
            <p class="line-clamp2"> {{ scope.row.title }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="投放时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="投放天数" align="center">
          <template slot-scope="scope">
            <p class="line-clamp2"> {{ scope.row.num }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="scope.row.bool" type="primary" size="mini" >上架</el-button>
            <el-button v-else type="danger" size="mini" >下架</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    </div>

    <!-- <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="$emit('update:visible', false)">确定</el-button>
    </div> -->

  </el-dialog>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
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

  computed: {},

  created() {
  },

  methods: {
    modalOpen() {
      this.fetchData()
      console.log('打开了')
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        console.log(response.data.item)
        this.list = response.data.items
        this.total = response.data.total || 100
        this.listLoading = false
      })
    },
    createOrUpdate() {
      this.modalClose()
    },
    modalClose() {
      this.$emit('update:visible', false)
    }
  }
}

</script>
<style lang='scss' scoped>
.el-form-item{
    margin-bottom:10px;
}

</style>
