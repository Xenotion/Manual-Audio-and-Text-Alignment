<template>
    <div>
        <span>
            {{ audio }}
        </span>
  
      
    </div>
  
</template>
  
<script>

    // we use the Options API Style: https://vuejs.org/guide/introduction.html#single-file-components
    export default {
        name: 'AudioFileListItem',
        props:{
            audio:{
                type: Object

            }

        },
        data(){
            return{
                
            }
        },
        computed:{
            
        },
        methods:{
            
        },
        created(){
            // run after the page is created (?)
      
        },
    
    }
</script>
  
<style>
    
</style>