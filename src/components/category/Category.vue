<template>
<div>
	<div class="card col-sm-8 offset-sm-2">
		<div class="card-body">
			<h3>Category Page</h3><hr>
			
			<button @click="createCategory" class="btn btn-primary">Creat Category</button>
			<br><br>
			<p ><b class="text-danger" >Important! :</b> If you delete the category, its <b>Action Data</b> will be deleted as well.</p>
			<hr>
			<table class="table table-bordered">
				<thead>
					<tr>
						<td>#</td>
						<td>Type</td>
						<td>Name</td>
						<td>#Actions</td>
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
							Edit
							</router-link>
							<button :disabled="isDisabled"   @click="deleteCategory(item.id)" class="btn btn-danger">
								<span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>Delete</button>
						</td>
					</tr>
				</tbody>
			</table>
			<center v-if="!category" ><br><div class="spinner-grow spinner-grow-sm"></div><br>Loading...</center>
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