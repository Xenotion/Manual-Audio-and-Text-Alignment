<template>
  <div class="inputs-container">
    <div class="input-wrapper">
      <label for="username">Username:</label>
      <input class="input" id="username" v-model="username" placeholder="Enter your username" />
    </div>
    <div class="input-wrapper">
      <label for="audio-upload">Audio File Upload:</label>
      <input class="input" type="file" id="audio-upload" @change="onAudioFileChanged($event.target.files)" accept="audio/mp3,audio/*;capture=microphone" />
    </div>
    <div class="input-wrapper">
      <label for="text-upload">Text File Upload:</label>
      <input class="input" type="file" id="text-upload" @change="onTextFileChanged($event.target.files)" accept="text/*" />
    </div>
    <button class="next-button" @click="toEditingPage">Next</button>
  </div>
</template>

<script>

import BackendService from "../services/backendService.ts"


const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
export default {
    name: 'UserInputsView',
    components:{
     // add components here


    },
    data(){
        return{
            // TODO: move this into home page and make this a component

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

                this.$emit('goToEditMode', { username: this.username, audioFile: this.audioFile, textFile: this.textFile })
                console.log("valid!");
       
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
.input-wrapper {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
}

.input {
  height: 20px;
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.next-button {
  background-color: #6797ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.next-button:hover {
  background-color: #577edc;
}

.inputs-container {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;

}
</style>
