/**
 * Created by waplet on 28/07/16.
 */
chrome.storage.sync.get("w_last_seen", function(lastSeenObject) {
    // acquired time
    var lastSeenTime = moment(lastSeenObject.w_last_seen || 0, "X");
    // getting all last posts
    var lastPosts = $('table.forum_last_posts:first-child').find('tr');

    // marking posts as new if matching criteria
    $.each(lastPosts, function(i, post) {
        // getting post link
        var $post = $(post).find('td:first-child a.b11');
        // getting post time part
        var time = $(post).find('td.date').text().split(" / ")[0];
        time = parseTime(time);

        // marking new posts
        if (isNewPost(time, lastSeenTime)) {
            $post.html('<span style="color:green;">[NEW]</span> ' + $post.html());
        }
    });

    // saving visit time
    chrome.storage.sync.set({w_last_seen: moment().format("X")});
});


