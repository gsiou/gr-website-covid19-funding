var myWindowId;
const contentBox = document.querySelector("#content");

function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.runtime.sendMessage({
        tab: tabs[0].url
      });
    })
    .then(response => {
      if(response) {
        contentBox.textContent = response.total;
      } else {
        contentBox.textContent = "Δεν είναι στη λίστα"
      }
    });
}

browser.tabs.onActivated.addListener(updateContent);

browser.tabs.onUpdated.addListener(updateContent);

browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});
