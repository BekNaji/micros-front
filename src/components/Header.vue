<template>
	
		<ul class="nav nav-pills">
			<router-link
			active-class="active"
			exact 
			to="/"
			tag="li"
			class="nav item nav-link"
			>
			<a>Home</a>	
			</router-link>

			<router-link
			to="/category" 
			active-class="active"
			exact
			class="nav item nav-link"
			tag="li"
			>
			<a>Category</a>
			</router-link>
			
		</ul>

	
</template>
<script>
	
</script>
<style>
	li.active a {
		color: white !important;
	}
</style>