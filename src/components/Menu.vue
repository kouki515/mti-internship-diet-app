<template>
    <div class="ui secondary pointing green inverted missive menu">
        <router-link active-class="active" class="item" exact to='/'>Home</router-link>
        <router-link active-class="active" class="item" to='/pairing'>Pairing</router-link>
        <div class="right menu">
            <a @click="logout" class="item">logout</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    computed: {

    },
    methods: {
        logout() {
            window.localStorage.clear();
            this.$router.push({ name: "Signup" });
            console.log("delete");
        }
    },
};
</script>
<style scoped>
    
</style>
