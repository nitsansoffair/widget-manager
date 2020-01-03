class Router {
    constructor(){
        this.routes = [];
    }

    get(uri, callback){
        if(!uri || !callback){
            throw new Error('uri or callback must be given');
        }

        if(typeof uri !== "string"){
            throw new Error('typeof uri must be a string');
        }

        if(typeof callback !== "function"){
            throw new Error('typeof callback must be a function');
        }

        this.routes.forEach((route) => {
            if(route.uri === uri){
                throw new Error(`the uri ${route.uri} already exists`);
            }
        });
    }
}
