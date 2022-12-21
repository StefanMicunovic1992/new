import axios from "axios";

export default axios.create({
    baseURL: 'https://calm-plum-ox-coat.cyclic.app',
    headers: {
        'Access-Control-Allow-Methods': 'POST, GET'
      }
})