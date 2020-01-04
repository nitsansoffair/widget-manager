const store = new Store();

const widgets = store.fetchAllNames();
console.log(widgets);

const template = widgets && widgets.map(({ name, id }) => {
    return `
        <tr>
            <td>${name}</td>
            <td><button onclick="router.loadRoute('detail/${id}')">Details</button></td>
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
        path: '/detail',
        template: (id = null) => {
            const widget = store.fetch(id);

            if(widget){
                const { name, number, pairs } = widget; // TODO - Inject pairs

                return `
                    <h1>${name} Details</h1>
                    <p>Name: ${name}</p>
                    <p>Number: ${number}</p>
                    <h3>Key/Value Pairs</h3>
                    <ol>
                        <li>first: Teddy</li>
                        <li>last: Bear</li>
                        <li>color: brown</li>        
                    </ol>               
                    <button onclick="router.loadRoute('edit/${id}')">Edit</button>`
            }

            return null;
        }
    },
    {
        path: '/edit',
        template: (id = null) => `
                <h1>Widget 2 Edit</h1>
                <p>
                    <span>Name</span>
                    <input type="text" class="text" value="Widget 2"/>
                </p>
                    <p>
                    <span>Number</span>
                    <input type="text" value="253781"/>
                </p>
                <h3>Key/Value Pairs</h3>
                <ol>
                    <li>
                        <input type="text"/>
                        <input type="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text"/>
                        <input type="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text"/>
                        <input type="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text"/>
                        <input type="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text"/>
                        <input type="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                </ol>
                <button onclick="router.loadRoute('')">Cancel</button>
                <button>Save</button>
`
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
