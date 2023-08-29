<template>
    <!--TODO: Make EditingView and InputsView both child components of homepage-->
    <div class="inputs-container" v-if="!inEditMode">
        
        Username:
        <input class = "input" v-model="username"/>
   
        Audio File Upload:
        <input class = "input" type="file" @change="onAudioFileChanged($event.target.files) " accept="audio/mp3,audio/*;capture=microphone"/>
      
        Text File Upload:
        <input class = "input" type="file" @change="onTextFileChanged($event.target.files) " accept="text/*"/>
       
        <button @click="toEditingPage">
            Next
        </button>

         
    </div>

    <EditingView
        v-if="inEditMode"
        :username="username"
        :audioFile="audioFile"
        :textFile="textFile"
        />

</template>

<script>

import BackendService from "../services/backendService.ts"
import EditingView from "../views/EditingView.vue"

const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
export default {
    name: 'UserInputsView',
    components:{
     // add components here
        EditingView

    },
    data(){
        return{
            // TODO: move this into home page and make this a component
            inEditMode: false,
            username: "",
            textFile: null,
            audioFile: null,
        }
    },
    computed:{
        inputsValid(){
            return this.username && this.textFile && this.audioFile;
        }
    },

    methods:{


        // handles when user chooses a new audio file
        async onAudioFileChanged(files){
            var file = files[0];
            console.log(file);
            // TODO: confirm if upload is needed
            //var result = await backendService.uploadAudioFile(file)
            this.audioFile = file;
            //this.getAudioFiles(); // updates the list

        },
        // handles when user chooses a new text file
        async onTextFileChanged(files){
            var file = files[0];
            console.log(file);         
            this.textFile = file
        },

        toEditingPage(){
            if(this.inputsValid){
                console.log("valid!");
                this.inEditMode = true;
                // can't pass as params now:
                //https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
                //this.$router.push({ name: 'editing-view'})
            }else{
                alert("invalid inputs!");
            }
        }


        
    },
    created(){
        console.log("created!");
   
    },
 
}
</script>

<style lang="scss">
//TODO: make visuals fancier
.input{
    height: 30px;
    width: 300px;
    margin-bottom: 50px;
}
.inputs-container{
    display: flex;
    padding: 50px;
    flex-direction: column;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

</style>
