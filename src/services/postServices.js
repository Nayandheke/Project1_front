import axios from "axios"

class Post{
    create(formData) {
        const url = "{{API_URL}}/booknow"
        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }
        return axios.post(url, formData, config)
    }
}

export default new Post()