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
        this.delete(id);
        this.add(id);
    }

    delete(id){
        return localStorage.removeItem(`widget_${id.toString()}`);
    }

    addPair(){
        const pairs = document.getElementsByName('pairs')[0];
        const numOfPairs = pairs.children.length - 1;

        if(numOfPairs < 10){
            pairs.innerHTML += `
                        <li>
                             <input type="text" name="keyval"/>
                            <input type="text" name="keyval"/>
                            <button onclick="store.addPair()">+</button>
                            <button onclick="store.removePair()">-</button>
                        </li>`;
        }
    }

    removePair(){
        const pairs = document.getElementsByName('pairs')[0];
        const numOfPairs = pairs.children.length - 1;

        if(numOfPairs > 1){
            pairs.innerHTML = pairs.innerHTML.slice(0, pairs.innerHTML.lastIndexOf('<li>'));
        }
    }
}
