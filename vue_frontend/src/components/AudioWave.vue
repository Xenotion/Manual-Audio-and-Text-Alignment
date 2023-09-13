<template>
  <div>
    <div id="waveform"></div>

    <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>

    <input type="text" v-model="newRegionName" placeholder="Enter Segment Label" />

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
    <br>
    <p v-if="activeRegion">
      <b>Selected segment: {{ !activeRegion.content? 'unnamed region' : activeRegion.content.innerHTML }}</b>
      <br>
      Actions:
      <br>
      <button @click="deleteActiveRegion">Delete</button>
      Assign segment number:
      <input
        type="number"
        id="numberInput"
        v-model.number="selectedSegmentNumber"
        min="1"
        :max="maxSegmentNumber"
      />
      <button @click="updateSegmentNumber">Confirm</button>
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
    maxSegmentNumber: Number,
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
      
      selectedSegmentNumber: 0,
      segmentNumbers: new Map(), // maps segments to numbers
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

    deleteActiveRegion(){
      if(!this.activeRegion){
        return;
      }
      this.$data.wsRegions.regions.pop(this.activeRegion);
      
      this.regions.pop(this.activeRegion);
      this.activeRegion.remove();
      this.segmentNumbers.delete(this.activeRegion.id);
      this.activeRegion = null;
      
    },

    updateSegmentNumber(){
      console.log(this.selectedSegmentNumber);
      // TODO: check if segment number taken at the end
      this.segmentNumbers.set(this.activeRegion.id, this.selectedSegmentNumber);
      // TODO: reflect this in the label
      //this.activeRegion.content.innerHTML += "#" + this.selectedSegmentNumber;
    
   
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
   
      wsRegions.on('region-in', (region) => {
        this.activeRegion = region
      })
      wsRegions.on('region-out', (region) => {
        if (this.activeRegion === region) {
          if (loop) {
            region.play()
          } else {
            this.activeRegion = null
          }
        }
      })
      wsRegions.on('region-clicked', (region, e) => {
        e.stopPropagation() // prevent triggering a click on the waveform
        this.activeRegion = region
        console.log(wsRegions);
        region.setOptions({ color: this.randomColor() })
        region.play()

        // TODO: we can make a toggle here?
        this.$data.ws.pause();

        if(this.segmentNumbers.has(region.id)){
          this.selectedSegmentNumber = this.segmentNumbers.get(region.id);
        }else{
          this.selectedSegmentNumber += 1;
        }
      })
      // Reset the active region when the user clicks anywhere in the waveform
      ws.on('interaction', () => {
        this.activeRegion = null
      })
    }
  },
};
</script>
