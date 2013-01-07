function news() {
    applyTemplate('template/news_template.html', function () {
        new News("http://uudised.err.ee/uudised_rss.php", $("#newsFeedErr"), function (e) {
            e.content = e.content.split("<br>")[0];
        });
        new News("http://rus.err.ee/rss", $("#newsFeedErrRus"),  function (e) {
            e.content = e.content.split(/<img .*>/)[1];
        });
    });
}

function menu() {
    applyTemplate('template/menu_template.html');
    $('body').attr("style", "background-color: #C4C4C4");
}

function applyTemplate(templateName, whenReady) {
    $.get(templateName, function (template) {
        $('body').append(template);
        if(whenReady) {
            whenReady();
        }
    }, "html");
}
