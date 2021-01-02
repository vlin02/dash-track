const injectFavoriteButton = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")

  if (storeName !== undefined) {
    if (storeName.prop("outerHTML") !== undefined) {
      onButtonClick = () => {
        const context = JSON.parse(
          $('script[type="application/ld+json"]:contains(@context)').html()
        )

        let favoritesList = []
        chrome.storage.sync.get('favorites', (res) => {
          if (res.favorites !== undefined) favoritesList = res.favorites
        })

        if (!favoritesList.some((rsnt) => rsnt.name === context.name)) {
          favoritesList.push(context)
        }

        chrome.storage.sync.set({favorites: favoritesList})
      }

      const nameContainer = $("<div/>", {
        class: "d-inline-flex w-100 justify-content-between",
      }).append([
        storeName.clone(),
        $("<button/>", {
          class: "btn btn-danger",
          html:
            'Add to favorites <img src="https://icongr.am/fontawesome/star.svg?size=17&color=ffffff">',
          click: onButtonClick,
        }),
      ])

      storeName.replaceWith(nameContainer)

      injectFavoriteButton.disconnect()
    }
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
