<template>
<div class="row">

<div class="card col-md-8">
  <div class="card-body">
    <h3>Страница действий</h3><hr>
    <button @click="createNewAction" class="btn btn-primary">Создать действие</button>
			<hr>
			<table v-if="actions != null" class="table table-bordered table-responsive">
				<thead>
					<tr>
						<td>#</td>
						<td>Тип</td>
						<td>Категория</td>
						<td>Комментарий</td>
						<td>Сумма</td>
						<td>Дата</td>
						<td>
							# # #
						</td>
					</tr>
				</thead>
				<tbody >
					<tr v-for="(item,index) in actions">
						<td>{{item.id}}</td>
						<td>
							<span class="badge badge-success" v-if="item.type == 'gain'">
							{{item.type}}</span>

							<span class="badge badge-danger" v-if="item.type == 'cost'">
							{{item.type}}</span>
						</td>
						<td>{{item.name}}</td>
						<td>{{item.comment}}</td>
						<td >{{item.sum}}</td>
					<!-- 	
						<td v-if="item.sum.length == 5">{{item.sum | VMask('## ###')}}</td> 
					-->
						<td>{{item.date}}</td>
						<td>
							<router-link
							:to="{ name:'editAction', params:{id: item.id } }"
							class="btn btn-warning"
							>
							Редактировать
							</router-link>
							<button :disabled="isDisabled"  @click="deleteAction(item.id)" class="btn btn-danger"><span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>Удалять</button>
						</td>
					</tr>
				</tbody>
			</table>
			<center v-if="actions == null" ><br><div class="spinner-grow spinner-grow-sm"></div><br>Загружается ...</center>
  </div>
</div>

<div class="col-md-4">
<div class="card">
	<div class="card-body">
		<h3>Доход / Расход</h3><hr>
		<div v-if="total != null">
			<div class="form-group">
				<label><b>Общие расходы</b></label>
			<input v-model="total.cost"  v-money="money" class="form-control" type="text" name="" disabled>
			</div>
			<div class="form-group">
				<label><b>Суммарный доход</b></label>
			<input v-model="total.gain"  v-money="money" class="form-control" type="text" name="" disabled>
			</div>
			<span></span>
		</div>
		<center v-if="total == null" ><br><div class="spinner-grow spinner-grow-sm"></div><br>Загружается ...</center>
	</div>
</div>
</div>


</div>
</template>
<script>

export default {
	data() {
		return {
			isDisabled: false,
			actions: null ,
			dataList: [],
			total: null,
			// for mask
			money: {
				decimal: ' ',
				thousands: ' ',
				prefix: '',
				suffix: ' sum',
				precision: 3,
				masked: false
			},
		}
	},
  methods: {
  	getAll() {
  		this.$resource('action/all').get()
  		.then(response => {
  			this.actions = response.data;
  			this.getIE();

  		});
  	},
	// get Total Income and Expense
	getIE() {
		this.$resource('action/ie').get()
		.then(response => {
			this.total = response.data
			console.log(this.total.cost);
		})
	},

  	createNewAction() {
  		this.$router.push('/action/create');
  	},
  	deleteAction(id) {
  		this.isDisabled = true;
  		this.$http.post('action/delete',{id: id})
  		.then(response => {
  			//console.log(response.data);
  			this.getAll();
  			this.isDisabled = false;
  			
  		})
		},
  	},
	created() {
		this.getAll()
		this.getIE();

	}
}
</script>