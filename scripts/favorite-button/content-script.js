const injectFavoriteButton = new MutationObserver(() => {
  const storeName = $(".sc-dTLGrV.gYYmdm")
  const schema = $('script[type="application/ld+json"]:contains(@context)')

  if (
    storeName !== undefined &&
    storeName.prop("outerHTML") !== undefined &&
    schema.length > 0
  ) {
    const context = JSON.parse(schema.html())

    let favoritesList = []
    let isFavorited = () => favoritesList.some((rsnt) => rsnt['@id'] === context['@id'])

    chrome.storage.sync.get("favorites", (res) => {
      if (res.favorites !== undefined) favoritesList = res.favorites

      addFavorite = () => {
        if (!isFavorited()) {
          favoritesList.push(context)
        } else {
          alert("This restaurant is already favorited")
        }

        chrome.storage.sync.set({ favorites: favoritesList })
        addFavoriteButton.hide()
        removeFavoriteButton.show()
      }

      removeFavorite = () => {
        if (isFavorited()) {
          favoritesList = favoritesList.filter(
            (rsnt) => rsnt['@id'] !== context['@id']
          )
        } else {
          alert("This restaurant is already unfavorited")
        }

        chrome.storage.sync.set({ favorites: favoritesList })
        removeFavoriteButton.hide()
        addFavoriteButton.show()
      }

      const addFavoriteButton = $("<button/>", {
        class: "btn btn-outline-danger",
        html: 'Favorite <i class="far fa-heart"/>',
        click: addFavorite,
      })

      const removeFavoriteButton = $("<button/>", {
        class: "btn btn-danger",
        html: 'Unfavorite <i class="fas fa-heart-broken"/>',
        click: removeFavorite,
      })

      if (isFavorited()) {
        addFavoriteButton.hide()
      } else {
        removeFavoriteButton.hide()
      }

      const nameContainer = $("<div/>", {
        class: "d-inline-flex w-100 justify-content-between",
      }).append([storeName.clone(), removeFavoriteButton, addFavoriteButton])

      storeName.replaceWith(nameContainer)

      injectFavoriteButton.disconnect()
    })
  }
})

injectFavoriteButton.observe(document.body, { childList: true, subtree: true })
