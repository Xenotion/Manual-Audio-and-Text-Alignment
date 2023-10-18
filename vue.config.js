const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //https://stackoverflow.com/questions/40863417/cors-issue-with-vue-js
  // devServer: {
  //   proxy: 'https://manual-alignment.netlify.app/',
  // } 
})
