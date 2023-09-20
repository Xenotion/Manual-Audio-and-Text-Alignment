<template>
  <div id="waveform"></div>
  <div class ="button-container">
    <button @click="togglePlayPause">{{ isPlaying ? 'Pause' : 'Play' }}</button>

    <input type="text" v-model="newRegionName" placeholder="Description (Optional)" />

    <button @click="addRegion">Add New Segment</button>
    <p>
      <label>
        <input type="checkbox" v-model="loop" />
        Loop regions
      </label>

      <label style="margin-left: 2em">
        Zoom: <input type="range" min="10" max="1000" v-model="zoomValue" @input="updateZoom" />
      </label>
      <label style="margin-left: 2em">
        Volume:
        <input type="range" min="0" max="1" step="0.1" v-model="volume" @input="updateVolume" />
      </label>
      
    </p>
  </div>

  <div class="divider"></div>

  <div class ="selected-region">
    <p v-if="activeRegion">
      <b>Selected segment: {{ !activeRegion.content? 'unnamed region' : activeRegion.content.innerHTML }}</b>
      <b v-if="segmentNumbers.has(activeRegion.id)">Assigned to : |{{ segmentNumbers.get(activeRegion.id)}}|</b>
      <button @click="deleteActiveRegion">Delete</button>
      <br>
      <br>
      Assign/reassign segment number:
      <input
        type="number"
        id="numberInput"
        v-model.number="selectedSegmentNumber"
        min="1"
        :max="maxSegmentNumber"
        />
      <button @click="updateSegmentNumber">Confirm</button>
    </p>
    <div v-if="activeRegion" class="divider"></div>
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
      volume:0.5,
      activeRegion: null,
      isPlaying: false,
      newRegionName: '',
      selectedSegmentNumber: 0,
      lastAssignedNumber:0,
      segmentNumbers: new Map(), // maps segments to numbers
    };
  },
  watch: {
    '$data.wsRegions.regions': {
      handler(newRegions, oldRegions) {
        
        console.log('The regions array has changed:', newRegions);
       
        this.emitRegionsChanged();
      },
      deep: true, 
    },
    segmentNumbers:{
      handler(newSegments, old) { 
        this.emitRegionsChanged();
      },
      deep: true, 
    }
  
  },
  computed:{
   
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

    // Volume slider
    updateVolume() {
      this.$data.ws.setVolume(this.volume);
    },

    addRegion() {
      //const wsRegions = this.$data.wsRegions;
      // Starts new regions where user is paused
      const currentTime = this.$data.ws.getCurrentTime();
      const start = currentTime
      const end = start + 10
      const content = this.newRegionName? this.newRegionName : 'unnamed region';
      const color = this.randomColor();
      // todo need to add the label/segment number to region info to parse onto textfile
      const newRegion = this.$data.wsRegions.addRegion({
        start,
        end,
        content,
        color,
        resize: true,
      });

      // Clear the new region name
      this.newRegionName = '';
      this.selectedSegmentNumber = this.lastAssignedNumber +1;
      this.segmentNumbers.set(newRegion.id, this.selectedSegmentNumber);
      this.lastAssignedNumber = this.selectedSegmentNumber;
    },

    // deleteActiveRegion(){
    //   if(!this.activeRegion){
    //     return;
    //   }
    //   this.activeRegion.remove();
    //   this.$data.wsRegions.regions.pop(this.activeRegion);
    //   this.segmentNumbers.delete(this.activeRegion.id);
    //   this.activeRegion = null;
    //
    // },

    deleteActiveRegion() {
      if (!this.activeRegion) {
        return;
      }
      // Find the index of the activeRegion in the array
      const index = this.$data.wsRegions.regions.findIndex(region => region === this.activeRegion);

      if (index !== -1) {
        // Remove the activeRegion from the array
        this.$data.wsRegions.regions.splice(index, 1);
        this.activeRegion.remove();
        this.segmentNumbers.delete(this.activeRegion.id);
        this.activeRegion = null;
      }
    },



    updateSegmentNumber(){
      console.log(this.selectedSegmentNumber);
      // TODO: check if segment number taken at the end
      this.segmentNumbers.set(this.activeRegion.id, this.selectedSegmentNumber);
      this.lastAssignedNumber = this.selectedSegmentNumber ;
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

    // format the regions for output
    getOutputRegions(){
      var regions = this.$data.wsRegions.regions.map(region => ({
        "id":region.id,
        "label": this.segmentNumbers.has(region.id)? this.segmentNumbers.get(region.id):0,
        "name": region.content.innerHTML, // assume always have content
        // always round to two decimal places?
        "startTime": region.start.toFixed(2),
        "endTime": region.end.toFixed(2)
      })).sort();
      regions.sort((a, b) => a.label - b.label);

      return regions;
    },

    emitRegionsChanged(){
      
      this.$emit('regionsChanged', this.getOutputRegions());
    },

    // Read array of regions

    
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
      // disabled for now
      //this.togglePlayPause();
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

    // create region on drag
    // wsRegions.enableDragSelection({
    //   color: 'rgba(255, 0, 0, 0.1)',
    // });

    wsRegions.on('region-updated', (region) => {
      console.log('Updated region', region);
      this.activeRegion = region;
      console.log(this.$data.wsRegions.regions)
      this.emitRegionsChanged();
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
       
        if (this.activeRegion && this.activeRegion.id == region.id) {
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
          this.selectedSegmentNumber = this.lastAssignedNumber +1;
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

<style lang="scss">

#waveform {
  margin-bottom: 20px;
}

.divider {
  border-top: 2px solid #ccc;
  margin: 20px 0;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  // border: 1px solid #ccc;
  // border-radius: 4px;
  padding: 0px 10px;
}

.button-container button {
  margin-right: 10px;
  font-size: 14px;
  padding: 5px 5px;
  background-color: #6797ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.button-container button:hover {
  background-color: #577edc;
}

.button-container input {
  margin-right: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.selected-region {
  padding-left: 10px;
  margin-bottom: 30px;
}

.selected-region input {
  padding: 4px;
  margin-left: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.selected-region button {
  font-size: 14px;
  padding: 5px 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-left: 20px;
}

.selected-region button:hover {
  background-color: #c0392b;
}

</style>