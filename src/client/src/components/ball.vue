<style scoped>
	.circle {
		height: 2rem;
		line-height: 2rem;
		width: 2rem;
		border-radius: 100%;
		text-align: center;
		color: #ffffff;
		font-weight: 700;
	}
	.red {
		background-color: red;
	}
	.blue {
		background-color: blue;
	}
</style>
<template>
	<div class="circle" :class="{red: isRed, blue: isBlue}">
		{{data.num}}
	</div>
</template>
<script>
export default {
	props: ['data'],
	  data() {
	    return {
	      msg: '',
	      isRed: false,
	      isBlue: false
	    }
	  },
	  created() {
	  	console.log(this.data.color)
	  	if(this.data.color=='red')
	  	{
	  		this.isRed = true;
	  	}else if(this.data.color=='blue'){
	  		this.isBlue = true;
	  	}
	  },
	  methods: {
	  }
	}
</script>
