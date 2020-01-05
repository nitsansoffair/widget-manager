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
                    <h2>Details</h2>
                    <div>Name: ${name}</div>
                    <div>Number: ${number}</div>
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

            for(let i = 0; i < 5; i++){
                pairsHtml += `
                     <li style="margin-bottom: 5px">
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button class="btn btn-warning" onclick="ui.addPair()">+</button>
                        <button class="btn btn-warning" onclick="ui.removePair()">-</button>
                    </li>`;
            }

            return `
                <h2>Add</h2>
                <form>
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
                    <button class="btn btn-primary" onclick="store.add()">Add</button>  
                </form>`;
        }
    }
];
