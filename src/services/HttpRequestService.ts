import axios from 'axios';
import { apiLogger } from '../config/apiLogger'

export default class HttpRequest {
    private readonly baseUrl
    constructor() {
        this.baseUrl = process.env.BASE_URL
    }
    async post(obj) {
        try {
            const request = await axios.post(`${this.baseUrl}`, { ...obj })
            apiLogger.info('[HttpRequest]', { ...obj })
            return request
        } catch (err) {
            apiLogger.error('[HttpRequest]', err)
        }
    }
}