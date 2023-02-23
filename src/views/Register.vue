<template>
  <div class="building">
    <div class="login_box">
      <span>
        <h1 class="login-title">用户注册</h1>
      </span>
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitform()">提交</el-button>
          <el-button @click="resetform()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getLogin1, addRegister } from "../api";
export default {
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.form.username !== "") {
          getLogin1({ params: { username: this.form.username } }).then(
            (data) => {
              console.log(data);
              if (data.data.result == true) {
                callback(new Error("用户名已注册"));
              } else {
                callback();
              }
            }
          );
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            validator: validatename,
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetform() {
      this.$refs.form.resetFields();
    },
    submitform() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addRegister({
              username: this.form.username,
              password: this.form.password,
          }).then((data) => {
            console.log(data);
          });
          alert("注册成功");
          this.$router.push("/login");
        } else {
          console.log("error submit!!");
          return this.$message.error("注册失败！");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.building{
  background:url("./images/1620031I3-5.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #FFF8DC;
  padding: 25px;
  opacity: 0.8;
  .login-title {
    color: #87ceeb;
    text-align: center;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>