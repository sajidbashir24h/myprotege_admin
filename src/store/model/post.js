import api from "../core/api";

export default class Post{
    constructor(){
        this.api = (new api()).state.xios;
    }
    
    api = null;
    name = 'post';

    fetch(){
        return this.api.get('/posts');
    }
}