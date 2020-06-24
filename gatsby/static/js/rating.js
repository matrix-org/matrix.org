var notyf;

function rating(rating) {
    console.log(rating);
    _paq.push(['trackEvent', 'Rating', 'Rating', window.location.pathname, rating]);
    notyf.dismissAll();
    return;
  }

function openN() {
    notyf = new Notyf({
        types: [{
                dismissible: true,
                ripple: false,
                duration: 20 * 1000,
                type: 'info',
                background: 'black',
                icon: false
            }]
    });
    notyf.open({
        type: 'info',
        message: `Feedback?<br />Click to rate this page
        <div class="rating">
        <span onclick="rating(5);notyf.dismissAll();">☆</span>
        <span onclick="rating(4)">☆</span>
        <span onclick="rating(3)">☆</span>
        <span onclick="rating(2)">☆</span>
        <span onclick="rating(1)">☆</span>
        </div>`
      });
}