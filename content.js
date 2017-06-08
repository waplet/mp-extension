/**
 * Created by waplet on 28/07/16.
 */
chrome.storage.sync.get(["w_last_seen", "w_temp_last_seen"], function(lastSeenObject) {
    // acquired time
    var lastSeenTime = moment(lastSeenObject.w_last_seen || 0, "X");
    var temporaryLastSeen = lastSeenObject.w_temp_last_seen || null;

    // getting all last posts

    var lastPosts = document
        .getElementsByClassName('forum_last_posts')[0]
        .getElementsByTagName('tr');

    var lastPostsArr = [].slice.call(lastPosts); // hacks to turn HTMLCollection into Array

    var wasNewPost = false;
    lastPostsArr.forEach(function (post, index) {
        // getting post time
        var postTime = post
            .getElementsByClassName('date')[0]
            .innerText.split(" / ")[0];

        postTime = parseTime(postTime);

        if (isNewPost(postTime, lastSeenTime, moment())) {
            // getting post node
            var postNode = post
                .getElementsByTagName('td')[0]
                .getElementsByClassName('b11')[0];
            postNode.innerHTML = '<span style="color:green;">[NEW]</span> ' + postNode.innerHTML;

            if (!wasNewPost) {
                wasNewPost = true;
            }
        }
    });

    // We should set new last seen if if "temprorary" last seen exceeds 10 minutes, or some seconds
    if (temporaryLastSeen || !wasNewPost) {
        if (moment().diff(moment(temporaryLastSeen, "X"), 'minutes') > 10 || !wasNewPost) {
            chrome.storage.sync.set({
                w_last_seen: moment().format("X"),
                w_temp_last_seen: null
            });
        }
    } else {
        chrome.storage.sync.set({
            w_last_seen: lastSeenTime.format("X"),
            w_temp_last_seen: moment().format("X")
        });
    }
});


