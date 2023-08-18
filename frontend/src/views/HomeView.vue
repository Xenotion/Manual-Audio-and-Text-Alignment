<template>
    <div class="home">
        <li v-for="(audio, index) in audioFiles" :key="index">
            <AudioFileListItem :audio="audio" />
        </li>
        <br>
        <input type="file" @change="onFileChanged($event.target.files)"/>
        <AudioWave v-if="audioFile"  :audioFile="audioFile"/>
    
    </div>

</template>

<script>

import BackendService from "../services/backendService.ts"
import AudioFileListItem from "../components/AudioFileListItem.vue"
import AudioWave from "../components/AudioWave.vue"
const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
export default {
    name: 'HomeView',
    components:{
     // add components here
        AudioFileListItem,
        AudioWave

    },
    data(){
        return{
            audioFiles: [],
            audioFile: null,
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


        }


        
    },
    created(){
        // run after the page is created (?)
        this.getAudioFiles();
    },
 
}
</script>

<style>
  
</style>
