<template>
  <div class="user-list-container">
    <el-col :span="6" :offset="0" class="text-left">
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" size="small" icon="el-icon-download" round  @click="handleDownload">Export Excel</el-button>
    </el-col>
    <el-col :span="6" :offset="12" class="text-right">
      <el-button class="text-right" type="primary" plain style="margin:0 0 20px 20px; text-align: right;" @click="updateAliyunInstance">更新</el-button>
    </el-col>
    <el-table
      :data="AliyunInstanceList"
      border
      style="width: 100%"
      height="250">
      <el-table-column
        fixed
        prop="instanceid"
        label="实例id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="instancename"
        label="实例名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="instancetype"
        label="实例类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="hostname"
        label="主机名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="regionid"
        label="区域"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zoneid"
        label="实例可用区"
        width="120">
      </el-table-column>
          <el-table-column
        prop="osname"
        label="OS"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ostype"
        label="os类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="cpu"
        label="cpu"
        width="120">
      </el-table-column>
      <el-table-column
        prop="memory"
        label="内存"
        width="120">
      </el-table-column>
      <el-table-column
        prop="public_ip"
        label="公网ip"
        width="120">
      </el-table-column>
      <el-table-column
        prop="primary_ip"
        label="内网ip"
        width="120">
      </el-table-column>
      <el-table-column
        prop="staus"
        label="运行状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="exprire_time"
        label="过期时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="启动时间"
        width="200">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getAliyunInstance, updatAliyunInstance } from '@/api/cmdb'

  export default {
    data() {
      return {
        AliyunInstanceList: [{
          instanceid: '',
          instancename: '',
          instancetype: '',
          hostname: '',
          regionid: '',
          zoneid: '',
          osname: '',
          ostype: '',
          cpu: '',
          memory: '',
          public_ip: '',
          primary_ip: '',
          create_time: '',
          exprire_time: '',
          start_time: ''
        }],
        downloadLoading: false,
        filename: '',
        autoWidth: true,
        bookType: 'xlsx'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.loading = true
        getAliyunInstance({ page: this.page }).then(res => {
          this.AliyunInstanceList = res.results
          this.total_num = res.count
          this.loading = false
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['instanceid', 'instancename', 'instancetype', 'hostname', 'regionid', 'zoneid', 'osname', 'ostype', 'cpu', 'memory', 'public_ip', 'primary_ip', 'status', 'create_time', 'exprire_time', 'start_time']
          const filterVal = ['instanceid', 'instancename', 'instancetype', 'hostname', 'regionid', 'zoneid', 'osname', 'ostype', 'cpu', 'memory', 'public_ip', 'primary_ip', 'status', 'create_time', 'exprire_time', 'start_time']
          const list = this.AliyunInstanceList
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          return v[j]
        }))
      },
      updateAliyunInstance() {
        this.loading = true
        updatAliyunInstance({}).then(res => {
          this.fetchData()
        })
      }
    }
  }

</script>
