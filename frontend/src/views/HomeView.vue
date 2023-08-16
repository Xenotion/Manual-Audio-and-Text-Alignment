<template>
  <div class="home">
    {{ test }}
    <br>
    <input type="file" @change="onFileChanged($event.target.files)"/>
</div>

</template>

<script>

import BackendService from "../services/backendService"

const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
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
        // handles when user chooses a new file
        onFileChanged(files){
            
            var file = files[0];
            console.log(file);
            backendService.uploadAudioFile(file);
        }
        
    },
    created(){
        // run after the page is created (?)
        //this.getTest();
    },
 
}
</script>

<style>
  
</style>
