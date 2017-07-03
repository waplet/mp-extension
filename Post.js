/**
 * @constructs
 * @param {moment} postTime
 * @param {HTMLElement} node
 */
Post = function (postTime, node) {
    this.postTime = postTime;
    this.node = node;
};

Post.prototype.markAsNew = function () {
    this.node.innerHTML = '<span style="color:green;">[NEW]</span> ' + this.node.innerHTML;
};

/**
 * Return true if post is newer that it was last seen, and is "not newer" that current date
 * @param {moment} lastSeenTime
 * @param {moment} now
 * @returns {boolean}
 */
Post.prototype.isNew = function (lastSeenTime, now) {
    return this.postTime.format("X") > lastSeenTime.format("X") && parseInt(this.postTime.format("X")) <= parseInt(now.format("X"));
};