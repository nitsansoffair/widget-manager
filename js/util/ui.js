class Ui {
    constructor(){}

    addPair(){
        const pairs = document.getElementsByName('pairs')[0];
        const numOfPairs = pairs.children.length - 1;

        if(numOfPairs < 10){
            pairs.innerHTML += `
                        <li style="margin-bottom: 5px">
                            <input type="text" name="keyval"/>
                            <input type="text" name="keyval"/>
                            <button class="btn btn-warning" onclick="ui.addPair()">+</button>
                            <button class="btn btn-warning" onclick="ui.removePair()">-</button>
                        </li>`;
        }
    }

    removePair(){
        const pairs = document.getElementsByName('pairs')[0];
        const numOfPairs = pairs.children.length - 1;

        if(numOfPairs > 1){
            pairs.innerHTML = pairs.innerHTML.slice(0, pairs.innerHTML.lastIndexOf('<li'));
        }
    }

    openDeleteModal(id){
        document.querySelector('[modal]').innerHTML += `
             <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete this widget?</p>
                        </div>
                        <div class="modal-footer">
                            <button onclick="ui.closeDeleteModal()" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button onclick="ui.delete(${id})" type="button" class="btn btn-primary">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.querySelector('.modal').style.display = 'unset';
        document.querySelector('[root-page]').style.opacity = '.3';
    }

    closeDeleteModal(){
        document.querySelector('[modal]').innerHTML = '';
        document.querySelector('[root-page]').style.opacity = '1';
    }

    delete(id){
        store.delete(id);
        this.closeDeleteModal();
    }
}
