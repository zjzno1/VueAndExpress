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
		height: 16rem;
		margin-top: 5rem;
		padding-bottom: 1rem;
	}
	.msg {
		font-size: 1rem;
		padding-top: 0.5rem;
	}
	.msg2 {
		font-size: 1rem;
		padding-top: 1rem;
	}
	.red {
		color: red;
	}
	.card-body {
		margin-top: 0.5rem;
	}
	.num {
		margin-top: 0.5rem;
	}
	.select {
		width: 100%;
	}
	.top-1 {
		margin-top: 1.5rem;
	}
	.scroll {
		overflow: scroll;
	}
</style>
<template>
	<el-row>
		<el-col :span="15" :offset="1">
			<el-col>
				<div class="top" v-if="newest!=null">
						<el-col :span="6">
							<span class="title">{{newest.stage}}期({{newest.date}})开奖：</span>
						</el-col>
						<el-col :span="1" v-for="item in newest.ball">
							<ball :data="item"></ball>
						</el-col>
						<el-col :span="3" :offset="1">
							<router-link to="/history"><el-button type="success">历史开奖</el-button></router-link>
						</el-col>
					
				</div>
			</el-col>
			<div class="next">
				<el-col>
					<el-col :span="11">
						<el-card class="box-card scroll">
							<div slot="header" class="clearfix">
							    <span style="line-height: 1rem;">出现概率查询(/次)</span>
							</div>
							<el-col :span="18">
								<el-input v-model="inputOne" placeholder="近x期内各个球出现的次数"></el-input>
							</el-col>
							<el-col :span="4" :offset="2">
								<el-button type="primary" @click="searchOne">查询</el-button>
							</el-col>
							<el-col>
								<div class="msg red">共{{totalNum}}期</div>
							</el-col>
							<el-col>
								<div class="msg2">每个球出现的次数</div>
							</el-col>
							<el-col>
								<div class="card-body">
									<el-col class="top-1" :span="3" v-for="item in data">
										<ball :data="item"></ball>
										<div class="num">{{item.frequency}}</div>
									</el-col>
								</div>
							</el-col>
						</el-card>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
							    <span style="line-height: 1rem;">下注推荐</span>
							</div>
							<el-col>
								<el-select v-model="value" placeholder="请选择">
								    <el-option
								      v-for="item in options"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
							</el-col>
							<!-- <el-col class="top-1">
								<el-col :span="3" v-for="item in data">
									<ball :data="item"></ball>
								</el-col>
							</el-col>
							<el-col class="top-1">
								<el-col :span="3" v-for="item in data">
									<ball :data="item"></ball>
								</el-col>
							</el-col> -->
						</el-card>
					</el-col>
				</el-col>
				<el-col>
					<el-col :span="11">
						<el-card class="box-card">
							<div slot="header" class="clearfix">
							    <span style="line-height: 1rem;">查询是否中过大奖</span>
							</div>
							<el-col :span="18">
								<el-input v-model="inputTwo" placeholder="查询是否中过大奖"></el-input>
							</el-col>
							<el-col :span="4" :offset="2">
								<el-button type="primary" @click="searchTwo">查询</el-button>
							</el-col>
						</el-card>
					</el-col>
					<el-col :span="11" :offset="2">
						<el-card class="box-card scroll">
							<div slot="header" class="clearfix">
							    <span style="line-height: 1rem;">重复中奖号码</span>
							</div>
							<span>暂无</span>
						</el-card>
					</el-col>
				</el-col>
			</div>
		</el-col>
		<el-col :span="6" :offset="1">
			<div class="top">
				asdfasdf 
			</div>
		</el-col>
		<!-- <router-link to="/hello"><el-button to="/hello"type="success">成功按钮</el-button></router-link>
		<el-input v-model="msg" placeholder="请输入内容" @change="onInput"></el-input> -->
	</el-row>
</template>
<script>
	import ball from '../components/ball'
	export default {
	  data() {
	    return {
	      msg: '',
	      inputOne: '',
	      inputTwo: '',
	      newest: null,
	      value: '',
	      totalNum: null,
	      data: null,
	      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
	    }
	  },
	  components: {
			ball
		},
	  created() {
	  	this.$http.post('http://localhost:3000/nowNum').then(function(res) {
	  		this.newest = res.data;
	  		console.log(1,res.data)
	  	})
	  	this.$http.post('http://localhost:3000/getData').then(function(res) {
	  		this.totalNum = res.data.totalNum;
	  	})
	  	this.$http.post('http://localhost:3000/haveWin').then(function(res) {
	  		console.log(111,res.data.data)
	  	})
	  },
	  methods: {
	  	onInput: function() {
	  		if (this.msg) {
	          this.$emit('message', this.msg);
	        }
	  	},
	  	searchOne: function() {
	  		this.$http.post('http://localhost:3000/number',{num: this.inputOne}).then(function(res) {
	  			this.data = res.data;
		  		console.log(res.data)
		  	})
	  	},
	  	searchTwo: function() {
	  		this.$http.post('http://localhost:3000/search',{value: this.inputTwo}).then(function(res) {
	  			this.data = res.data;
		  		console.log(222,res.data.data)
		  	})
	  	}
	  }
	}
</script>