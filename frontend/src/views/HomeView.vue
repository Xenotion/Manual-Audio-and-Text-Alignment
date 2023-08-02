<template>
  <div class="home">
    {{ test }}
</div>

</template>

<script>




import BackendService from "../services/backendService"

const backendService = new BackendService();

export default {
    name: 'HomeView',
    components:{
     // add components here
  

    },
    data(){
        return{
            test: 0,
        }
    },
    computed:{
        
    },

    methods:{
        // updates 'test' with api call
        getTest(){
            backendService.getTest()
                .then(res => this.test = res)
                .finally(console.log(this.test));
            },
        
    },
    created(){
        // run after the page is created (?)
        this.getTest();
    },
 
}
</script>

<style>
  
</style>
