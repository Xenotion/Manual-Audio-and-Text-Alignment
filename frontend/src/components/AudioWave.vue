<template>
  <div>
    <div id="waveform"></div>

    <button>Play/pause</button>

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
/// code adpated from : https://wavesurfer-js.org/examples/?regions.js
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
    };
  },
  mounted() {

    const ws = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      // can also take an url
    
    });

    // Initialize the Timeline plugin
    ws.registerPlugin(TimelinePlugin.create())

    // Play on click
    ws.on('interaction', () => {
      ws.play()
    })

    // When the audio starts playing */
    ws.on('play', () => {
      console.log('Play')
    })

    // When the audio pauses */
    ws.on('pause', () => {
      console.log('Pause')
    })

    //When the audio finishes playing */
    ws.on('finish', () => {
      console.log('Finish')
    })

    document.querySelector('button').addEventListener('click', () => {
      ws.playPause()
    })


    // // Rewind to the beginning on finished playing
    // ws.on('finish', () => {
    //   ws.setTime(0)
    // })

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
    
    ws.on('decode', () => {
      wsRegions.addRegion({
        start: 0,
        end: 8,
        content: 'Resize me',
        color: this.randomColor(),
        drag: false,
        resize: true,
      });
      wsRegions.addRegion({
        start: 9,
        end: 10,
        content: 'Cramped region',
        color: this.randomColor(),
        minLength: 1,
        maxLength: 10,
      });
      wsRegions.addRegion({
        start: 12,
        end: 17,
        content: 'Drag me',
        color: this.randomColor(),
        resize: false,
      });
      
      wsRegions.addRegion({
        start: 19,
        content: 'Marker',
        color: this.randomColor(),
      });
      wsRegions.addRegion({
        start: 20,
        content: 'Second marker',
        color: this.randomColor(),
      });
    });
    
    wsRegions.enableDragSelection({
      color: 'rgba(255, 0, 0, 0.1)',
    });
    
    wsRegions.on('region-updated', (region) => {
      console.log('Updated region', region);
    });
    
    wsRegions.on('region-in', (region) => {
      this.activeRegion = region;
    });
    
    wsRegions.on('region-out', (region) => {
      if (this.activeRegion === region) {
        if (this.loop) {
          region.play();
        } else {
          this.activeRegion = null;
        }
      }
    });
    
    wsRegions.on('region-clicked', (region, e) => {
      e.stopPropagation();
      this.activeRegion = region;
      region.play();
      region.setOptions({ color: this.randomColor() });
    });
    
    ws.on('interaction', () => {
      this.activeRegion = null;
    });
    
    ws.once('decode', () => {
      this.updateZoom();
    });
  },
  methods: {
    random(min, max) {
      return Math.random() * (max - min) + min;
    },
    randomColor() {
      return `rgba(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)}, 0.5)`;
    },
    updateZoom() {
      const minPxPerSec = Number(this.zoomValue);
      // TODO: get ws from here
      //ws.zoom(minPxPerSec);
    },
  },
};


</script>
