chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({
    url: chrome.extension.getURL("experiments/default-storage/test-loader.html")
  })
})
