/**
 * @constructs
 * @param {moment} postTime
 * @parma {HTMLElement} node
 */
Post = function (postTime, node) {
    this.postTime = postTime;
    this.node = node;
}

Post.prototype.markAsNew = function () {
    this.node.innerHTML = '<span style="color:green;">[NEW]</span> ' + this.node.innerHTML;
}

/**
 * Return true if post is newer that it was last seen, and is "not newer" that current date
 * @param {moment} postTime
 * @param {moment} lastSeenTime
 * @param {moment} now
 * @returns {boolean}
 */
Post.prototype.isNew = function (lastSeenTime, now) {
    return postTime.format("X") > lastSeenTime.format("X") && postTime.format("X") <= now.format("X");
}