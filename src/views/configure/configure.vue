<template>
    <div class="user-list-container">
      <el-row :gutter="24">
        <el-col :span="6" :offset="18" class="text-right">
          <el-button type="primary" @click="addClick">添加密钥</el-button>
        </el-col>
      </el-row>
      <el-table
              class="table"
              v-loading="loading"
              element-loading-text="拼命加载中"
              :data="keyConfigureList"
              border
              >
          <el-table-column
                  prop="name"
                  label="密钥名称"
                  width="90"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="platform"
                  label="云平台"
                  width="90"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="appid"
                  label="appid"
                  width="110"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop="appkey"
                  label="appkey"
                  align="center">
          </el-table-column>
          <el-table-column
                  prop=""
                  label="操作"
                  width="215"
                  align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="changeMobileClick(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>
      <div class="text-center" v-show="total_num>=10">
          <el-pagination
                  background
                  @current-change="paginationChange"
                  layout="total, prev, pager, next, jumper"
                  :current-page.sync="page"
                  :total="total_num">
          </el-pagination>
      </div>
      <el-dialog title="增加密钥" :visible.sync="addKeyConfigureFormVisible">
          <el-form ref="addKeyConfigureForm" :model="addKeyConfigureForm" label-width="70px" :rules="addKeyConfigureRule">
              <el-form-item label="密钥名称" prop="name">
                  <el-input v-model="addKeyConfigureForm.name" placeholder="请输入密钥名称"></el-input>
              </el-form-item>
              <el-form-item label="云平台" prop="platform">
                  <el-input v-model="addKeyConfigureForm.platform" placeholder="请输入云平台"></el-input>
              </el-form-item>
              <el-form-item label="appid" prop="appid">
                  <el-input v-model="addKeyConfigureForm.appid" placeholder="请输入appid"></el-input>
              </el-form-item>
              <el-form-item label="appkey" prop="appkey">
                  <el-input v-model="addKeyConfigureForm.appkey"  type="password" placeholder="请输入appkey"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="addKeyConfigureFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitAddClick">确 定</el-button>
          </div>
      </el-dialog>
      <el-dialog title="修改密钥信息" :visible.sync="changeKeyConfigureFormVisible">
          <el-form ref="changeKeyConfigureForm" :model="changeKeyConfigureForm" label-width="70px" :rules="addKeyConfigureRule">
              <el-form-item label="密钥名称">
                  <el-input v-model="changeKeyConfigureForm.name" placeholder="请输入密钥名称"></el-input>
              </el-form-item>
              <el-form-item label="云平台">
                  <el-input v-model="changeKeyConfigureForm.platform" placeholder="请输入云平台"></el-input>
              </el-form-item>
              <el-form-item label="appid">
                  <el-input v-model="changeKeyConfigureForm.appid" placeholder="请输入appid"></el-input>
              </el-form-item>
              <el-form-item label="appkey">
                  <el-input v-model="changeKeyConfigureForm.appkey" placeholder="请输入appkey"></el-input>
              </el-form-item> 
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="changeKeyConfigureFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitChangeKeyConfigureClick">确 定</el-button>
          </div>
      </el-dialog>
    </div>
</template>

<script>
import { getKeyConfigure, deleteKeyConfigure, addKeyConfigure, updateKeyConfigure } from '@/api/configure'

export default {
  data() {
    return {
      name: '',
      total_num: 0,
      page: 1,
      loading: true,
      addUserForm: {
        id: '',
        name: '',
        platform: '',
        appid: '',
        appkey: ''
      },
      addKeyConfigureRule: {
        name: [
          { required: true, message: '请输入密钥名称', trigger: 'blur' }
        ],
        platform: [
          { required: true, message: '请输入云平台', trigger: 'blur' }
        ],
        appid: [
          { required: true, message: '请输入appid', trigger: 'blur' }
        ],
        appkey: [
          { required: true, message: '请输入appkey', trigger: 'blur' }
        ]
      },
      addKeyConfigureFormVisible: false, // 增加用户弹框
      changeKeyConfigureFormVisible: false,
      changeKeyConfigureForm: {},
      addKeyConfigureForm: {},
      keyConfigureList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getKeyConfigure({ page: this.page }).then(res => {
        this.keyConfigureList = res.results
        this.total_num = res.count
        this.loading = false
      })
    },
    searchClick() {
      this.page = 1
      this.fetchData()
    },
    paginationChange(val) {
      this.page = val
      this.fetchData()
    },
    deleteClick(row) {
      this.$confirm('此操作将删除用户 “' + row.name + '” , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteKeyConfigure(row.id).then(response => {
          this.$message({
            message: '删除用户 “' + row.name + '” 成功',
            type: 'success'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    },
    addClick() {
      this.addKeyConfigureFormVisible = true
      if (this.$refs['addKeyConfigureForm'] !== undefined) {
        this.$refs['addKeyConfigureForm'].resetFields()
      }
    },
    submitAddClick() {
      this.$refs['addKeyConfigureForm'].validate((valid) => {
        if (!valid) {
          return
        }
        const params = Object.assign({}, this.addKeyConfigureForm)
        addKeyConfigure(params).then(res => {
          this.addKeyConfigureFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    changeMobileClick(row) {
      this.changeKeyConfigureFormVisible = true
      this.changeKeyConfigureForm = row
    },
    submitChangeKeyConfigureClick() {
      this.$refs['changeKeyConfigureForm'].validate((valid) => {
        if (!valid) {
          return
        }
        updateKeyConfigure(this.changeKeyConfigureForm.id, this.changeKeyConfigureForm).then(() => {
          this.changeKeyConfigureFormVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    }
  }
}
</script>

