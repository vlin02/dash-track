chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "DASH_TRACK_URL_CHANGE") {
    const { url } = request
    console.log(url)
  }
})
