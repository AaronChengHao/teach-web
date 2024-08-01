<template>
  <div class="app-container">
    <div style="padding: 20px;">
    <el-button size="mini" type="success" @click="handleCreate(row)">
      创建
    </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95" type="index">
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="价格"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年月" align="center">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="error" @click="handleDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />



    <el-dialog title="创建" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="temp.price" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker v-model="temp.date" type="date" placeholder="请选择日期" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCourseList, createCourse, deleteCourse, updateCourse } from '@/api/student'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

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
  data() {
    return {
      dialogStatus:'',
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        // sort: '+id'
      },
      total: 0,
      temp: {
        id: undefined,
        name:"",
        price:"",
        date:""
      },
      rules: {
        name: [{ required: true, message: '名称 必须输入', trigger: 'change' }],
        price: [{ required: true, message: '价格 必须输入', trigger: 'blur' }],
        date: [{ required: true, message:'日期必须选择' }]
      },
    }
  },
  components: { Pagination },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourseList({page:this.listQuery.page,size:this.listQuery.limit}).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
        this.listQuery.page = response.data.current_page;
        this.listQuery.total = response.data.total;
      })
    },
    async createData() {
      this.$refs['dataForm'].validate(async (valid) => {
          if (valid) {
            await createCourse(this.temp)
            this.dialogFormVisible = false;
            this.fetchData()
          }
      });
    },
    handleCreate() {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    async handleDelete(id) {
      await deleteCourse(id)
      this.fetchData()
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate( async (valid) => {
        if (valid) {
          await updateCourse(this.temp, this.temp.id)
          this.dialogFormVisible = false
          this.fetchData()
        }
      })
    },
  }
}
</script>
