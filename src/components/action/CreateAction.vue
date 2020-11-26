<template>
<div class="row">
	<div class="card col-md-6 offset-3">
		<div class="card-body">
			<h3>Создать действие</h3><hr>
			<form>
			<div class="form-group">
				<label>Дата</label>
				<input :max="action.dateNow" v-model="action.dateNow" class="form-control" type="datetime-local" required>
				<p class="text-danger" v-if="errors.dateNow != ''">{{ errors.dateNow }}</p>

				<!-- <input :max="dateNow" v-model="dateNow" class="form-control" type="datetime-local"> -->
			</div>
			<div class="form-group">
				<label>Тип</label>
				<select v-model="action.type" class="form-control" required>
					<option value="gain">Доход</option>
					<option value="cost">Расход</option>
				</select>
				<p class="text-danger" v-if="errors.type != ''">{{ errors.type }}</p>
			</div>
			<div class="form-group">
				<label>Категория</label>
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
				<label>Сумма</label>
				<input class="form-control" v-money="money" v-model="action.sum" type="text" name="" required>
				<p class="text-danger" v-if="errors.sum != ''">{{ errors.sum }}</p>
			</div>
			<div class="form-group">
				<label>Комментарий</label>
				<textarea v-model="action.comment"  placeholder="Написать комментарий" rows="5" class="form-control" required></textarea>
				<p class="text-danger" v-if="errors.comment != ''">{{ errors.comment }}</p>
			</div>
			<button :disabled="isDisabled" @click.prevent="save" class="btn btn-primary">
			<span v-if="isDisabled" class="spinner-grow spinner-grow-sm"></span>Сохранить</button>
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
		delete() {
			
		}
	},

	created() {
		this.getGain();
		this.getCost();
	}
}
</script>