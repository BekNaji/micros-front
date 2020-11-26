<template>
<div>
	<div class="card">
		<div class="card-body">
			<h3>Страница категории</h3><hr>
			
			<button @click="createCategory" class="btn btn-primary">Создать категорию</button>
			<hr>
			<table class="table table-bordered">
				<thead>
					<tr>
						<td>#</td>
						<td>Тип</td>
						<td>Название</td>
						<td># # #</td>
					</tr>
				</thead>
				<tbody v-if="category">
					<tr v-for="(item,index) in category">
						<td>{{item.id}}</td>
						<td>
							<span v-if="item.type == 'gain'" class="badge badge-success">
							{{item.type}}</span>
							<span v-if="item.type == 'cost'" class="badge badge-danger">
							{{item.type}}</span>
						</td>
						<td>{{item.name}}</td>
						<td>
							<router-link
							:to="{ name:'editCategory', params:{id: item.id } }"
							class="btn btn-warning"
							>
							Редактировать
							</router-link>
							<button :disabled="isDisabled"   @click="deleteCategory(item.id)" class="btn btn-danger">
								<span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>Удалять</button>
						</td>
					</tr>
				</tbody>
			</table>
			<center v-if="!category" ><br><div class="spinner-grow spinner-grow-sm"></div><br>Загружается ...</center>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			isDisabled: false,
			category: '',
		}
	},

	methods: {
		createCategory() {
			this.$router.push('/category/create');
		},
		deleteCategory(id) {
			this.isDisabled = true;
			this.$http.post('category/delete',{id: id})
			.then(response => {
				//console.log(response.data);
				this.getAll();
			})
		},
		getAll() {
			this.isDisabled = true
			this.$resource('category/all').get()
			.then(response => {
				//console.log(response.data);
				this.category = response.data;
			});
			this.isDisabled = false;
		}
	},
	created() {
		this.getAll();
	}
}
</script>