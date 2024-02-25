import { getFormatedDate } from "../utils/getFormatedDate";
import md5 from "md5";
import axios from "axios";
import axiosRetry from "axios-retry";


const formatedDate = getFormatedDate()

const $authHost = axios.create({
    baseURL: 'https://api.valantis.store:41000/'
})

const authInterceptor = config => {
    config.headers['x-auth'] = md5(`Valantis_${formatedDate}`)
    return config
}

$authHost.interceptors.request.use(authInterceptor)
axiosRetry($authHost, {
    retries: 3,
    retryCondition: () => true,
    retryDelay: (retryCount) => retryCount * 1000,
    onRetry: (retryCount, error, requestConfig) => {
        console.log(error)
    },
});


export {
    $authHost
}