chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.getAllInWindow(tabs =>{
    for (tab of tabs) {
      if(tab.title == "Dashtrack Favorites") {
        return chrome.tabs.update(tab.id, {highlighted: true})
      } 
    }

    chrome.tabs.create({ url: chrome.extension.getURL("src/API/tests/tests.html")})
  })
})
