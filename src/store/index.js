import models from "./models";

const modules = {};

models.forEach((model) => {
    console.warn('LOADING API',{name : model.name});
    modules[model.name] = model
})

export default {
    api : {
        ...modules
    }
};