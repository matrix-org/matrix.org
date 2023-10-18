let contentScrollPos = window.scrollY;
const responsiveMQ = window.matchMedia('(max-width: 767px)');
responsiveMQ.addEventListener("change", (event) => responsiveMQHandler());

document.addEventListener('DOMContentLoaded', (event) => {
    const toclinks = document.getElementsByClassName('toclink');
    for (const toclink of toclinks) {
        toclink.addEventListener('click', (event) => {
            // Toc is hidden on different pages by default, only hide it if we
            // stay on the same page to avoid flickering
            const target = new URL(event.target.parentElement);
            if (responsiveMQ.matches && window.location.pathname == target.pathname) {
                hideToc();
            }
        });
    }

    const tocButton = document.getElementById('docs-menu-button');
    tocButton.addEventListener('click', (event) => {
        toggleTocVisibility();
    });

    contentScrollPos = window.scrollY;
    responsiveMQHandler();
});

function toggleTocVisibility() {
    const toc = document.getElementsByClassName('docs-menu')[0];
    const docContent = document.getElementsByClassName('docs-content')[0];
    if (toc.classList.contains('hidden')) {
        displayToc();
    } else {
        hideToc();
    }
}

function displayToc() {
    const toc = document.getElementsByClassName('docs-menu')[0];
    const docContent = document.getElementsByClassName('docs-content')[0];
    toc.classList.remove('hidden');
    contentScrollPos = window.scrollY;
    docContent.classList.add('hidden');
}

function hideToc() {
    const toc = document.getElementsByClassName('docs-menu')[0];
    const docContent = document.getElementsByClassName('docs-content')[0];
    toc.classList.add('hidden');
    docContent.classList.remove('hidden');
    window.scroll({
        top: contentScrollPos,
        behavior: "instant",
    });
}

function displayDocs() {
    const docContent = document.getElementsByClassName('docs-content')[0];
    docContent.classList.remove('hidden');
}

function responsiveMQHandler() {
    if (responsiveMQ.matches) {
        hideToc();
    } else {
        displayToc();
        displayDocs();
    }
}
