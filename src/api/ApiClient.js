import axios from "axios"

export const apiClient = axios.create(
    {
        // baseURL: "http://gymtracker.eu-central-1.elasticbeanstalk.com"
        baseURL: "http://localhost:8080"
    }
)