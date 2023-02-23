<template>
  <div>
    <el-button type="success" icon="el-icon-plus" @click="handleAddBtn()">新增数据</el-button>
    <el-button type="danger" icon="el-icon-delete" @click="handleDeleteBtn()">批量删除</el-button>
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%" :before-close="closeDialog">
      <el-form :model="form1" ref="form1" :rules="rules" :inline="true" label-width="80px" size="large">
        <el-form-item label="学号" prop="sno">
          <el-input v-model="form1.sno" autocomplete="off" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="form1.sname" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form1.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生年月" prop="birthdate">
          <el-date-picker v-model="form1.birthdate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="adress">
          <el-input v-model="form1.adress" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form1.phone" autocomplete="off" placeholder="请输入电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form1')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form1')">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-table ref="tb" :data="tableData" :header-cell-style="{background:'rgb(113 167 228)',color:'#fff'}"
				border style="width: 100%;" @selection-change="handleDetailSelectionChange">
				<el-table-column type="selection" align="center" width="50"></el-table-column>
				<el-table-column type="index" label="序号" align="center" width="70" prop="xh" :index="indexMethod">
				</el-table-column>
				<el-table-column prop="sno" align="center" label="学号">
					<template slot-scope="scope">
						<span>{{ scope.row.sno }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="sname" align="center" label="姓名">
					<template slot-scope="scope">
						<el-input v-if="scope.row.showEdit" v-model="scope.row.sname" placeholder="请输入姓名">
						</el-input>
						<span v-else>{{ scope.row.sname }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="sex" align="center" label="性别">
					<template slot-scope="scope">
						<el-select v-if="scope.row.showEdit" v-model="scope.row.sex" placeholder="请输入性别">
							<el-option label="男" value="男"></el-option>
							<el-option label="女" value="女"></el-option>
						</el-select>
						<span v-else>{{ scope.row.sex }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="birthdate" align="center" label="日期" width="200">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<el-date-picker v-if="scope.row.showEdit" v-model="scope.row.birthdate" type="date"
							placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 150px">
						</el-date-picker>
						<span style="margin-left: 10px" v-else>{{ scope.row.birthdate }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="adress" align="center" label="地址">
					<template slot-scope="scope">
						<el-input v-if="scope.row.showEdit" v-model="scope.row.adress" placeholder="请输入地址">
						</el-input>
						<span v-else>{{ scope.row.adress }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="phone" align="center" label="电话">
					<template slot-scope="scope">
						<el-input v-if="scope.row.showEdit" v-model="scope.row.phone" placeholder="请输入电话">
						</el-input>
						<span v-else>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column  align="center" width="120" label="操作">
					<template slot-scope="scope">
						<el-button v-if="!scope.row.showEdit" type="primary" icon="el-icon-edit" circle @click="showUpdate(scope.$index)">
						</el-button>
						<el-button v-if="!scope.row.showEdit" type="danger" icon="el-icon-delete" circle @click="deleteone(scope.row)">
						</el-button>
						<el-button v-if="scope.row.showEdit" type="text" style="color: #85ce61;"
							@click="submit(scope.row)">保存</el-button>
						<el-button v-if="scope.row.showEdit" type="text" style="color: red;"
							@click="cancelUpdate(scope.$index)">取消</el-button>
					</template>
				</el-table-column>
			</el-table>
      <div style=" margin-top: 10px;margin-left: 10px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pagenumber" :page-sizes="pageSizes" :page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="totalpage">
        </el-pagination>
			</div>
    </div>
  </div>
</template>

<script>
import {getTableData,addUser,editUser,delUser,delUser2} from '../api'
export default {
  data() {
    return {
      form1: {
        sno: "",
        sname: "",
        sex: "",
        birthdate: "",
        adress: "",
        phone: "",
      },
      dialogFormVisible: false,
      titleMap: {
        addEquipment: "添加用户信息", //根据自己内容定义名字
        editEquipment: "修改用户信息", //根据自己内容定义名字
      },
      dialogStatus: "",
      rules: {
          sno: [
            { required: true, message: '请输入学号', trigger: 'blur' },
          ],
          sname: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          birthdate: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          adress: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ], 
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
          ], 
      },
      tableData: [],
      pageSize:10,
      pagenumber:1,
			totalpage: 1,
			pageSizes: [3, 5, 10, 20, 30],
      sels: [], //sels为表格多选选中的数组
    };
  },
  mounted() {
		this.getList()
	},
  methods: {
    handleAddBtn() {
      this.dialogFormVisible = true;
      this.dialogStatus = "addEquipment";
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            	addUser(this.form1).then(()=>{
              this.getList()
            })
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false;
            this.$message({
							type: 'success',
							message: '新增成功！'
						})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      closeDialog(){
        this.resetForm('form1')
      },
      indexMethod(index) {
				return index + 1;
			},
      getList(){
        getTableData({params: {pageSize: this.pageSize,pagenumber: this.pagenumber}})
        .then(({data}) => {
							this.tableData = data.result
							this.totalpage = data.total.value
			  })
      },
      handleSizeChange(val) {
				// console.log(`每页 ${val} 条`)
				this.pageSize = val
				this.pagenumber = 1
				this.getList()
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`)
				this.pagenumber = val
				this.getList()
			},
      // 点击修改
			showUpdate(index) {
				this.$set(this.tableData[index], 'showEdit', true) // 这里要用$set方法，否则页面状态不更新
			},
      // 取消修改
			cancelUpdate(index) {
				this.$set(this.tableData[index], 'showEdit', false)
			},
      submit(row){
        editUser({"sno": row.sno,"sname": row.sname,"sex": row.sex,"birthdate": row.birthdate,"adress": row.adress,"phone": row.phone})
        .then((data)=>{
					console.log(data)
          this.getList()
        })
        this.$message({
					type: 'success',
					message: '修改成功！'
				})
      },
      //单个数据删除
			deleteone(row) {
					this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning',
						})
						.then(() => {
							this.$message({
								type: 'success',
								message: '删除成功!'
							})
							delUser({params:{sno:row.sno}}).then(()=>{
                this.getList()
								})
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
			},
      // 单选框选中数据
			handleDetailSelectionChange(val) {
				this.$refs.tb.sels = val;
					// console.log(val)
					// console.log(this.$refs.tb.sels)
			},
      // 批量删除数据
			handleDeleteBtn() {
					if (this.$refs.tb.sels && this.$refs.tb.sels.length == 0 || this.$refs.tb.sels == undefined) {
						this.$message.warning('请至少选择一条数据进行删除！')
					} else {
						this.$confirm("请确认是否删除该属性?", "提示", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning",
							})
							.then(() => {
								var snoList = [];
								for (var i = 0; i < this.$refs.tb.sels.length; i++) {
									var arr = this.$refs.tb.sels[i].sno;
									snoList.push(arr);
								}
								let val = this.$refs.tb.sels //sels为表格多选选中的数组
								if (val) {
									val.forEach((val, index) => { // 第一层循环就是循环我们选中的值
										this.tableData.forEach((v,i) => { //第二层循环就是循环我们this.tableData 中所有的值
											if (val.xh === v.xh) { //然后去判断，如果有一样的数据的话就进行删除
                          delUser2({data:snoList})
													.then(() => {
														this.getList()
													})
											}
										})
									})
								}
								this.$message({
									message: "删除成功！",
									type: "success",
								})
								this.$refs.tb.clearSelection();
							})
							.catch(() => {
								this.$message({
									type: 'info',
									message: '已取消删除',
								})
								this.$refs.tb.clearSelection();
							})
					}
				},
  },
};
</script>
