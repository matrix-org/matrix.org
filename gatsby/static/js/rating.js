var notyf;

function rating(e) {
    var score = e.target.getAttribute("data-score");
    _paq.push(['trackEvent', 'Rating', 'Rating', window.location.pathname, score]);
    notyf.dismissAll();
    return;
  }

function openN() {
    notyf = new Notyf({
        types: [{
                dismissible: true,
                ripple: false,
                duration: 10 * 1000,
                type: 'info',
                background: 'black',
                icon: false
            }]
    });
    // nb the star ratings are reversed by CSS
    notyf.open({
        type: 'info',
        message: `Feedback?<br />Click to rate this page
        <div class="rating">
        <span class="ratingStar" data-score="5">☆</span>
        <span class="ratingStar" data-score="4">☆</span>
        <span class="ratingStar" data-score="3">☆</span>
        <span class="ratingStar" data-score="2">☆</span>
        <span class="ratingStar" data-score="1">☆</span>
        </div>`
      });
      for (d of document.getElementsByClassName("ratingStar")) {
        d.addEventListener('click', rating);
      }

}