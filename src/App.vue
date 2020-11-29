<template>
<div class="container-fluid">
    <br><br>
    <div class="row">
        <div class="col-md-10 offset-md-1">
        <app-header></app-header>
        <hr>
    </div>
    <div class="col-md-10 offset-md-1">
        <router-view></router-view>
    </div>
</div>

</div>
</template>
<script>
import Header from './components/Header';
export default {
components: {
    'app-header': Header,

},
}
</script>