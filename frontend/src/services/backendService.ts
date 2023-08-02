import axios from 'axios';

// edit this in .env file
const API_URL = process.env.API_URL;
export default class backendService{


    public async getTest(){

        const result = await axios.get(`${API_URL}/api/test`);
        console.log(result.data);
        return result.data;
    }
    
}