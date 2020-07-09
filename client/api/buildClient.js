import axios from 'axios'

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        const { headers } = req;
        return axios.create({
            baseURL: 'http://minikube.local',
            headers
        })
    }
    return axios.create();
}

export default buildClient;
