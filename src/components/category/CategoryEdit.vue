<template>
<div>
	<div class="card col-md-6 offset-md-3">
		<div class="card-body" >
			<h3>Редактировать категорию</h3><hr>
			<div v-if="category != ''">
			<div v-if="category != ''" class="form-group">
				<label>Название</label>
				<input  v-model="category.name"  class="form-control" type="text" name="">
			</div>
			<div class="form-group">
				<label>Тип</label>
				<select v-model="category.type" class="form-control">
					<option value="gain">Доход</option>
					<option value="cost">Расход</option>
				</select>
			</div>
			<button @clcik="update" class="btn btn-success">Сохранить</button>
			</div>
			<center v-if="category == ''" ><br><div class="spinner-border"></div><br>Загружается ...</center>			
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			category: '',
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

		}
	},

	created() {
		this.get();
	}
}
</script>