chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let url = changeInfo.status === "loading" ? undefined : changeInfo.url
  if (changeInfo.status === "complete") url = tab.url

  if (url !== undefined) {
    chrome.tabs.sendMessage(tabId, {
      message: "DASH_TRACK_URL_CHANGE",
      url,
      changeInfo
    })
  }
})
