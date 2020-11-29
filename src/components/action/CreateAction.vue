<template>
<div class="row">
	<div class="card col-md-6 offset-3">
		<div class="card-body">
			<h3>Create New Action</h3><hr>
			<form>

			<!-- date input	 -->
			<div class="form-group">
				<label>Date *</label>
				<input :max="action.dateNow" v-model="action.dateNow" class="form-control" type="datetime-local" required>
				<p class="text-danger" v-if="errors.dateNow != ''">{{ errors.dateNow }}</p>
			</div>

			<!-- Type input -->
			<div class="form-group">
				<label>Type *</label>
				<select @change="typeChanged()" v-model="action.type" class="form-control" required>
					<option value="gain">Income</option>
					<option value="cost">Expence</option>
				</select>
				<p class="text-danger" v-if="errors.type != ''">{{ errors.type }}</p>
			</div>

			<!-- Category input -->
			<div  class="form-group">
				<label>Select Category *</label>
				<input 
				v-model="selectedCategory" 
				@click="showOptionsList()" 
				placeholder="Choose" 
				class="form-control readonly" 
				type="text" readonly>

				<!-- options menu -->
				<div v-if="showOption" class="list-group">

					<a v-if="action.type != ''"  href="#" class="list-group-item list-group-item-action">
						<a @click="categoryFormShow()" href="#">Create New Category</a>
					</a>
					<!-- if type equal to gain will show -->
					<a v-show="edit==false" @click.self="select(item.id,item.name)" v-if="action.type == 'gain'" v-for="item in gain" href="#" class="list-group-item list-group-item-action">
						{{item.name}}<a @click="categoryFormShow(item.id,item.name,item.type)" class="float-right" href="#">Edit</a>
					</a>

					<!-- if type equal to cost wil show -->
					<a v-show="edit==false" @click.self="select(item.id,item.name)" v-if="action.type == 'cost'" v-for="item in cost" href="#" class="list-group-item list-group-item-action">
						{{item.name}}<a @click="categoryFormShow(item.id,item.name,item.type)" class="float-right" href="#">Edit</a>
					</a>

					<!-- category edit  -->
					<a v-show="edit==true" class="list-group-item list-group-item-action">
						
						<input v-model="category.name" class="form-control" type="text" name="">
						<p v-if="errorsCategory.name" class="text-danger">
						{{errorsCategory.name}}</p>

						<select v-model="category.type" class="form-control">
							<option value="gain">Income</option>
							<option value="cost">Expence</option>
						</select>
						<p v-if="errorsCategory.type" class="text-danger">
						{{errorsCategory.type}}</p>
						<a @click="saveCategory()" class="float-right" href="#">Save</a>
					</a>


					<!-- if type value has not will show -->
					<a @click="focusToType()" v-if="action.type == ''"  href="#" class="list-group-item list-group-item-action disabled">
						Firstly You have to Choose Type
					</a>

				</div>
			
				<p class="text-danger" v-if="errors.category != ''">{{ errors.category }}</p>
			</div>

			<!-- Sum input -->
			<div class="form-group">
				<label>Sum</label>
				<input class="form-control" v-money="money" v-model="action.sum" type="text" name="" required>
				<p class="text-danger" v-if="errors.sum != ''">{{ errors.sum }}</p>
			</div>

			<!-- Commnet input -->
			<div class="form-group">
				<label>Comment</label>
				<textarea v-model="action.comment"  placeholder="Your Comment" rows="5" class="form-control" required></textarea>
				<p class="text-danger" v-if="errors.comment != ''">{{ errors.comment }}</p>
			</div>
			<button :disabled="isDisabled" @click.prevent="save" class="btn btn-primary">
			<span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>Save</button>
		</form>
		</div>
	</div>


</div>
</template>
<script>

export default {
	
	data() {
		return {
			//dateNow: new Date().toLocaleString(),
			gain: null,
			cost: null,
			isDisabled: false,
			showOption: false,
			edit: false,
			errorsCategory: '',
			selectedCategory: '',
			category: {
				id: '',
				name: '',
				type: ''
			},
			
			action: {
				dateNow: new Date().toJSON().slice(0,19),
				type: '',
				category: '',
				sum: '',
				comment: ''
			},
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
		typeChanged() {
			this.edit = false;
			this.selectedCategory = '';
			this.action.category = '';
			this.showOption = false;
		},
		// show Options List of Category input
		showOptionsList() {
			this.showOption = !this.showOption
			this.edit =false
		},

		// show category edit and new category form
		categoryFormShow(i='',n='',t='') {
			this.edit = true;
			this.category.id = i;
			this.category.name = n;
			this.category.type = t;
		},

		// save and update Category
		saveCategory() {
			if(this.category.id == '')
			{
				var link = 'category/save';
			}else
			{
				var link = 'category/update';
			}
			this.$resource(link).save(this.category)
			.then(response => {
				
				if(response.data.errors)
				{
					this.errorsCategory = response.data.errors;
				}else{
					//this.$router.push('/category');
					this.errorsCategory ='';
					this.getGain();
					this.getCost();
					this.edit = false;
				}
			});
		},

		// when user select one of options will run 
		select(id,name) {
			this.selectedCategory = name;
			this.action.category = id;
			this.showOption = false;
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

		// save action
		save() {
			this.isDisabled = true;
			this.$resource('action/save').save(this.action)
			.then(response => {
				if(response.data.errors)
				{
					this.errors = response.data.errors;
					this.isDisabled = false;
				}else
				{
					//console.log(response);
					this.$router.push('/');
				}
			})
		},
	},

	// when page loaded following code will run
	created() {
		this.getGain();
		this.getCost();
	}
}
</script>

<style scoped>
	.readonly {
		background-color: white !important;
		cursor: default;
	}
	.disabled {
		color: blue;
		cursor: help !important;
	}
</style>