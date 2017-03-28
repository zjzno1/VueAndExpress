<style>
html,body {
  height: 100%;
}
#app {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}
.footer {
  height: 3rem;
  line-height: 3rem;
  padding-left: 3rem;
  background-color: #324157;
  color: #BFCBD9;
  margin-top: 5rem;
}
</style>
<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">双色球</el-menu-item>
      <el-menu-item index="2">敬请期待</el-menu-item>
    </el-menu>
    <router-view></router-view>
    <el-col>
    <div class="footer">
      @copyright
    </div>
    </el-col>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    created() {
      this.$http.post('http://localhost:3000/getData').then((res) => {
        console.log(res)
      });
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(key==1) {
          this.$router.push({path:'/'})
        }
        if(key==2) {
          this.$router.push({path:'/comingSoon'})
        }
      },
      tz() {
        // this.$router.go('/hello');
        this.$router.push({path:'/hello'})
      }
    }
  }
</script>
