class Store {
    constructor(){
        this.id = Number(localStorage.getItem('widget_id'));
    }

    add(id = null){
        let pairs = [];
        let error = false;

        document.getElementsByName('keyval').forEach(({ value }) => {
            if(value !== ""){
                pairs = [
                    ...pairs,
                    value
                ];
            }
        });

        const names = this.fetchAllNames();
        const currName = document.getElementsByName('name')[0].value;

        if(names.length > 0){
            names.forEach(({ name }) => {
                if(name === currName){
                    ui.openError();
                    error = true;
                }
            });
        }

        if(error){
            return;
        }

        if(!id){
            id = ++this.id;
            localStorage.setItem('widget_id', id.toString());
        }

        const widget = {
            id,
            name: currName,
            number: document.getElementsByName('number')[0].value,
            pairs
        };

        localStorage.setItem(`widget_${id}`, JSON.stringify(widget));
        router.loadRoute('');
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
        router.loadRoute('');
    }
}
