/**
 * Created by waplet on 28/07/16.
 */

/**
 * Gets time from td - Vakar, 10:24; Šodien, 12:12, 25 Jul, 21:00 ...
 * @param {string} time
 * @returns {moment}
 */
function parseTime(time) {
    var timeParts = time.split(", ");
    var newTimePart = timeParts[1];
    var newDatePart;
    if (timeParts[0] === "Vakar") {
        newDatePart = moment().subtract(1, "day").format("D MMM");
    } else if (timeParts[0] === "Šodien") {
        newDatePart = moment().format("D MMM");
    } else {
        newDatePart = timeParts[0];
    }

    return moment(newDatePart + " " + newTimePart, "D MMM HH:mm");
}

/**
 * @param {{}} lastSeenObject
 * @param {int|null} lastSeenObject.w_last_seen
 * @param {int|null} lastSeenObject.w_temp_last_seen
 */
function storeLastSeenObject(lastSeenObject) {
    chrome.storage.sync.set({
        w_last_seen: lastSeenObject.w_last_seen,
        w_temp_last_seen: lastSeenObject.w_temp_last_seen,
    });
}

/**
 * @returns {Post[]}
 */
function getPosts() {
    // getting all last posts
    var lastPosts = document
        .getElementsByClassName('forum_last_posts')[0]
        .getElementsByTagName('tr');

    var lastPostsArr = [].slice.call(lastPosts); // hacks to turn HTMLCollection into Array

    return lastPostsArr.map(function (postRow) {
        var postTime = postRow
            .getElementsByClassName('date')[0]
            .innerText.split(" / ")[0];
        postTime = parseTime(postTime);

        var postNode = postRow
            .getElementsByTagName('td')[0]
            .getElementsByClassName('b11')[0];

        return new Post(postTime, postNode);
    });
}

/**
 * @param {Post[]} posts
 * @param {function} storeFunction
 * @param {moment} momentNow
 * @param {{}} lastSeenObject
 * @param {int|null} lastSeenObject.w_last_seen
 * @param {int|null} lastSeenObject.w_temp_last_seen
 */
function main(posts, storeFunction, momentNow, lastSeenObject) {
    console.log(lastSeenObject);
    // acquired time
    var lastSeenTime = moment(lastSeenObject.w_last_seen || 0, "X");
    var temporaryLastSeenTime = moment(lastSeenObject.w_temp_last_seen, "X") || null;

    // When coming back after was previously set temporary lastSeen,
    // make it as lastSeenTime
    var diff;
    if (temporaryLastSeenTime) {
        diff = momentNow.diff(temporaryLastSeenTime, 'minutes');
        if (diff <= 10) {
            lastSeenTime = temporaryLastSeenTime;
        }
    }

    var wasNewPost = false;

    posts.forEach(function (post) {
        if (post.isNew(lastSeenTime, momentNow)) {
            post.markAsNew();
            wasNewPost = true;
        }
    });

    // We should set new last seen if if "temporary" last seen exceeds 10 minutes
    var timestampNow = momentNow.format("X");
    if (!wasNewPost) {
        // If no new posts
        storeFunction({
            w_last_seen: timestampNow,
            w_temp_last_seen: null
        });
    } else if (temporaryLastSeenTime && diff <= 10) {
        // Maintain same temporaryLastSeenTime
        storeFunction({
            w_last_seen: timestampNow,
            w_temp_last_seen: temporaryLastSeenTime.format("X")
        });
    } else {
        if (!temporaryLastSeenTime && lastSeenTime) {
            storeFunction({
                w_last_seen: timestampNow,
                w_temp_last_seen: lastSeenTime.format("X")
            })
        } else {
            storeFunction({
                w_last_seen: timestampNow,
                w_temp_last_seen: timestampNow
            });
        }
    }
}