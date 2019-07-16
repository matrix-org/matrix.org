$(document).ready(function () {
    $('input[type=radio][name=platform]').change(function() {
        const selectedPlatform = this.id;
        $('td,th').toArray().forEach(function(cell) {
            cell = $(cell);
            const platforms = cell.data("platforms");
            if (! platforms) return;
            if (platforms.toLowerCase().indexOf(selectedPlatform) === -1) {
                cell.hide();
            } else {
                cell.show();
            }
        });
    });
    $("#linux").click();
});