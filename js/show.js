function news() {
    $("body").html('<div id="newsFeed"></div>');
    new News();
}

function menu() {
    var body = $('body');
    $.get('template/menu_template.html', function(template) {
        body.append(template);
    }, "html");
    body.attr("style", "background-color: #C4C4C4");
}
