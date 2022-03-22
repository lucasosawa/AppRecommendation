import api from "../API/api"

const postDataLaravel = async (path) => {
    try {
        const data = await api.post(
            `http://127.0.0.1:8000/api/${path}`
        )
            return data.data
        } catch (err) {
            console.error(err)
        }
    }
      
    export default postDataLaravel;