/**
 * Created by waplet on 28/07/16.
 */

// content.js

// getting cookie
var cookieName = "w_last_seen";
var lastSeenCookie = Cookies.get(cookieName) || 0;
var lastSeenTime = moment(lastSeenCookie, "X");

// getting all last posts
var lastPosts = $('table.forum_last_posts:first-child').find('tr');

// marking posts as new
$.each(lastPosts, function(i, post) {
    var $post = $(post).find('td:first-child a.b11');
    var time = $(post).find('td.date').text().split(" / ")[0];
    time = parseTime(time);

    if (isNewPost(time, lastSeenTime)) {
        $post.html('<span style="color:green;">[NEW]</span> ' + $post.html());
    }
});

// updating last seen cookie
Cookies.set(cookieName, moment().format("X"));