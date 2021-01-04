buttonAttrs = {
  add: {
    class: "btn btn-outline-danger"
  },
  remove: {
    class: "btn btn-danger"
  }
}


const injectFavoriteButton = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")
  const schema = $('script[type="application/ld+json"]:contains(@context)')
  const favoriteButton = $("#favorite-button")

  if (
    storeName !== undefined &&
    storeName.prop("outerHTML") !== undefined &&
    schema.length &&
    !favoriteButton.length
  ) {
    const context = JSON.parse(schema.html())
    const url = context["@id"]
    console.log(url)
    if (url && url.match(/^https:\/\/www.doordash.com\/store\/.*/)) {
      renderFavoriteButton("doordash", {
        id: context["@id"],
        name: context["name"],
      }, buttonAttrs).then((favButton) => {
        const nameContainer = $("<div/>", {
          class: "d-inline-flex w-100 justify-content-between",
        }).append([storeName.clone(), favButton])

        storeName.replaceWith(nameContainer)
      })
      injectFavoriteButton.disconnect()
    }
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })