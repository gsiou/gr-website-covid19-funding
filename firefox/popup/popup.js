var myWindowId;
const total = document.querySelector("#total");
const entolon = document.querySelector("#entolon");
const timologimeno = document.querySelector("#timologimeno");
const inList = document.querySelector("#in-list");
const notInList = document.querySelector("#not-in-list");

function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.runtime.sendMessage({
        tab: tabs[0].url
      });
    })
    .then(response => {
      if(response) {
        inList.classList.remove('hidden');
        notInList.classList.add('hidden');
        total.textContent = response.total;
        entolon.textContent = response.entolon;
        timologimeno.textContent = response.timologimeno;
      } else {
        inList.classList.add('hidden');
        notInList.classList.remove('hidden');
      }
    });
}

chrome.tabs.onActivated.addListener(updateContent);

chrome.tabs.onUpdated.addListener(updateContent);

browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});
