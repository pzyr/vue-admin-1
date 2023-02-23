<template>
  <div class="building">
    <div class="login_box">
      <span>
        <h2 class="login-title">用户登录</h2>
      </span>
      <el-form ref="form" :model="form" label-width="70px" :rules="formRules">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login('form')">登录</el-button>
          <el-button type="info" @click="resetform()">重置</el-button>
          <el-button type="info" @click="goform()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getLogin } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      // 这是表单的验证规则对象
      formRules: {
        // 验证用户名是否合法
        username: [
          {
            required: true,
            message: "请输入用户名",
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
            message: "请输入登录密码",
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
    goform() {
      this.$router.push("/register");
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getLogin({ params: this.form }).then((data) => {
            console.log(data);
            if (data.data.result == true) {
              const token = Mock.Random.guid();
              Cookie.set("token", token);
              this.$router.push("/home");
            } else {
              this.$message.error("密码错误");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.building {
  background: url("./images/1620031I3-5.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: transparent;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff8dc;
  padding: 25px;
  .login-title {
    color: #87ceeb;
    text-align: center;
    padding-bottom: 10px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>