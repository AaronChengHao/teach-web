<template>
  <div class="app-container">
    <div style="padding: 20px;">
      <!--    <el-button size="mini" type="success" @click="handleCreate(row)">-->
      <!--      创建-->
      <!--    </el-button>-->
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="课程名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.course.name }}
        </template>
      </el-table-column>
      <el-table-column label="课程价格" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.student.name }}
        </template>
      </el-table-column>
      <el-table-column label="发起老师" align="center">
        <template slot-scope="scope">
          {{ scope.row.teacher.name }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status_class">{{ scope.row.status_text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.pay_at }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handlePay(row)" v-if="row.status == 2">
            支付
          </el-button>
          <el-button size="mini" :disabled="true" v-if="row.status == 3">
            已支付
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="fetchData"
    />
    <el-dialog title="请输入卡信息" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="creditCard" label-position="left" label-width="80px"
               style=" margin-left:20px;"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="creditCard.name"></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="number">
          <el-input v-model="creditCard.number"></el-input>
        </el-form-item>
        <el-form-item label="到期月份" prop="expirationMonth">
          <el-select v-model="creditCard.expirationMonth" placeholder="请选择月份">
            <el-option v-for="month in 12" :key="month" :label="month" :value="month"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期年份" prop="expirationYear">
          <el-date-picker
            v-model="creditCard.expirationYear"
            type="year"
            value-format="yyyy"
            placeholder="请选择到期年份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="creditCard.city"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postalCode">
          <el-input v-model="creditCard.postalCode"></el-input>
        </el-form-item>
        <el-form-item label="安全码" prop="securityCode">
          <el-input v-model="creditCard.securityCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pay"  :loading="payLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getInvoiceList, createInvoice, getCourseList, getStudentList, omiseCardPay } from '@/api/student'
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
      dialogStatus: '',
      dialogFormVisible: false,
      payLoading: false,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0,
      creditCard: {
        id: undefined,
        name: undefined,
        number: undefined,
        expirationMonth: undefined,
        expirationYear: undefined,
        city: undefined,
        postalCode: undefined,
        securityCode: undefined
      },
      rules: {
        name: [{ required: true, message: '姓名 必须输入', trigger: 'change' }],
        number: [{ required: true, message: '卡号 必须输入', trigger: 'blur' }],
        expirationMonth: [{ required: true, message: '月份 必须输入', trigger: 'blur' }],
        expirationYear: [{ required: true, message: '年份 必须输入', trigger: 'blur' }],
        city: [{ required: true, message: '城市 必须输入', trigger: 'blur' }],
        postalCode: [{ required: true, message: '邮编 必须输入', trigger: 'blur' }],
        securityCode: [{ required: true, message: '安全码 必须输入', trigger: 'blur' }]
      },
      courses: [],
      students: []
    }
  },
  components: { Pagination },
  created() {
    this.fetchData()
    this.fetchCourses()
    this.fetchStudents()
  },
  methods: {
    fetchCourses() {
      getCourseList({ size: 1000 }).then(res => {
        this.courses = res.data.data
      })
    },
    fetchStudents() {
      getStudentList({ size: 1000 }).then(res => {
        this.students = res.data.data
      })
    },
    fetchData() {
      this.listLoading = true
      getInvoiceList({ page: this.listQuery.page, size: this.listQuery.limit }).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
        this.listQuery.page = response.data.current_page
        this.listQuery.total = response.data.total
      })
    },
    async createData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          await createInvoice(this.temp)
          this.dialogFormVisible = false
          this.fetchData()
        }
      })
    },
    handleCreate() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    async handleDelete(id) {
      await deleteCourse(id)
      this.fetchData()
    },
    pay() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.payLoading = true
          omiseCardPay(this.creditCard.id, this.creditCard).then(() => {
            this.dialogFormVisible = false
            this.payLoading = false
            this.creditCard = Object.assign({}, this.creditCard) // copy obj
            this.fetchData()
          }).catch(() => {
            this.payLoading = false
          })
        }
      })
    },
    handlePay(row) {
      this.dialogFormVisible = true
      this.creditCard.id = row.id
    },
    updateData() {
      this.$refs['dataForm'].validate(async(valid) => {
        if (valid) {
          await updateCourse(this.temp, this.temp.id)
          this.dialogFormVisible = false
          this.fetchData()
        }
      })
    }
  }
}
</script>
