class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoutes = [];

        this._loadInitialRoute();
    }

    loadRoute(...urlSegments){
        const matchedRoute = this._matchUrlRoute(urlSegments);

        const url = `/${urlSegments.join('/')}`;

        this.currentRoutes = removeDuplicates([
            ...this.currentRoutes.filter((str) => str.indexOf('detail') === -1 && str.indexOf('edit') === -1 && str.indexOf('add') === -1),
            url
        ]);

        history.pushState({}, '', url);

        const routerOutletElement = document.querySelector('[data-router-outlet]');
        routerOutletElement.innerHTML = '';

        this.currentRoutes.forEach((url) => {
            const urlSegments = url.slice(1).split('/');
            const matchedRoute = this._matchUrlRoute(urlSegments);

            if(urlSegments.length === 2){
                routerOutletElement.innerHTML += matchedRoute.template(urlSegments[1]);
            } else {
                routerOutletElement.innerHTML += matchedRoute.template();
            }
        });
    }

    _matchUrlRoute(urlSegments){
        return this.routes.find((route) => {
            const routePathSegments = route.path.split('/').slice(1);

            if(routePathSegments.length !== urlSegments.length){
                return false;
            }

            return routePathSegments.every((routePathSegment, i) => {
                return routePathSegment === urlSegments[i] || (routePathSegment === ":id" && Number(urlSegments[i]) >= 0);
            });
        });
    }

    _loadInitialRoute(){
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

        this.loadRoute(...pathSegments);
    }
}

const removeDuplicates = (arr) => arr.filter((v, i, self) => i === self.indexOf(v));
