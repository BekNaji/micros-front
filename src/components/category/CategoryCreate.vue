<template>
<div>
	<div class="card col-md-6 offset-md-3">
		<div class="card-body ">
			<h3>Категория Создать страницу</h3><hr>
			<div class="form-group">
				<label>Название</label>
				<input  v-model="category.name" class="form-control" type="text" name="">
				<p v-if="errors.name" class="text-danger">{{errors.name}}</p>
			</div>
			<div class="form-group">
				<label>Тип</label>
				<select v-model="category.type" class="form-control">
					<option selected disabled>Select Type</option>
					<option value="gain">Доход</option>
					<option value="cost">Расход</option>
				</select>
				<p v-if="errors.type" class="text-danger">{{errors.type}}</p>
			</div>
			<button @click="save" class="btn btn-success" :disabled="isDisabled" >
				<span  v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>
			Сохранить</button>
			
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			isDisabled: false,
			category: {
				name: '',
				type: '',
			},
			errors: [],
		}
	},

	methods: {
		save() {
			this.isDisabled = true;
			this.$resource('category/save').save(this.category)
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
	// created() {
	// 	this.save();
	// }

}
</script>