/**
 * Created by waplet on 28/07/16.
 */
chrome.storage.sync.get(
    [
        "w_last_seen",
        "w_temp_last_seen"
    ],
    main.bind(getPosts(), storeLastSeenObject, moment())
);