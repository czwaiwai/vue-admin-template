table<!-- detail.vue -->
<template>
  <el-dialog :visible.sync="visible" :before-close="modalClose" title="从商品库中挑选礼品" width="80%" @open="modalOpen" >
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
        <el-table-column label="名称" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="成本" align="center">
          <template slot-scope="scope">
            <p class="line-clamp2"> ¥{{ scope.row.num }}</p>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="售价" align="center">
          <template slot-scope="scope">
            <p class="line-clamp2"> ¥{{ scope.row.num }}</p>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="单件利润" align="center">
          <template slot-scope="scope">
            <p class="line-clamp2"> ¥{{ scope.row.num }}</p>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="库存（商品）" align="center">
          <template slot-scope="scope">
            <p class="line-clamp2"> {{ scope.row.num }}</p>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="分配数量" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.bool" class="line-clamp2"> {{ scope.row.num }}</p>
            <el-input v-else v-model="scope.row.num" placeholder="请输入内容"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="scope.row.bool" type="danger" size="mini" @click="itemEditHandle(scope.row)" >编辑</el-button>
            <el-button v-else type="primary" size="mini" @click="itemSubmitHandle(scope.row)">添加</el-button>
          </template>
        </el-table-column>
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
import { del } from '@/api/form.js'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components: { Pagination },
  props: {
    visible: {
      type: Boolean,
      default: false
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
    },
    itemEditHandle(item) {
      item.bool = false
    },
    async itemSubmitHandle(item) {
      await this.$confirm('你确定要更新列表内容么？')
      const res = await del(item.id)
      item.bool = true
      this.$message.success(res.msg)
    }
  }
}

</script>
<style lang='scss' scoped>
.el-form-item{
    margin-bottom:10px;
}

</style>
