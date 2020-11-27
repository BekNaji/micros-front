<template>
<div>
	<div class="card col-md-6 offset-md-3">
		<div class="card-body" >
			<h3>Category Edit Page</h3><hr>
			<div v-if="category != ''">
			<div v-if="category != ''" class="form-group">
				<label>Name</label>
				<input  v-model="category.name"  class="form-control" type="text" name="">
				<p v-if="errors.name" class="text-danger">{{errors.name}}</p>
			</div>
			<div class="form-group">
				<label>Type</label>
				<select v-model="category.type" class="form-control">
					<option value="gain">Gain</option>
					<option value="cost">Cost</option>
				</select>
				<p v-if="errors.type" class="text-danger">{{errors.type}}</p>
			</div>
			<button :disabled="isDisabled" @click="update" class="btn btn-success">
			<span  v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>
			Update</button>
			</div>
			<center v-if="category == ''" ><br><div class="spinner-border"></div><br>Loading...</center>			
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			category: '',
			errors: '',
			isDisabled: false,
		}
	},

	methods: {
		get() {
			this.$resource('category/get').get({ id: this.$route.params.id })
			.then(response => {
				// console.log(response.data);
				this.category = response.data;
			});
		},
		update() {
			this.isDisabled = true;
			this.$resource('category/update').save(this.category)
			.then(response => {
				//console.log(response);
				if(response.data.errors)
				{
					this.isDisabled = false;
					//console.log(response.data.errors);
					this.errors = response.data.errors;
				}else{
					this.$router.push('/category');
				}
			});
		}
	},

	created() {
		this.get();
	}
}
</script>