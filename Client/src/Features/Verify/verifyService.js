
import axios from '../../Axios'

const sendOTP = async(data)=>{
    console.log('axios otp');
    const response = await axios.post('/sendOTP',{data})
    console.log('axios otp senr');
   
    return response.data

}

const verifyOTP = async (data) => {
    console.log(data);
    const response = await axios.post('/verifyOTP', {data})
  
    return response.data
  }


  const verifyService = {
   sendOTP,
   verifyOTP
  }
  
  export default verifyService;