<template>
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
import AudioFileListItem from "../components/AudioFileListItem.vue"
import AudioWave from "../components/AudioWave.vue"
import UserInputsView from "../views/UserInputsView.vue"
import EditingView from "../views/EditingView.vue"
const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
export default {
    name: 'HomeView',
    components:{
     // add components here
        AudioFileListItem,
        AudioWave,
        UserInputsView,
        EditingView,


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
                backendService.getProjectFiles(this.projectId)
                    .then(res =>{
                        if(res){
                            this.textFile = new Blob([res["labelled_segmented_text"]], {
                                type: "text/plain;charset=utf-8",
                            }); 


                            this.inEditMode = true;
                        }
                    })
            }
            
        }



    },
    created(){
        // run after the page is created (?)
        //this.getAudioFiles();

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

</style>
