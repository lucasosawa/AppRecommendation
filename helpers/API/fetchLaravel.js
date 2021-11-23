import api from "../API/api"

const fetchDataLaravel = async (path) => {
    try {
        const data = await api.get(
            `http://127.0.0.1:8000/api/${path}`
        )
            return data.data
        } catch (err) {
            console.error(err)
        }
    }
      
    export default fetchDataLaravel;