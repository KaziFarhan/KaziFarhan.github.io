// Defining
let nav_link = '/staticPages/nav.md'
let index_link = '/staticPages/index.md'

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


// Nav bar build
var navXmlHttp = new XMLHttpRequest();
navXmlHttp.onreadystatechange = function() { 
    if (navXmlHttp.readyState == 4 && navXmlHttp.status == 200){
        var Page = marked(navXmlHttp.responseText);
        document.getElementById('navigation').innerHTML = Page;
        // Dark/light mode
        document.getElementById("changeTheme").addEventListener('click', 
            function changeTheme(){
                if (document.getElementById('dark-css').hasAttribute('disabled')){
                    localStorage.removeItem('theme')
                    document.getElementById('dark-css').removeAttribute('disabled')
                    document.getElementById('light-css').setAttribute('disabled', true);
                }
                else{
                    localStorage.setItem('theme', 'light')
                    document.getElementById('light-css').removeAttribute('disabled')
                    document.getElementById('dark-css').setAttribute('disabled', true);
                }
            }
        )
    }
}
navXmlHttp.open("GET", nav_link, true);
navXmlHttp.send(null);


// Index page load
let theme = localStorage.getItem('theme')
console.log(theme)
if (theme){
    document.getElementById('light-css').removeAttribute('disabled')
    document.getElementById('dark-css').setAttribute('disabled', true);
}

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        var Page = marked(xmlHttp.responseText);
        document.getElementById('content').innerHTML = Page;
        document.getElementById('content').querySelectorAll('code').forEach(element => {
            hljs.highlightBlock(element);
        });
        document.getElementById('content').querySelectorAll('.pagelink').forEach(element => {
            element.addEventListener('click', changePage)
        });
        let tableOfContent = '';
        document.getElementById('content').querySelectorAll('h3').forEach(element => {
            tableOfContent += `<li class="link"><a href="#${element.id}">${element.innerText}</a></li>`
        });
        if (!tableOfContent){   
            document.getElementById('tableofcontentnav').style.display='none';
        }
        else{
            document.getElementById('tableofcontentnav').style.display='block';
        }
        document.getElementById('tableofcontent').innerHTML = tableOfContent
    }
}
xmlHttp.open("GET", index_link, true); // true for asynchronous 
xmlHttp.send(null);

// Change Page
    navigaTion.addEventListener('click', changePage)

    function changePage(li) {
        xmlHttp.open("GET", li.target.getAttribute('data-file'), true);
        xmlHttp.send(null);
        navigaTion.style.display = 'none';
    }