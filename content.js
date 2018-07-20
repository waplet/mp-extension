/**
 * Created by waplet on 28/07/16.
 */

// Add Riga's timezone
moment.tz.add("Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4");

var config = {
    'delayType': 'minutes',
    'delayAmount': 10
};

chrome.storage.sync.get(["w_last_seen", "w_temp_last_seen", "w_prev_last_seen"], function(lastSeenObject) {
    // acquired time
    var lastSeenTime = moment(lastSeenObject.w_last_seen || 0, "X");
    var temporaryLastSeenTime = moment(lastSeenObject.w_temp_last_seen, "X") || null; // is used for 10 minutes
    var previousLastSeenTime = moment(lastSeenObject.w_prev_last_seen || lastSeenObject.w_last_seen || 0, "X");

    // When coming back after was previously set temporary lastSeen,
    // make it as lastSeenTime
    if (temporaryLastSeenTime) {
        if (moment().diff(temporaryLastSeenTime, config.delayType) <= config.delayAmount) {
            lastSeenTime = previousLastSeenTime;
        }
    }

    // getting all last posts
    var lastPosts = document
        .getElementsByClassName('forum_last_posts')[0]
        .getElementsByTagName('tr');

    var username = getUsername();
    var lastPostsArr = [].slice.call(lastPosts); // hacks to turn HTMLCollection into Array

    var wasNewPost = false;
    lastPostsArr.forEach(function (post, index) {
        // getting post time
        var postData = post
            .getElementsByClassName('date')[0]
            .innerText.split(" / ");

        var postTime = postData[0];
        var replyUser = postData[1];

        postTime = parseTime(postTime);

        if (isNewPost(postTime, lastSeenTime, moment()) && replyUser !== username) {
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

    // We should set new last seen if if "temporary" last seen exceeds 10 minutes
    var timestampNow = moment().format("X");
    if (!wasNewPost) {
        // If no new posts
        chrome.storage.sync.set({
            w_last_seen: timestampNow,
            w_temp_last_seen: null,
            w_prev_last_seen: null
        });
    } else if (temporaryLastSeenTime && moment().diff(temporaryLastSeenTime, config.delayType) <= config.delayAmount) {
        // Maintain same temporaryLastSeenTime
        chrome.storage.sync.set({
            w_last_seen: timestampNow,
            w_temp_last_seen: temporaryLastSeenTime.format("X"),
            w_prev_last_seen: lastSeenTime.format("X")
        });
    } else {
        chrome.storage.sync.set({
            w_last_seen: timestampNow,
            w_temp_last_seen: timestampNow,
            w_prev_last_seen: lastSeenTime.format("X")
        });
    }
});


