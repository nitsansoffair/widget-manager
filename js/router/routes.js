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
                <h1>Widget summary</h1>
                <table>
                    <tbody>
                        ${template}
                    </tbody>
                </table>
                <button class="btn btn-primary" onclick="router.loadRoute('add')">Add Widget</button>`;
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
                    <h1>${name} Details</h1>
                    <p>Name: ${name}</p>
                    <p>Number: ${number}</p>
                    <h3>Key/Value Pairs</h3>
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
                    <h1>${name} Edit</h1>
                    <p>
                        <span>Name</span>
                        <input type="text" name="name" value="${name}"/>
                    </p>
                        <p>
                        <span>Number</span>
                        <input type="text" name="number" value="${number}"/>
                    </p>
                    <h3>Key/Value Pairs</h3>
                    <ol name="pairs">
                        ${pairsHtml}
                    </ol>
                    <button class="btn btn-danger" onclick="router.loadRoute('')">Cancel</button>
                    <button class="btn btn-primary" onclick="store.edit(${id})">Save</button>`;
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
                <h1>Add Widget</h1>
                <p>
                    <span>Name</span>
                    <input name="name" type="text"/>
                </p>
                    <p>
                    <span>Number</span>
                    <input name="number" type="text"/>
                </p>
                <h3>Key/Value Pairs</h3>
                <ol name="pairs">
                    ${pairsHtml}
                </ol>
                <button class="btn btn-danger" onclick="router.loadRoute('')">Cancel</button>
                <button class="btn btn-primary" onclick="store.add()">Add</button>  
        `;
        }
    }
];
