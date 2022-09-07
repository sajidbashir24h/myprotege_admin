import axios from "axios";

export default class api {
    constructor(){
        this.init();
    }

    state = {
        client : {
            endpoint: 'https://myprotege.com/',
            token: '',
            name: 'Authorization',
            type: 'Bearer ',
            headers: {
                'Authorization': '',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json'
            },
        },
        xios: {} //this is the copy of axios but have pre-built headers with token use this as axios
    }

    local = {
        fetch : (key) => {
            const payload  = localStorage.getItem(key);
            if(this.local.is_json(payload)){
                return JSON.parse(payload)
            }else{
                return payload;
            }
        },
        mutate : (key,payload) => {
            switch (typeof(payload)) {
                case 'object':
                    localStorage.setItem(key, JSON.stringify(payload));
                    break;
                default:
                    localStorage.setItem(key, payload);
                    break;
            }
            return true;
        },
        exist : (key) => {
            return (localStorage.getItem(key) === null || localStorage.getItem(key) === undefined) ? false : true;
        },
        destroy : () => {
            Object.keys(this.state).forEach((key) => {
                if(localStorage.getItem(key) !== null || localStorage.getItem(key) !== undefined){
                    localStorage.setItem(key,null);
                }
            });
        },
        is_json(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
    }

    init(){
        if(this.local.exist('client')){
            this.mutate('client',this.local.fetch('client'));
        }else{
            this.mutate('client',this.state.client,true);
        }
        this.curl();
    }

    curl(){
        this.state.xios = axios.create({
            baseURL : this.state.client.endpoint,
            headers : this.state.client.headers
        });
    } 

    mutate(key,payload,store = false){
        this.state[key] = payload;
        if(store)
            this.local.mutate(key,payload);
    }

    fetch(key){
        if(this.state[key] === undefined)
            return this.local.exist(key) ? this.local.fetch(key) : undefined;
        return this.state[key];
    }
}

