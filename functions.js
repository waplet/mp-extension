/**
 * Created by waplet on 28/07/16.
 */

/**
 * Gets time from td
 * @param time string
 * @returns {*}
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
 * @param postTime moment
 * @param lastSeenTime moment
 * @returns {boolean}
 */
function isNewPost(postTime, lastSeenTime)
{
    console.log(postTime.format("YYYY-MM-DD HH:mm:ss"), lastSeenTime.format("YYYY-MM-DD HH:mm:ss"));
    return postTime.format("X") > lastSeenTime.format("X");
}