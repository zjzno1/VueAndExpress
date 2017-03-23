<template>
	<div>
		{{msg}}	
		<h1>this is father vue</h1>
		<child @message="recieveMessage"></child>
	</div>
</template>
<script>
	export default {
		data() {
			return {
		      msg: ''
		    }
		},
		components: {
			child: require('./index.vue')
		},
		methods: {
			recieveMessage: function (text) {
				console.log(text)
	        this.msg=text
	    }
		}
	}
</script>