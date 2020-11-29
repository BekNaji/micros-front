<template>
<div class="row">

<div class="card col-sm-8">
  <div class="card-body">
    <h3>Action Page</h3><hr>
   
    	<button @click="createNewAction" class="btn btn-primary"> 
    		<i class="fa fa-plus" aria-hidden="true"></i> Creat Action </button>
	    <button v-show="!filterForm" @click="showFilter()" class="btn btn-info">
			Show Filter
			<i class="fa fa-filter" aria-hidden="true"></i>
		</button>
    	<hr>
    <div v-show="filterForm" >
	<p class=" p-1"> <b>Note:</b> If the filter is made, <b>Total Income</b> and <b>Total Expense</b> values are also calculated.</p>
    <div class="form-row">
    	<div class="form-group col-sm-6">
    		<label>From</label>
    		<input :max="filter.to" v-model="filter.from" type="date" name="from" class="form-control">
    	</div>
    	<div class="form-group col-sm-6">
    		<label>To</label>
    		<input :min="filter.from" :max="dateNow" v-model="filter.to" type="date" name="to" class="form-control">
    	</div>
    	<div class="form-group col-sm-6">
    		<label>Type</label>
    		<select v-model="filter.type" class="form-control">
    			<option selected value="All">All</option>
    			<option value="gain">Income</option>
    			<option value="cost">Expense</option>
    		</select>
    	</div>

    	<div class="form-group col-sm-6">
    		<label>Status</label>
    		<select v-model="filter.status" class="form-control">
    			<option selected value="All">All</option>
    			<option v-if="filter.type=='gain'" v-for="item in gain" :value="item.id">{{item.name}}</option>
    			<option v-if="filter.type=='cost'" v-for="item in cost" :value="item.id">{{item.name}}</option>
    		</select>
    	</div>

    	<div class="form-group col-sm-12">
    		<button @click="runFilter()" class="btn btn-primary">
    			<span v-if="filter.isDisabled" class="spinner-grow spinner-grow-sm"></span>
    			Ok
    		</button>

    		<button  @click="clearForm()" class="btn btn-info">
    		Close & Clear</button>
    	</div>
    </div>
    </div>

    <p>Total Fields: <b> {{totalField}}</b></p>
			<hr>
			<div class="table-responsive">
			<table v-if="actions != null" class="table table-bordered ">
				<thead>
					<tr>
						<td >#</td>
						<td >Type</td>
						<td >Category</td>
						<td >Comment</td>
						<td >Sum</td>
						<td >Date</td>
						<td>
							#Actions
						</td>
					</tr>
				</thead>
				<tbody v-if="actions != ''" >
					<tr  v-for="(item,index) in actions">
						<td>{{index+1}}</td>
						<td>
							<span class="badge badge-success" v-if="item.type == 'gain'">
							{{item.type}}</span>

							<span class="badge badge-danger" v-if="item.type == 'cost'">
							{{item.type}}</span>
						</td>
						<td>{{item.name}}</td>
						<td>{{item.comment}}</td>
						<td style="min-width:150px" >{{item.sum}}</td>
					<!-- 	
						<td v-if="item.sum.length == 5">{{item.sum | VMask('## ###')}}</td> 
					-->
						<td>{{item.date}}</td>
						<td>
							<router-link
							:to="{ name:'editAction', params:{id: item.id } }"
							class="btn btn-warning"
							>
							<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
							</router-link>
							<button :disabled="isDisabled"  @click="deleteAction(item.id)" class="btn btn-danger">
								<span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>
								<i class="fa fa-trash-o" aria-hidden="true"></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<center v-if="actions == ''"><p>No Data</p></center>
			</div>
			<center v-if="actions == null" ><br><div class="spinner-grow spinner-grow-sm"></div><br>Loading...</center>
  </div>
</div>

<div class="col-sm-4">
<div class="card">
	<div class="card-body">
		<h3>Income/Expense</h3><hr>
		<div v-if="total != null">
			<div class="form-group">
				<label><b>Total Expense</b></label>
			<input v-model="total.cost"  v-money="money" class="form-control total" type="text" name="" disabled>
			</div>
			<div class="form-group">
				<label><b>Total Income</b></label>
			<input v-model="total.gain"  v-money="money" class="form-control total" type="text" name="" disabled>
			</div>
			<span></span>
		</div>
		<center v-if="total == null" ><br><div class="spinner-grow spinner-grow-sm"></div><br>Loading...</center>
	</div>
</div>
</div>


</div>
</template>
<script>

export default {
	data() {
		return {
			filterForm: false,
			dateNow: new Date().toISOString().substr(0, 10),
			totalField: '',
			gain: null,
			cost: null,
			filter: {
				from: '',
				to: new Date().toISOString().substr(0, 10),
				type: 'All',
				status: 'All',
				isDisabled: false,
			},
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
  	showFilter() {
  		this.filterForm = true;
  	},
  	clearForm() {
  		this.filterForm = false;
  		this.filter.from = '';
  		this.filter.to = new Date().toISOString().substr(0, 10);
  		this.filter.type = 'All';
  		this.filter.status = 'All';
  		this.runFilter();

  	},
  	runFilter() {
  		this.filter.isDisabled = true;
  		this.$resource('action/filter').get(this.filter)
  		.then(response => {
  			this.actions = response.data.actions;
  			this.total   = response.data.total;
  			this.totalField = this.actions.length;
  			this.filter.isDisabled = false;
  		});
  	},

  	getAll() {
  		this.$resource('action/all').get()
  		.then(response => {
  			this.actions = response.data.actions;
  			this.total   = response.data.total;
  			this.totalField = this.actions.length;
  			// get income categories
  			this.getGain();

  			// get expense categories
  			this.getCost();
  		});
  	},
	
  	createNewAction() {
  		this.$router.push('/action/create');
  	},
  	deleteAction(id) {
  		this.isDisabled = true;
  		this.$http.post('action/delete',{id: id})
  		.then(response => {
  			this.getAll();
  			this.isDisabled = false;
  			
  		})
	},
	// get category type gain
	getGain() {
		this.$resource('category/getGain').get()
		.then(response => {
			this.gain = response.data;
			
		})
	},

	// get category type Cost 
	getCost() {
		this.$resource('category/getCost').get()
		.then(response => {
			this.cost = response.data;
			
		})
	},
  },
	created() {
		this.getAll();
	}
}
</script>
<style scoped>
.total {
	background-color: white;
	font-size: 30px;
}
thead{
	cursor:pointer;
}
</style>