import axios from "axios"
const apiURL = process.env.API_URL

export class authService {
    static login = async (username: string, password: string) => {
        const {data} = await axios.post(`${apiURL}/login`, {
            username,
            password
        })
        return data.token
    }
}