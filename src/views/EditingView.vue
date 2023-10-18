<template>
  <div class="editing-view">
    <div class="main-container">
      <div class="edit-inputs-container">
          <h2>
            Edit
          </h2>
        <div>
          <p>Username: {{ username }}</p>
        </div>
        <div>
          <p>Audio File: {{ audioFileName }}</p>
          <AudioWave 
            :audioFile="audioFile" 
            :maxSegmentNumber="segmentCount"
            @regionsChanged="onRegionsChanged"
          />
        </div>

        
        <div class="text-container">
          <p>Text File: {{ textFileName }}</p>
          <p>Number of Segments: {{ segmentCount }}</p>
          <div class="text-content">
            <div class="scrollable-text-wrapper">
              <div class="scrollable-text">
                <pre>{{ formattedTextFile }}</pre>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="sidebar">
          <h3>
            Created Segments
          </h3>
          <div class="segments-list">
            <div class="segment-item"
              v-for="segment in createdSegments" :key="segment.id">
              <b>|{{ segment.label }}|</b> : {{ segment.name }} <br>
              {{ segment.startTime }} - {{ segment.endTime }}
            </div>
          </div>
          <br>
          <button @click="exportRegionsToTextFile">Download Segments</button>
     
        </div>
    </div>
  </div>
</template>

<script>
import BackendService from "../services/backendService.ts";
import AudioWave from "../components/AudioWave.vue";

const backendService = new BackendService();

export default {
  name: 'EditingView',
  components: {
    AudioWave, // Register the AudioWave component
  },
  props: {
    username: {
      type: String,
    },
    textFile: {
      type: Blob,
    },
    audioFile: {
      type: Blob,
    },
  },
  data() {
    return {
      formattedTextFile: null,
      textFileName: "",
      audioFileName: "",
      segmentCount: 0,
      createdSegments: [],
    };
  },
  created() {
    console.log("Editing view created!");
    this.formatTextFile();
      

    // Display audio and text name
    //this.audioFileName = this.audioFile.name;
    this.textFileName = this.textFile.name;
  },

  watch: {
    textFile: "formatTextFile",
  },
  methods: {
    formatTextFile() {
      if (this.textFile instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          this.formattedTextFile = reader.result;
          this.getSegmentCount();
        };
        reader.readAsText(this.textFile);
      } else {
        this.formattedTextFile = this.textFile;
      }
    },

    // count how many segments are labelled in the text file
    getSegmentCount(){
      if(!this.formattedTextFile){
        console.log(this.formattedTextFile)
        return;
      }
      const regex = /\|\d+\|/g;
      const segments = this.formattedTextFile.match(regex);

      if (segments) {
        this.segmentCount = segments.length;
      } else {
        this.segmentCount = 0;
      }

    },


    // Create downloadable text file for segment information
    exportRegionsToTextFile() {
      if (this.createdSegments === 0) {
        console.warn('No regions to export.');
        return;
      }

      const content = this.createdSegments.map(region => {
        // todo Fix what the file shows
        return `{ "label": ${region.label}, "Start time": ${region.startTime}, "End time": ${region.endTime} }`;
      }).join('\n');

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'segmentedAudio.txt';
      a.click();
      URL.revokeObjectURL(url);
    },

    // handle when audiowave component emit a regions changed event
    onRegionsChanged(regions){
      this.createdSegments = regions;
    }
  },
};
</script>

<style lang="scss">
.editing-view {
  overflow-y: scroll;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.main-container {
  display: flex;
  padding: 50px;
  height: 800px;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
}

.edit-inputs-container {
  flex: 1; 
  margin-right: 20px; 
}

.text-content {
  max-height: 300px;
  overflow-y: scroll;
}

.scrollable-text-wrapper {
  max-height: 100%;
}

.scrollable-text {
  overflow-y: scroll;
  padding: 10px;
}

.sidebar {
  max-height: 80vh;
  width: 400px;
  padding: 50px;
  border-left: 1px solid #000000; /* Add a vertical line */
  padding-left: 20px; /* Add some padding to separate the content from the line */
}

.segments-list{
  max-height: 65vh;
  overflow-y: scroll;
}

.segment-item {
  width: 70%;
  padding: 10px;
  margin:10px;
  border-radius: 20px;
  background-color: #ffffff;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc; 
}
  
</style>
