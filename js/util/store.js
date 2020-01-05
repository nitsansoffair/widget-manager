class Store {
    constructor(){
        this.id = Number(localStorage.getItem('widget_id'));
    }

    add(id = null){
        let pairs = [];

        document.getElementsByName('keyval').forEach(({ value }) => {
            if(value !== ""){
                pairs = [
                    ...pairs,
                    value
                ];
            }
        });

        if(!id){
            id = ++this.id;
            localStorage.setItem('widget_id', id.toString());
        }

        const widget = {
            id,
            name: document.getElementsByName('name')[0].value,
            number: document.getElementsByName('number')[0].value,
            pairs
        };

        localStorage.setItem(`widget_${id}`, JSON.stringify(widget));
        this.sendToHomePage();
    }

    fetchAllNames(){
        let objs = [];

        for(let i = 0; i <= this.id; i++){
            const obj = this.fetch(i);

            if(obj){
                objs = [
                    ...objs, {
                        id: obj.id,
                        name: obj.name
                    }
                ];
            }
        }

        return objs;
    }

    fetch(id){
        const obj = localStorage.getItem(`widget_${id.toString()}`);

        if(obj){
            return JSON.parse(obj);
        }

        return null;
    }

    edit(id){
        this.add(id);
    }

    delete(id){
        localStorage.removeItem(`widget_${id.toString()}`);
        this.sendToHomePage();
    }

    sendToHomePage(){
        window.location.replace(ROOT_URL);
    }
}

const ROOT_URL = 'http://localhost:8080/';
