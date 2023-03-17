import axios from 'axios'
import React from 'react';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params : {
        api_key: "b4f623519c5cf0b9043a264a74f2cb06",
        language:"ko-KR",
    },
});

export default api;