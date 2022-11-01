import axios from '../../Axios'

const register = async(userData)=>{
    const response = await axios.post('/register',userData)
    if (response.data.status) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    return response.data

}

const login = async (userData) => {

    const response = await axios.post('/login', userData)
  
    if (response.data.status) {
      console.log(response.data, '  servicee');
      localStorage.setItem('user', JSON.stringify(response.data))
    }else{
      console.log('no data');
    }
  
    return response.data
  }
  const adminLogin = async (details) => {
    const response = await axios.post('/admin/login', details)
  
    if (response.data) {
      localStorage.setItem('admin', JSON.stringify(response.data))
    }
  
    return response.data
  }
  const logout = () => {
    localStorage.removeItem('user')
  }
   
  const adminLogout = () => {
    localStorage.removeItem('admin')
  }
  const authService = {
    register,
    logout,
    login,
    adminLogin,
    adminLogout
  }
  
  export default authService;