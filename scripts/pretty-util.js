var exports = module.exports = {};

function getCard(card, fm, bootstrap12ths) {
    if (! bootstrap12ths) bootstrap12ths = 4;
    return `
<div class="col-md-${bootstrap12ths} col-12 mb-3">
    <div class="theme-card">
        <a href="${card.url}"><img class="img-fluid" src="${card.img}" alt="screenshot" /></a>
        <div class="card-block">
            <h4 class="card-title">${card.title}</h4>
            <p class="card-text">${card.description}</p>
        </div><!--//card-block-->
        <a class="mask" href="${card.url}"><i class="icon fa fa-search-plus"></i></a>
    </div><!--//theme-card-->
</div>`;
}

function Card(url, img, title, description) {
    this.url = url;
    this.img = img;
    this.title = title;
    this.description = description;
}

exports.getCard = getCard;
exports.Card = Card;