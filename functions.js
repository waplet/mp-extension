/**
 * Created by waplet on 28/07/16.
 */

/**
 * Gets time from td - Vakar, 10:24; Šodien, 12:12, 25 Jul, 21:00 ...
 * @param {string} time
 * @returns {moment}
 */
function parseTime(time)
{
    var timeParts = time.split(", ");
    var newTimePart = timeParts[1];
    var newDatePart;
    if (timeParts[0] == "Vakar") {
        newDatePart = moment().subtract(1, "day").format("D MMM");
    } else if(timeParts[0] == "Šodien") {
        newDatePart = moment().format("D MMM");
    } else {
        newDatePart = timeParts[0];
    }

    return moment(newDatePart + " " + newTimePart, "D MMM HH:mm");
}

/**
 * Return true if post is newer that it was last seen
 * @param {moment} postTime
 * @param {moment} lastSeenTime
 * @returns {boolean}
 */
function isNewPost(postTime, lastSeenTime)
{
    return postTime.format("X") > lastSeenTime.format("X");
}