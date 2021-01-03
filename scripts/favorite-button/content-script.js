const injectFavoriteButton = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")
  const schema = $('script[type="application/ld+json"]:contains(@context)')

  if (
    storeName !== undefined &&
    storeName.prop("outerHTML") !== undefined &&
    schema.length > 0
  ) {
    const context = JSON.parse(schema.html())
    console.log('here')

    renderFavoriteButton("doordash", {
      id: context['@id'],
      name: context['name']
    }).then((favButton) => {
      const nameContainer = $("<div/>", {
        class: "d-inline-flex w-100 justify-content-between",
      }).append([storeName.clone(), favButton])

      storeName.replaceWith(nameContainer)
    })

    injectFavoriteButton.disconnect()
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
