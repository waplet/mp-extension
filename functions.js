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
        newDatePart = moment().tz('Europe/Riga').subtract(1, "day").format("D MMM");
    } else if(timeParts[0] == "Šodien") {
        newDatePart = moment().tz('Europe/Riga').format("D MMM");
    } else {
        newDatePart = timeParts[0];
    }

    return moment.tz(newDatePart + " " + newTimePart, "D MMM HH:mm", true, 'Europe/Riga');
}

/**
 * Return true if post is newer that it was last seen, and is "not newer" that current date
 * @param {moment} postTime
 * @param {moment} lastSeenTime
 * @param {moment} now
 * @returns {boolean}
 */
function isNewPost(postTime, lastSeenTime, now)
{
    return postTime.format("X") > lastSeenTime.format("X") && postTime.format("X") <= now.format("X");
}

/**
 * Returns username
 *
 * @example if user not logged in, return "Viesi"
 *
 * @returns {string}
 */
function getUsername()
{
    var usernameText = document.getElementById('top_userinfo').children[0].innerText;
    return usernameText.slice(0, -1);
}
