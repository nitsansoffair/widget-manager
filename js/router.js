class Router {
    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegments){
        const matchedRoute = this._matchUrlRoute(urlSegments);

        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, '', url);

        const routerOutletElement = document.querySelector('[data-router-outlet]');
        routerOutletElement.innerHTML = matchedRoute.template;
    }

    _matchUrlRoute(urlSegments){
        return this.routes.find((route) => {
            const routePathSegments = route.path.split('/').slice(1);

            if(routePathSegments.length !== urlSegments.length){
                return false;
            }

            return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
        });
    }

    _loadInitialRoute(){
        const pathnameSplit = window.location.pathname.split('/');
        const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';

        this.loadRoute(...pathSegments);
    }
}
