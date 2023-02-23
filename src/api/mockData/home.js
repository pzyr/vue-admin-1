import Mock from 'mockjs'

let List = []
export default{
  getStatisticalData:()=>{
    for(let i = 0;i <7;i++){
      List.push(
        Mock.mock({
          vivo:Mock.Random.float(100,8000,0,0),
          oppo:Mock.Random.float(100,8000,0,0),
          xiaomi:Mock.Random.float(100,8000,0,0),
          iphone:Mock.Random.float(100,8000,0,0),
          huawei:Mock.Random.float(100,8000,0,0), 
          meizu:Mock.Random.float(100,8000,0,0),
        })
      )
    }
    return{
      code:20000,
      data:{
        videoData:[
          {
            name:'vivo',
            value:2999
          },
          {
            name:'oppo',
            value:2999
          },
          {
            name:'xiaomi',
            value:2999
          },
          {
            name:'iphone',
            value:2999
          },
          {
            name:'huawei',
            value:2999
          },
        ],
        userData:[
            {
              date:'周一',
              new:5,
              active:200
            },
            {
              date:'周一',
              new:5,
              active:200
            },
            {
              date:'周一',
              new:5,
              active:200
            },
            {
              date:'周一',
              new:5,
              active:200
            },
            {
              date:'周一',
              new:5,
              active:200
            },
        ],
        orderData:{
          data:['2019001','2019002','2019003','2019004','2019005','2019006','2019007'],
          data:List
        },
        tableData:[
          {
            name:'oppo',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
          {
            name:'oppo',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
          {
            name:'oppo',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
          {
            name:'oppo',
            todayBuy:100,
            monthBuy:300,
            totalBuy:400
          },
        ],
      }
    }
  }
}