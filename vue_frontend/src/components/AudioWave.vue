<template>
  <div>
    <div id="waveform"></div>

    <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>

    <input type="text" v-model="newRegionName" placeholder="Enter Segment Name" />

    <button @click="addRegion">Add New Segment</button>

    <p>
      <label>
        <input type="checkbox" v-model="loop" />
        Loop regions
      </label>

      <label style="margin-left: 2em">
        Zoom: <input type="range" min="10" max="1000" v-model="zoomValue" @input="updateZoom" />
      </label>
    </p>

    <p>
      📖 <a href="https://wavesurfer-js.org/docs/classes/plugins_regions.RegionsPlugin">Regions plugin docs</a>
    </p>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions'; // Make sure the path is correct
import TimelinePlugin from "wavesurfer.js/plugins/timeline";

export default {
  props:{
    audioFile: Blob,
  },

  data() {
    return {
      loop: true,
      zoomValue: 10,
      activeRegion: null,
      isPlaying: false,
      newRegionName: '',
      // TODO Loop through this array of region to get times?
      regions: [], // Store regions here
    };
  },

  methods: {
    togglePlayPause() {
      if (this.isPlaying) {
        this.$data.ws.pause();
      } else {
        this.$data.ws.play();
      }
      this.isPlaying = !this.isPlaying;
    },

    addRegion() {
      const wsRegions = this.$data.wsRegions;
      // Starts new regions where user is paused
      const currentTime = this.$data.ws.getCurrentTime();
      const start = currentTime
      const end = start + 10
      const content = this.newRegionName;
      const color = this.randomColor();

      const newRegion = wsRegions.addRegion({
        start,
        end,
        content,
        color,
        resize: true,
      });

      this.regions.push(newRegion); // Adds new region to array
      // Clear the new region name
      this.newRegionName = '';
    },

    random(min, max) {
      return Math.random() * (max - min) + min;
    },

    randomColor() {
      return `rgba(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)}, 0.5)`;
    },

    updateZoom() {
      const minPxPerSec = Number(this.zoomValue);
      this.$data.ws.zoom(minPxPerSec);
    },
  },

  mounted() {
    const ws = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
    });

    this.$data.ws = ws; // Store ws reference

    // Initialize the Timeline plugin
    ws.registerPlugin(TimelinePlugin.create())

    // Play on click
    ws.on('interaction', () => {
      this.togglePlayPause();
    })

    // When the audio starts playing
    ws.on('play', () => {
      this.isPlaying = true;
    })

    // When the audio pauses
    ws.on('pause', () => {
      this.isPlaying = false;
    })

    // When the audio finishes playing
    ws.on('finish', () => {
      this.isPlaying = false;
      ws.seekTo(0); // Rewind to the beginning on finished playing
    })

    // Update the zoom level on slider change
    ws.once('decode', () => {
      const slider = document.querySelector('input[type="range"]')

      slider.addEventListener('input', (e) => {
        const minPxPerSec = e.target.valueAsNumber
        ws.zoom(minPxPerSec)
      })
    })

    // Applying regions
    ws.loadBlob(this.audioFile);
    const wsRegions = ws.registerPlugin(RegionsPlugin.create());

    this.$data.wsRegions = wsRegions; // Store wsRegions reference

    wsRegions.enableDragSelection({
      color: 'rgba(255, 0, 0, 0.1)',
    });

    wsRegions.on('region-updated', (region) => {
      console.log('Updated region', region);
    });

    // Loop a region on click
    let loop = true
    // Toggle looping with a checkbox
    document.querySelector('input[type="checkbox"]').onclick = (e) => {
      loop = e.target.checked
    }

    {
      let activeRegion = null
      wsRegions.on('region-in', (region) => {
        activeRegion = region
      })
      wsRegions.on('region-out', (region) => {
        if (activeRegion === region) {
          if (loop) {
            region.play()
          } else {
            activeRegion = null
          }
        }
      })
      wsRegions.on('region-clicked', (region, e) => {
        e.stopPropagation() // prevent triggering a click on the waveform
        activeRegion = region
        region.play()
      })
      // Reset the active region when the user clicks anywhere in the waveform
      ws.on('interaction', () => {
        activeRegion = null
      })
    }
  },
};
</script>
