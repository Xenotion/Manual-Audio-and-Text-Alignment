<template>
    
    <loading v-model:active="isLoading"
                 :can-cancel="false"
             
                 :is-full-page="true"
                 after="<b>loading<b>"
                 />
    <div class="home" v-if="isTest">
        <div>
            <AudioWave v-if="audioFile"  :audioFile="audioFile" />
            <ul class="audio-list">
                <li v-for="(audio, index) in audioFiles" :key="index">
                    <AudioFileListItem :audio="audio" />
                </li>
            </ul>
        </div>
    </div>

    <!-- I have no idea why this does not show -->
    <div class="error-message" v-if="loadingError">
        An error occurred while loading the project files.
    </div>

    
    <UserInputsView v-if="!inEditMode" @goToEditMode="onEditMode"/>
    <EditingView
        v-if="inEditMode"
        :username="username"
        :audioFile="audioFile"
        :textFile="textFile"
        />

</template>

<script>
 
import BackendService from "../services/backendService.ts"
import AudioWave from "../components/AudioWave.vue"
import UserInputsView from "../components/UserInputsView.vue"
import EditingView from "../components/EditingView.vue"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
/**
 * The main page
 */
export default {
    name: 'HomeView',
    components:{
     // add components here
        AudioWave,
        UserInputsView,
        EditingView,
        Loading,

    },
    data(){
        return{
            audioFiles: [],
            // get from user inputs
            username: "",
            textFile: null,
            audioFile: null,

            isTest: false, // toggles the testing components
            inEditMode: false, // toggles editing view

            projectId: null, // get projectId from url

            isLoading: false, // controls loading screen
            loadingError: false, // whether loading project has failed
        }
    },
    computed:{

    },
    methods:{

        // get audio files from backend
        getAudioFiles(){
            backendService.getAudioFiles()
                .then(res => this.audioFiles = res)
                .finally(console.log(this.audioFiles));
        },

        // handles when user chooses a new file
        async onFileChanged(files){

            var file = files[0];

            console.log(file);
            var result = await backendService.uploadAudioFile(file)
            this.audioFile = file;
            this.getAudioFiles(); // updates the list


        },

        onEditMode(userInputs){
            this.username=userInputs['username'];
            this.audioFile=userInputs['audioFile'];
            this.textFile=userInputs['textFile'];
            this.inEditMode = true;
        },
        
        // get files from api
        getProjectFiles(){
            
            if(this.projectId){
                this.isLoading = true;
                backendService.getProjectFiles(this.projectId)
                    .then(res =>{
                        if(res && res.textFile && res.audioFile){
                            this.textFile = res.textFile;
                            
                            this.audioFile = res.audioFile;

                            this.inEditMode = true;
                            
                        }else{
                            this.loadingError = true;
                            alert("An error occurred while loading the project files.");
                        }
                        this.isLoading = false;
                    })
            }
            
        }



    },
    created(){
        // run after the page is created
        // get projectId from url
        this.projectId = this.$route.params.projectId;
        this.getProjectFiles();
    },

}
</script>

<style lang="scss">
.home {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.file-upload {
    padding: 15px 100px;
    margin-bottom: 200px;
}

.audio-list {
    list-style: none;
    padding: 0;
}
.error-message {
  background-color: #ff6961; /* Red background color */
  color: #fff; /* White text color */
  padding: 10px;
  border: 1px solid #d60000; /* Darker red border */
  height:50px;
  border-radius: 5px;
  margin-top: 10px;
  display: none; /* Hidden by default */

  /* Add any other styles you want for the error message */
}

</style>
