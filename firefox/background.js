function getBase(url) {
    return new URL(url).hostname.substr(4);
}
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.active) {
        const base = getBase(tab.url);
        if (base.toUpperCase() in data) {
            // contentBox.textContent = data[base.toUpperCase()].total;
            browser.browserAction.setBadgeText({text: "€"});
        } else {
            // contentBox.textContent = base;
            browser.browserAction.setBadgeText({text: ""});
        }
    }
});

function handleMessage(request, sender) {
    const base = getBase(request.tab);
    if (base.toUpperCase() in data) {
        return Promise.resolve(data[base.toUpperCase()]);
    } else {
        return Promise.resolve(false);
    }
}

browser.runtime.onMessage.addListener(handleMessage);