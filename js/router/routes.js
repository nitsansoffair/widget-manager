const store = new Store();

const ui = new Ui();

const routes = [
    {
        path: '/',
        template: () => {
            const widgets = store.fetchAllNames();

            const template = widgets && widgets.map(({ name, id }) => `
                    <tr>
                        <td>${name}</td>
                        <td><button class="btn btn-light" onclick="router.loadRoute('detail', ${id})">Details</button></td>
                        <td><button class="btn btn-danger" onclick="ui.openDeleteModal(${id})">Delete</button></td>
                    </tr>`
            );

            return `
                <h2>Widget summary</h2>
                <table class="table">
                    <tbody>
                        ${template}
                    </tbody>
                </table>
                <button style="margin-bottom: 15px" class="btn btn-primary" onclick="router.loadRoute('add')">Add Widget</button>`;
        }
    },
    {
        path: '/detail/:id',
        template: (id = null) => {
            const widget = store.fetch(id);

            if(widget){
                const { name, number, pairs } = widget;

                let pairsHtml = '';
                for(let i = 0; i < pairs.length; i += 2){
                    pairsHtml += `<li>${pairs[i]}: ${pairs[i + 1]}</li>`;
                }

                return `
                    <button onclick="router.closeView('detail')" type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h2>Details</h2>
                    <div>Name: ${name}</div>
                    <div>Number: ${numToWords(number)}</div>
                    <h5>Key/Value Pairs</h5>
                    <ol>
                        ${pairsHtml}
                    </ol>     
                    <button class="btn btn-light" onclick="router.loadRoute('edit', ${id})">Edit</button>`;
            }

            return null;
        }
    },
    {
        path: '/edit/:id',
        template: (id = null) => {
            const widget = store.fetch(id);

            if (widget) {
                const { id, name, number, pairs } = widget;

                let pairsHtml = '';
                for(let i = 0; i < pairs.length; i += 2){
                    pairsHtml += `
                                <li style="margin-bottom: 5px">
                                    <input type="text" name="keyval" value="${pairs[i]}"/>
                                    <input type="text" name="keyval" value="${pairs[i + 1]}"/>
                                    <button class="btn btn-warning" onclick="ui.addPair()">+</button>
                                    <button class="btn btn-warning" onclick="ui.removePair()">-</button>
                                </li>`;
                }

                return `
                    <h2>Edit</h2>
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Name</label>
                            <div class="col-sm-10">
                                <input type="text" name="name" value="${name}"/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Number</label>
                            <div class="col-sm-10">
                                <input type="text" name="number" value="${number}"/>
                            </div>
                        </div>
                        <fieldset class="form-group">
                            <h5>Key/Value Pairs</h5>
                            <div class="row">
                                    <ol name="pairs">
                                        ${pairsHtml}
                                     </ol>
                            </div>
                        </fieldset>
                        <button class="btn btn-danger" onclick="router.loadRoute('')">Cancel</button>
                        <button class="btn btn-primary" onclick="store.edit(${id})">Save</button>
                    </form>`;
            }
        }
    },
    {
        path: '/add',
        template: () => {
            let pairsHtml = ``;
            const error = localStorage.getItem('widget_error');

            for(let i = 0; i < 5; i++){
                if(error && Number(error) === i){
                    pairsHtml += `
                     <li style="margin-bottom: 5px">
                        <input onclick="ui.cleanEmptykeyError()" type="text" style="outline: red solid thin" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button class="btn btn-warning" onclick="ui.addPair()">+</button>
                        <button class="btn btn-warning" onclick="ui.removePair()">-</button>
                    </li>`;
                } else {
                    pairsHtml += `
                     <li style="margin-bottom: 5px">
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button class="btn btn-warning" onclick="ui.addPair()">+</button>
                        <button class="btn btn-warning" onclick="ui.removePair()">-</button>
                    </li>`;
                }
            }

            let add = '<button add class="btn btn-primary" onclick="store.add()">Add</button>';

            if(error){
                add = '<button add class="btn btn-primary" disabled onclick="store.add()">Add</button>';
            }

            return `
                <h2>Add</h2>
                <form style="margin-bottom: 5px">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" name="name"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Number</label>
                        <div class="col-sm-10">
                            <input type="text" name="number"/>
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <h5>Key/Value Pairs</h5>
                        <div class="row">
                            <ol name="pairs">
                                ${pairsHtml}
                             </ol>
                        </div>
                    </fieldset>
                    <button class="btn btn-danger" onclick="router.loadRoute('')">Cancel</button>
                    ${add}  
                </form>`;
        }
    }
];

const unity = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];

const dozens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

const numToWords = (num) => {
    if ((num = num.toString()).length > 9){
        return 'overflow';
    }

    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);

    if (!n) {
        return;
    }

    let str = '';

    str += (n[1] != 0) ? (unity[Number(n[1])] || dozens[n[1][0]] + ' ' + unity[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (unity[Number(n[2])] || dozens[n[2][0]] + ' ' + unity[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (unity[Number(n[3])] || dozens[n[3][0]] + ' ' + unity[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (unity[Number(n[4])] || dozens[n[4][0]] + ' ' + unity[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str !== '') ? 'and ' : '') + (unity[Number(n[5])] || dozens[n[5][0]] + ' ' + unity[n[5][1]]) + 'only ' : '';

    return str;
};
