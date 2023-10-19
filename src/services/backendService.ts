import axios from 'axios';

// edit this in .env file
const API_URL = process.env.VUE_APP_API_URL;
interface ProjectFiles {
    audioFile: Blob | null;
    textFile: Blob | null;
}
export default class backendService{


    public async getTest(){

        const result = await axios.get(`${API_URL}/api/test`);
        console.log(result.data);
        return result.data;

    }

    public async getAudioFiles(){

        const result = await axios.get(`${API_URL}/audiofile/audiofiles/`);
        console.log(result.data);
        return result.data;

    }


    

    public async uploadAudioFile(file: File){
        const formData = new FormData();
        formData.append('file', file);

        const result = await axios.post(`${API_URL}/audiofile/upload/`, 
            formData,
            {headers: {
                'Content-Type': 'multipart/form-data'},
            },
          );
        return result.data
    }


    
    public async getProjectFiles(projectId: number){
        //https://stackoverflow.com/questions/61150129/cross-origin-request-blocked-on-axios-post-request-vuejs
        //const result = await axios.get(`https://c-lara-758a4f81c1ff.herokuapp.com/accounts/manual_audio_alignment_integration_endpoint1/139/`);
        const result = await axios({
            method:'GET', 
            url: `${API_URL}/manual_audio_alignment_integration_endpoint1/${projectId}/`,
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
             }});
       

      
        const text_content = result.data["labelled_segmented_text"];
        const audio_url = result.data["s3_audio_link"];
        const files: ProjectFiles ={
            audioFile: null,
            textFile: null
        }
        if(text_content){
            files.textFile = new Blob([text_content], {
                type: "text/plain;charset=utf-8",
            }); 
        }

        if(audio_url){
            files.audioFile = await this.fetchAudioBlob(audio_url);
        }

        
        

        console.log(files);
        
        return files;
    }

    // turns an audio url to a blob
    async fetchAudioBlob(audio_url: string): Promise<Blob | null> {
        try {
          const response = await fetch(audio_url);
          const data = await response.blob();
          console.log(response);
          return data;
          //return new Blob([data], { type: 'audio/mpeg' });
         
        } catch (error) {
          console.error('Error fetching audio:', error);
          return null;
        }
    }
      
    
}