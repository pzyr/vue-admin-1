<template>
  <el-row>
    <el-col :span="8" style="padding-right:10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.jpg" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-12-29</span></p>
          <p>上次登录地点：<span> 山西介休</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px;height:460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"/>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left:10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{item.value}}</p>
              <p class="desc">{{item.name}}</p>
            </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <div ref="echarts1" style="height:280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div ref="echarts2" style="height:260px"></div>
        </el-card>
        <el-card style="height:260px">
          <div ref="echarts3" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts';
export default {
  data() {
    return {
      tableData:[],
      tableLabel:{
        name:'课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData:[
        {
          name:"今日支付订单",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"今日支付订单2",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"今日支付订单3",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"今日支付订单4",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"今日支付订单5",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"今日支付订单6",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
      ]
    };
  },
  mounted(){
    getData().then(({data})=>{
      const {tableData } = data.data
      this.tableData = tableData
      // 基于准备好的dom，初始化echarts实例
      var echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图表的配置项和数据
      var option1 = {}
      //处理数据x轴
      const {orderData,userData,videoData}=data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = {
        data:xAxis
      }
      option1.tooltip = {}
      option1.xAxis = xAxisData
      option1.yAxis = {}
      option1.legend = xAxisData  
      option1.series = []
      xAxis.forEach (key =>{
        option1.series.push({
          name:key,
          data:orderData.data.map(item =>item[key]),
          type:'line'
        })
      })
      // 使用刚指定的配置项和数据显示图表。
      echarts1.setOption(option1);
      console.log(data.data)

      // 基于准备好的dom，初始化echarts实例
      var echarts2 = echarts.init(this.$refs.echarts2);
      // 指定图表的配置项和数据
      var option2 = {
        legend:{
          textStyle:{
            color:"#333",
          },
        },
        grid:{
          left:"20%",
        },
        tooltip:{
          trigger:"axis",
        },
        xAxis:{
          type:"category",
          data:userData.map(item => item.date),
          axisLine:{
            lineStyle:{
            color:"#17b3a3",
            },
          },
          axisLabel:{
            interval:0,
            color:"#333",
          },
        },
        yAxis:[
          {
            type:"value",
            axisLine:{
              lineStyle:{
              color:"#17b3a3",
              },
            },
          },
        ],
        color:["#2ec7c9","#b6a2de"],
        series:[
          {
            name:"新增用户",
            data:userData.map(item => item.new),
            type:"bar"
          },
          {
            name:"活跃用户",
            data:userData.map(item => item.active),
            type:"bar"
          }
        ],
      }
      echarts2.setOption(option2);

      var echarts3 = echarts.init(this.$refs.echarts3);
      var option3 = {
        tooltip:{
          trigger:"item"
        },
        color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series:[
          {
            data:videoData,
            type:'pie'
          }
        ],
      }
       echarts3.setOption(option3);
    })
  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }
  .detail{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price{
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
}
.graph{
  display:flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card{
    width:48%
  }
}
</style>
