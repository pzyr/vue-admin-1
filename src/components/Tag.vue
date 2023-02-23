<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !=='home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="closeMenu(item,index)"
      size="large">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {}
  },
  computed:{
    ...mapState({
        tags:state => state.tab.tabsList
    })
  },
  methods:{
    ...mapMutations(['closeTag']),
    changeMenu(item){
      this.$router.push(item.path)
    },
    closeMenu(item,index){
      this.closeTag(item)
      const length = this.tags.length
      if(item.name !== this.$route.name){
        return
      }
      if(index === length){
        this.$router.push({
          name:this.tags[index-1].name
        })
      }else{
        this.$router.push({
          name:this.tags[index].name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .tabs{
    padding:20px;
    .el-tag{
      margin-left: 15px;
      cursor:pointer;
    }
  }
</style>