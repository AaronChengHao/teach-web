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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="课程名称">
        <template slot-scope="scope">
          {{ scope.row.course.name }}
        </template>
      </el-table-column>
      <el-table-column label="课程价格"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.student.name }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status_text }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleSend(row)" v-if="row.status == 1">
            发送
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
        <el-form-item label="课程" prop="course_id">
          <el-select v-model="temp.course_id" placeholder="请选择课程">
            <el-option :label="k.name" :value="k.id" v-for="k , _ in courses"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生" prop="student_id">
          <el-select v-model="temp.student_id" placeholder="请选择学生">
            <el-option :label="k.name" :value="k.id" v-for="k , _ in students"></el-option>
          </el-select>
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
import { getInvoiceList, createInvoice, deleteInvoice,getCourseList,getStudentList,sendInvoice } from '@/api/teacher'
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
      },
      total: 0,
      temp: {
        id: undefined,
        course_id: undefined,
        student_id: undefined,
      },
      rules: {
        course_id: [{ required: true, message: '课程 必须选择', trigger: 'change' }],
        student_id: [{ required: true, message: '学生 必须选择', trigger: 'blur' }],
      },
      courses:[],
      students:[]
    }
  },
  components: { Pagination },
  created() {
    this.fetchData()
    this.fetchCourses()
    this.fetchStudents()
  },
  methods: {
    fetchCourses(){
       getCourseList({size:1000}).then(res => {
         this.courses = res.data.data
       })
    },
    fetchStudents(){
      getStudentList({size:1000}).then(res => {
        this.students = res.data.data
      })
    },
    fetchData() {
      this.listLoading = true
      getInvoiceList({page:this.listQuery.page,size:this.listQuery.limit}).then(response => {
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
            await createInvoice(this.temp)
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
    handleSend(row) {
      this.$confirm('此操作将会把账单发送给学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用发送接口
        sendInvoice(row.id).then(response => {
          this.fetchData()
        })
      }).catch();

      // this.temp = Object.assign({}, row) // copy obj
      // this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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
