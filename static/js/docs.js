let contentScrollPos = window.scrollY;

document.addEventListener('DOMContentLoaded', (event) => {
    const responsiveMQ = window.matchMedia('(max-width: 767px)');

    if (responsiveMQ.matches) {
        hideToc();

        const toclinks = document.getElementsByClassName('toclink');
        for (const toclink of toclinks) {
            toclink.addEventListener('click', (event) => {
                hideToc();
            })
        }
    }

    const tocButton = document.getElementById('docs-menu-button');
    tocButton.addEventListener('click', (event) => {
        toggleTocVisibility();
    });
});

function toggleTocVisibility() {
    const toc = document.getElementsByClassName('docs-menu')[0];
    const docContent = document.getElementsByClassName('docs-content')[0];
    if (toc.classList.contains('hidden')) {
        toc.classList.remove('hidden');
        contentScrollPos = window.scrollY;
        docContent.classList.add('hidden');
    } else {
        toc.classList.add('hidden');
        docContent.classList.remove('hidden');
        window.scroll(0, contentScrollPos);
    }
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
