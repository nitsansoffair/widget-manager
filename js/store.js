class Store {
    constructor(){
        this.id = 0;
    }

    add(){
        const widget = {
            name: document.getElementsByName('name').value,
            number: document.getElementsByName('number').value,
            pairs: [
                document.getElementsByName('pairs') // TODO - Get exact element
            ]
        };

        localStorage.setItem((this.id++).toString(), widget.toString());
    }

    fetchAll(){}

    fetch(id){}

    edit(id){}
}
