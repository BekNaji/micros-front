<template>
<div class="row">
	<div class="card col-md-6 offset-3">
		<div class="card-body">
			<h3>Create New Action</h3><hr>
			<form v-if="action != ''">
			<div class="form-group">
				<label>Date</label>
				<input  v-model="action.dateNow" class="form-control" type="datetime-local" required>
				<p class="text-danger" v-if="errors.dateNow != ''">{{ errors.dateNow }}</p>

				<!-- <input :max="dateNow" v-model="dateNow" class="form-control" type="datetime-local"> -->
			</div>
			<div class="form-group">
				<label>Type</label>
				<select v-model="action.type" class="form-control" required>
					<option value="gain">Income</option>
					<option value="cost">Expense</option>
				</select>
				<p class="text-danger" v-if="errors.type != ''">{{ errors.type }}</p>
			</div>
			<div class="form-group">
				<label>Category</label>
				<select v-model="action.category" class="form-control" required>
					<option selected disabled>Select Category</option>

					<option :value="item.id" v-if="action.type == 'gain'" v-for="(item,index) in gain">
					{{item.name}}
					</option>

					<option :value="item.id" v-if="action.type == 'cost'" v-for="(item,index) in cost">
					{{item.name}}
					</option>

					<option v-if="action.type == null" disabled>
					Firstly you have to select Type
					</option>
				</select>
				<p class="text-danger" v-if="errors.category != ''">{{ errors.category }}</p>
			</div>
			<div class="form-group">
				<label>Sum</label>
				<input class="form-control" v-money="money" v-model="action.sum" type="text" name="" required>
				<p class="text-danger" v-if="errors.sum != ''">{{ errors.sum }}</p>
			</div>
			<div class="form-group">
				<label>Comment</label>
				<textarea v-model="action.comment"  placeholder="Your Comment" rows="5" class="form-control" required></textarea>
				<p class="text-danger" v-if="errors.comment != ''">{{ errors.comment }}</p>
			</div>
			<button :disabled="isDisabled" @click.prevent="update" class="btn btn-primary">
			<span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>Update</button>
		</form>
		<center v-if="action == ''" ><br><div class="spinner-border"></div><br>Loading...</center>
		</div>
	</div>


</div>
</template>
<script>
export default {

	data() {
		return {
			//dateNow: new Date().toLocaleString(),
			gain: "",
			cost: "",
			action: "",
			isDisabled: false,

			// for mask
			money: {
				decimal: ' ',
				thousands: ' ',
				prefix: '',
				suffix: '',
				precision: 3,
				masked: false
			},
			errors: [],			
		}
	},
	methods: {
		getGain() {
			this.$resource('category/getGain').get()
			.then(response => {
				this.gain = response.data;
			})
		},
		getCost() {
			this.$resource('category/getCost').get()
			.then(response => {
				this.cost = response.data;
			})
		},
		getAction() {
			this.$resource('action/get').get({id: this.$route.params.id})
			.then(response => {
				//console.log(response.data.dateNow);
				this.action = response.data;
			})
		},
		update() {
			this.isDisabled = true;
			this.$resource('action/update').save(this.action)
			.then(response => {
				if(response.data.errors)
				{
					this.errors = response.data.errors;
					this.isDisabled = false;
				}else
				{
					//console.log(response.data);
					this.$router.push('/');
				}
			})
		},
		
	},

	created() {
		this.getGain();
		this.getCost();
		this.getAction();
	}
}
</script>