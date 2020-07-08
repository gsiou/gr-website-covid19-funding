function getBase(url) {
    const hostname = new URL(url).hostname;
    if(hostname.substr(0, 4) === "www.") {
        return hostname.substr(4);
    } else {
        return hostname;
    }
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.active) {
        const base = getBase(tab.url);
        if (base.toUpperCase() in data) {
            // contentBox.textContent = data[base.toUpperCase()].total;
            chrome.browserAction.setBadgeText({text: "€"});
        } else {
            // contentBox.textContent = base;
            chrome.browserAction.setBadgeText({text: ""});
        }
    }
});

function handleMessage(request, sender, sendResponse) {
    const base = getBase(request.tab);
    if (base.toUpperCase() in data) {
        sendResponse(data[base.toUpperCase()]);
    } else {
        return Promise.resolve(false);
    }
}

chrome.runtime.onMessage.addListener(handleMessage);