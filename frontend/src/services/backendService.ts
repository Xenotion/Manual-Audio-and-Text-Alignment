import axios from 'axios';

// edit this in .env file
const API_URL = process.env.VUE_APP_API_URL;
export default class backendService{


    public async getTest(){

        const result = await axios.get(`${API_URL}/api/test`);
        console.log(result.data);
        return result.data;

    }

    public async uploadAudioFile(file: File) {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const result = await axios.post(
                `${API_URL}/audiofile/upload/`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return result.data;
        } catch (error: any) { // Add type any to error for now
            if (error && error.response && typeof error.response === 'object' && error.response.data) {
                console.error('Error uploading file:', error.response.data);
            } else {
                console.error('Unknown error uploading file:', error);
            }
            throw error;
        }
    }    
}