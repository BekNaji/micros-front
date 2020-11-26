<template>
<div class="container">
  <br><br>
  <div class="row">
    <div class="col-md-12">
      <app-header></app-header>
      <hr>
        <div class="col-md-12">
          <router-view></router-view>
        </div>
    </div>
  </div>
  
</div>
</template>

<script>
import Header from './components/Header';
 
export default {
  components: {
    'app-header': Header,
    
  }
}
</script>


