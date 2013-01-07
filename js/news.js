var News = function (url, rootElement, entryCallback) {
    var feedLimit = 4;
    var itemShowTime = 15 * 1000;
    var jsonUrl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&hl=ee&num=" + feedLimit + "&callback=?&q=" + encodeURIComponent(url);
    var rowTemplate = "<h3><b>${publishedDate}</b>     ${title}</h3> <div> <p> ${content} <a href='${link}'>more...</a></p> </div>";

    $.ajax({
        url:jsonUrl,
        dataType:'json',
        success:function (data) {
            $.each(data.responseData.feed.entries, function (id, entry) {
                entry.publishedDate = formatDate(new Date(entry.publishedDate));
                if (entryCallback) {
                    entryCallback(entry);
                }
                rootElement.append($.tmpl(rowTemplate, entry));
            });
            rootElement.accordion({heightStyle: 'fill'});
            switchTabs(1); //first is opened by default
        },
        error:function () {
            console.log("error");
        }
    });

    function switchTab(id) {
        $(rootElement.children(".ui-accordion-header")[id]).trigger("click")
    }

    function formatDate(date) {
        function addPrefixZeroIfNeeded(number) {
            return number < 10 ? "0" + number : number;
        }

        var hours = date.getHours();
        var minutes = date.getMinutes();
        return addPrefixZeroIfNeeded(hours) + ":" + addPrefixZeroIfNeeded(minutes) + " "
            + $.datepicker.formatDate('dd.mm.yy', date);
    }

    function switchTabs(startWith) {
        if (startWith < feedLimit) {
            setTimeout(function () {
                switchTab(startWith);
                switchTabs(++startWith);
            }, itemShowTime);
        } else {
            switchTabs(0);
        }
    }
};