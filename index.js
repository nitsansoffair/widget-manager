const router = new Router();

router.get('/', () => {
    const div = document.getElementById('root');
    div.innerHTML = "";

    const h1 = document.createElement("h1");
    const content = document.createTextNode("Index");
    h1.appendChild(content);

    div.appendChild(h1);
});

router.get('/detail', () => {
    const div = document.getElementById('root');
    div.innerHTML = "";

    const h1 = document.createElement("h1");
    const content = document.createTextNode("Details");
    h1.appendChild(content);

    div.appendChild(h1);
});

router.get('/edit', () => {
    const div = document.getElementById('root');
    div.innerHTML = "";

    const h1 = document.createElement("h1");
    const content = document.createTextNode("Edit");
    h1.appendChild(content);

    div.appendChild(h1);
});

window.addEventListener('load', router.init);
window.addEventListener('hashchange', router.init);
