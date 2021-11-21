$(document).ready(() => {
    hideIfEmpty = $(".hideIfEmpty");
    if(hideIfEmpty.text()){
        hideIfEmpty.show();
    } else {
        hideIfEmpty.hide();
    }
})