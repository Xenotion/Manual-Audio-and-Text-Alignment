import axios from 'axios';

// edit this in .env file
const API_URL = process.env.VUE_APP_API_URL;
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
        const result = await axios({
            method:'GET', 
            url: `https://cors-anywhere.herokuapp.com/https://c-lara-758a4f81c1ff.herokuapp.com/accounts/manual_audio_alignment_integration_endpoint1/${projectId}`,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
             }});
        console.log(result.data);
        return result.data;
    }
    
}