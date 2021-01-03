const injectFavoriteButton = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favoriteButton = $('#favorite-button')

  if (
    storeName !== undefined &&
    storeName.prop("outerHTML") !== undefined &&
    schema.length &&
    !favoriteButton.length
  ) {
    const context = JSON.parse(schema.html())

    renderFavoriteButton("doordash", {
      id: context["@id"],
      name: context["name"],
    }).then((favButton) => {
      const nameContainer = $("<div/>", {
        class: "d-inline-flex w-100 justify-content-between",
        id: "favorite-button"
      }).append([storeName.clone(), favButton])

      storeName.replaceWith(nameContainer)
    })

    injectFavoriteButton.disconnect()
  }
})

chrome.runtime.onMessage.addListener((request) => {
  if (
    request.message === "DASH_TRACK_URL_CHANGE" &&
    request.url.match(/^https:\/\/www.doordash.com\/store\/.*/) !== null
  ) {
    injectFavoriteButton.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
})
