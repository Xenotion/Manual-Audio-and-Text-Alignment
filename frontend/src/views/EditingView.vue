<template>
    <div class="inputs-container">
        {{ username }}
        {{ textFile }}
        {{ audioFile }}

         
    </div>

</template>

<script>

import BackendService from "../services/backendService.ts"

const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
export default {
    name: 'EditingView',
    components:{
     // add components here



    },
    props:{
        username: {
            type: String,
        },
        textFile: {
            type: Blob
        },
        audioFile: {
            type: Blob
        },
    },
    data(){
        return{
            
        }
    },
    computed:{
       
    },

    methods:{
        
    },
    created(){
        console.log("editing view created!");
   
    },
 
}
</script>

<style lang="scss">


</style>
