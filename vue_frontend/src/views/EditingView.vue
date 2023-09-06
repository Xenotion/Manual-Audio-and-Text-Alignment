<template>
  <div class="editing-view">
    <div class="inputs-container">
      <div>
        <p>Username: {{ username }}</p>
      </div>
      <div>
        <p>Audio File: {{ audioFileName }}</p>
        <AudioWave :audioFile="audioFile" />
      </div>
      <div class="text-container">
        <p>Text File: {{ textFileName }}</p>
        <div class="text-content">
          <div class="scrollable-text-wrapper">
            <div class="scrollable-text">
              <pre>{{ formattedTextFile }}</pre>
            </div>
          </div>
        </div>
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
    };
  },
  created() {
    console.log("Editing view created!");
    this.formatTextFile();

    // Display audio and text name
    this.audioFileName = this.audioFile.name;
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
        };
        reader.readAsText(this.textFile);
      } else {
        this.formattedTextFile = this.textFile;
      }
    },
  },
};
</script>

<style lang="scss">
.editing-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.inputs-container {
  width: 100%;
  max-width: 1000px;
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
</style>
