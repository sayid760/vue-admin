<template>
  <div class="container">
    <el-form :inline="true" :model="dataForm">
      <div class="handle-box">
        <el-button type="primary" size="small"  @click="addOrUpdateHandle(true)">新增</el-button>
      </div>
    </el-form>
    <el-table  :data="dataList"  border  style="width: 100%;">
      <table-tree-column  prop="name"  header-align="center"  treeKey="menuId"  width="150"  label="名称"></table-tree-column>
      <el-table-column  prop="parentName"  header-align="center"  align="center"  width="120"  label="上级菜单">
      </el-table-column>
      <el-table-column  header-align="center"  align="center"  label="图标">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon || ''" ></svg-icon>
        </template>
      </el-table-column>
      <el-table-column  prop="type"  header-align="center"  align="center"  label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column  prop="orderNum"  header-align="center"  align="center"  label="排序号">  </el-table-column>
      <el-table-column  prop="path"  header-align="center"  align="center"  width="150"  :show-overflow-tooltip="true"  label="菜单Url"></el-table-column>
      <el-table-column  prop="perms"  header-align="center"  align="center"  width="150"  :show-overflow-tooltip="true"  label="授权标识"></el-table-column>
      <el-table-column  fixed="right"   header-align="center"  align="center"   width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(false, scope.row)">修改</el-button>
          <el-button  type="text" size="small" @click="deleteHandle(scope.row.menuId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import AddOrUpdate from './menu-add-or-update'
  import { treeDataTranslate , checkPermission } from '@/utils'
  import { getList } from '@/api/menu'

  export default {
    name:"MenuList",
    data () {
      return {
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      TableTreeColumn,
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        getList().then(({data}) => {
          //权限过滤
          const dataList = data.filter(item=>{
            if(item.roles === undefined){
              item.roles = this.$store.getters.roles
            }
           return checkPermission(item.roles)
          })
          this.dataList = treeDataTranslate(dataList, 'menuId')
          this.dataListLoading = false
        })
      },
      addOrUpdateHandle(...val) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(val)
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
