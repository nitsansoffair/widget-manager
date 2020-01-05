const store = new Store();

const widgets = store.fetchAllNames();

const template = widgets && widgets.map(({ name, id }) => {
    return `
        <tr>
            <td>${name}</td>
            <td><button onclick="router.loadRoute('detail', ${id})">Details</button></td>
            <td><button>Delete</button></td>
        </tr>`;
});

const routes = [
    {
        path: '/',
        template: () => `
            <h1>Widget summary</h1>
            <table>
                <tbody>
                    ${template}
                </tbody>
            </table>
            <button onclick="router.loadRoute('add')">Add Widget</button>
        `
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
                    <button onclick="router.loadRoute('edit', ${id})">Edit</button>`;
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
                                <li>
                                    <input type="text" value="${pairs[i]}"/>
                                    <input type="text" value="${pairs[i + 1]}"/>
                                    <button>+</button>
                                    <button>-</button>
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
                    <ol>
                        ${pairsHtml}
                    </ol>
                    <button onclick="router.loadRoute('')">Cancel</button>
                    <button onclick="store.edit(${id})">Save</button>`;
            }
        }
    },
    {
        path: '/add',
        template: () => `
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
                <ol>
                    <li>
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" name="keyval"/>
                        <input type="text" name="keyval"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                </ol>
                <button onclick="router.loadRoute('')">Cancel</button>
                <button onclick="store.add()">Add</button>  
        `
    }
];
