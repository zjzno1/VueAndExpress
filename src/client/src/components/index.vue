<template>
	<div>
		<router-link to="/hello"><el-button to="/hello"type="success">成功按钮</el-button></router-link>
		<el-input v-model="msg" placeholder="请输入内容" @change="onInput"></el-input>
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
	      msg: ''
	    }
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