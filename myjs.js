// Index page load
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var Page = marked(xmlHttp.responseText);
        document.getElementById('content').innerHTML = Page;
        document.getElementById('content').querySelectorAll('code').forEach(element => {
            hljs.highlightBlock(element);
        });
    }
}
xmlHttp.open("GET", 'index.md', true); // true for asynchronous 
xmlHttp.send(null);

// Nav bar build
var navXmlHttp = new XMLHttpRequest();
navXmlHttp.onreadystatechange = function() { 
    if (navXmlHttp.readyState == 4 && navXmlHttp.status == 200){
        var Page = marked(navXmlHttp.responseText);
        document.getElementById('navigation').innerHTML = Page;
    }
}
navXmlHttp.open("GET", 'data.md', true); // true for asynchronous 
navXmlHttp.send(null);

// Nav bar working 
let content = document.getElementById('content');
var navigaTion = document.getElementById('navigation');
content.addEventListener('click', ()=>
    navigaTion.style.display = 'none'
)
function toggleNavBar() {
    if (navigaTion.style.display=='block'){
        navigaTion.style.display = 'none';
    }
    else{
        navigaTion.style.display = 'block';
    }
}

// Change Page
navigaTion.addEventListener('click', function(li) {
    xmlHttp.open("GET", li.target.getAttribute('data-file'), true); // true for asynchronous 
    xmlHttp.send(null);
    navigaTion.style.display = 'none';
})
