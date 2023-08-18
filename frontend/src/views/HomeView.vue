<template>
    <div class="home">
        <div class="file-upload">
            <input type="file" @change="onFileChanged($event.target.files)"/>
        </div>
        <ul class="audio-list">
            <li v-for="(audio, index) in audioFiles" :key="index">
                <AudioFileListItem :audio="audio" />
            </li>
        </ul>
    </div>

</template>

<script>

import BackendService from "../services/backendService.ts"
import AudioFileListItem from "../components/AudioFileListItem.vue"
const backendService = new BackendService();
// we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
export default {
    name: 'HomeView',
    components:{
     // add components here
        AudioFileListItem

    },
    data(){
        return{
            audioFiles: [],
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
            this.getAudioFiles(); // updates the list


        }


        
    },
    created(){
        // run after the page is created (?)
        this.getAudioFiles();
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
