var Cats = function (api_key) {
    var blog = "photogenicfelines.tumblr.com";
    var catUrl = "http://api.tumblr.com/v2/blog/" + blog + "/posts/photo?api_key=" + api_key + "&limit=50";

    $.ajax({
        url:catUrl,
        dataType:"jsonp",
        success:function (json) {
            var posts = json.response.posts;
            var image = posts[Math.round(Math.random() * (posts.length - 1))].photos[0].original_size.url;

            var body = $('body');
            body.append("<img style='margin-left: auto; margin-right: auto; display: block;' src='" + image + "'>");
            body.attr('style', "background-color: #000000");
        }
    });
}