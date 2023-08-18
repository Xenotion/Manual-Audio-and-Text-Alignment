
<template>
  <div>
    <div id="waveform"></div>
    
    <p>
      <label>
        <input type="checkbox" v-model="loop" />
        Loop regions
      </label>
      
      <label style="margin-left: 2em">
        Zoom: <input type="range" min="10" max="1000"  v-model="zoomValue" @input="updateZoom" />
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
