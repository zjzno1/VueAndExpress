<style scoped>
	.top {
		margin-top: 2rem;
	}
	.title {
		height: 2rem;
		line-height: 2rem;
		/*font-size: 2rem;*/
	}
	.box-card {
		margin-top: 5rem;
	}
</style>
<template>
	<div>
	<el-row :gutter="20">
		<el-col :span="15" :offset="1">
			<div class="top">
				<el-row>
					<el-col :span="4">
						<span class="title">2017034期开奖：</span>
					</el-col>
					<el-col :span="1" v-for="item in data">
						<ball :data="item"></ball>
					</el-col>
					<el-col :span="3" :offset="1">
						<router-link to="/history"><el-button type="success">历史开奖</el-button></router-link>
					</el-col>
				</el-row>
			</div>
			<div class="next">
				<el-row>
					<el-col :span="11">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
							    <span style="line-height: 1rem;">出现概率查询(/次)</span>
							</div>
						</el-card>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
							    <span style="line-height: 1rem;">下注推荐</span>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>
		</el-col>
		<el-col :span="7">
			<div class="top">
				asdfasdf 
			</div>
		</el-col>
	</el-row>
		<!-- <router-link to="/hello"><el-button to="/hello"type="success">成功按钮</el-button></router-link>
		<el-input v-model="msg" placeholder="请输入内容" @change="onInput"></el-input> -->
	</div>
</template>
<script>
	import ball from '../components/ball'
	export default {
	  data() {
	    return {
	      msg: '',
	      // data: {
	      // 	num: 1,
	      // 	color: 'red'
	      // }
	      data: [{
	      	num: 1,
	      	color: 'red'
	      },{
	      	num: 2,
	      	color: 'red'
	      },{
	      	num: 3,
	      	color: 'red'
	      },{
	      	num: 4,
	      	color: 'red'
	      },{
	      	num: 5,
	      	color: 'red'
	      },{
	      	num: 6,
	      	color: 'red'
	      },{
	      	num: 7,
	      	color: 'blue'
	      }]
	    }
	  },
	  components: {
			ball
		},
	  methods: {
	  	onInput: function() {
	  		if (this.msg) {
	          this.$emit('message', this.msg);
	        }
	  	}
	  }
	}
</script>