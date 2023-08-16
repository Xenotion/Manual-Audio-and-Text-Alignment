import axios from 'axios';

// edit this in .env file
const API_URL = process.env.API_URL;
export default class backendService{


    public async getTest(){

        const result = await axios.get(`${API_URL}/api/test`);
        console.log(result.data);
        return result.data;
    }

    public async uploadAudioFile(file: File){
        //console.log(file + " added.")
        const result = await axios.post(`${API_URL}/upload`, file);
        console.log(file + " added.")
        return result.data
    }
    
}