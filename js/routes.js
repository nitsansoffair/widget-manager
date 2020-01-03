const routes = [
    {
        path: '/',
        template: `
            <h1>Widget summary</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Widget 1</td>
                        <td><button onclick="router.loadRoute('detail')">Details</button></td>
                        <td><button>Delete</button></td>
                    </tr>
                    <tr>
                      <td>Widget 2</td>
                      <td><button onclick="router.loadRoute('detail')">Details</button></td>
                      <td><button>Delete</button></td>
                    </tr>
                    <tr>
                      <td>Widget 3</td>
                      <td><button onclick="router.loadRoute('detail')">Details</button></td>
                      <td><button>Delete</button></td>
                    </tr>
                  </tbody>
            </table>
            <button onclick="routes.loadRoute('edit')">Add Widget</button>
        `
    },
    {
        path: '/detail',
        template: `
                <h1>Widget 2 Details</h1>
                <p>Name: Widget 2</p>
                <p>Number: Two hundred fifty three thousands</p>
                <h3>Key/Value Pairs</h3>
                <ol>
                    <li>first: Teddy</li>
                    <li>last: Bear</li>
                    <li>color: brown</li>        
                </ol>               
                <button onclick="router.loadRoute('edit')">Edit</button>
`
    },
    {
        path: '/edit',
        template: `
                <h1>Widget 2 Edit</h1>
                <p>
                    <span>Name</span>
                    <input type="text" class="text" value="Widget 2"/>
                </p>
                    <p>
                    <span>Number</span>
                    <input type="text" class="text" value="253781"/>
                </p>
                <h3>Key/Value Pairs</h3>
                <ol>
                    <li>
                        <input type="text" class="text"/>
                        <input type="text" class="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" class="text"/>
                        <input type="text" class="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" class="text"/>
                        <input type="text" class="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" class="text"/>
                        <input type="text" class="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                    <li>
                        <input type="text" class="text"/>
                        <input type="text" class="text"/>
                        <button>+</button>
                        <button>-</button>
                    </li>
                </ol>
                <button>Cancel</button>
                <button>Save</button>
`
    }
];
