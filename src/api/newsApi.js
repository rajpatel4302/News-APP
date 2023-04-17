import axios from "axios"

export const newsApi1 = async (payload) => {
    try {
        return await axios.get(`https://newsdata.io/api/1/news?apikey=${payload.apiLastKeys}&page=${payload._id}`)
            .then((res) => {
                return res;
            })
    } catch (error) {
        return error;
    }
};