/**
 * Created by waplet on 28/07/16.
 */
chrome.storage.sync.get("w_last_seen", function(lastSeenObject) {
    // acquired time
    var lastSeenTime = moment(lastSeenObject.w_last_seen || 0, "X");
    // getting all last posts

    var lastPosts = document
        .getElementsByClassName('forum_last_posts')[0]
        .getElementsByTagName('tr');

    var lastPostsArr = [].slice.call(lastPosts); // hacks to turn HTMLCollection into Array

    lastPostsArr.forEach(function (post, index) {

        // getting post time
        var postTime = post
            .getElementsByClassName('date')[0]
            .innerText.split(" / ")[0];

        postTime = parseTime(postTime);

        if (isNewPost(postTime, lastSeenTime)) {
            // getting post node
            var postNode = post
                .getElementsByTagName('td')[0]
                .getElementsByClassName('b11')[0];
            postNode.innerHTML = '<span style="color:green;">[NEW]</span> ' + postNode.innerHTML;
        }
    })

    // saving visit time
    chrome.storage.sync.set({w_last_seen: moment().format("X")});
});


