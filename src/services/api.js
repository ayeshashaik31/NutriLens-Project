import axios from 'axios'

const api = axios.create({
 baseURL : "https://nutrilens-backend-m6ct.onrender.com/api"

})

export default api