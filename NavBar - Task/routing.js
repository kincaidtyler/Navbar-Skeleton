var routes = {
    '':             'home.html',
    '/':            'home.html',
    '#/home':       'home.html',
    '#/otherpage':  'otherpage.html',
    '#/otherpage2': 'otherpage2.html',
    '#/otherpage3':     'otherpage3.html'
};

async function router(){
    console.log(location.hash)

    //Inner HTML Target
    var innerElement = '';

    //Get Requested Link
    var link = window.location.hash;

    //If more than one parameter in the link,
    //We are targeting an element in the page.
    var count = (link.split("/").length - 1);
    if (count > 1) {
        //Anchor element
        innerElement = link.split("/")[2];
        //Page to Load
        link = '#/' + link.split("/")[1];
    }
    //Avoid Reloading page if internal link
    if (history === link && innerElement){
        scrollIntoView(innerElement)
        history = link;
        return;
    }
    history = link;
    //Get a path (route) for page
    var route = routes[link];

    //If route exists load page
    if (route) loadPage(route, innerElement)
};
router();

async function loadPage(url, innerElement){
    //Load page
    const res = await fetch(url);
    const content = await res.text();
    const element = document.getElementById('content');
    element.innerHTML = content;
}
window.addEventListener('hashchange, router');