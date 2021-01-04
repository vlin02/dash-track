const renderFavoriteButton = (vendor, context, classes = ["", "btn btn-outline-danger", "btn btn-danger"]) =>
  new Promise((resolve) => {
    const isFavorited = (favorites) =>
      favorites.some((rsnt) => rsnt["id"] === context["id"])

    const useFavorites = (callback) =>
      chrome.storage.sync.get(vendor, (res) => {
        if (res[vendor] === undefined) res[vendor] = {}
        if (res[vendor].favorites === undefined) res[vendor].favorites = []
        callback(res[vendor].favorites)
      })

    addFavorite = () =>
      useFavorites((favorites) => {
        if (!isFavorited(favorites)) {
          favorites.push(context)
        } else {
          alert("This restaurant is already favorited")
        }

        chrome.storage.sync.set({ [vendor]: { favorites } })
        addFavoriteButton.hide()
        removeFavoriteButton.show()
      })

    removeFavorite = () =>
      useFavorites((favorites) => {
        if (isFavorited(favorites)) {
          favorites = favorites.filter((rsnt) => rsnt["@id"] !== context["@id"])
        } else {
          alert("This restaurant is already unfavorited")
        }

        chrome.storage.sync.set({ [vendor]: { favorites } })
        removeFavoriteButton.hide()
        addFavoriteButton.show()
      })

    const addFavoriteButton = $("<button/>", {
      class: classes[1],
      html: 'Favorite <i class="far fa-heart"/>',
      click: addFavorite,
    })

    const removeFavoriteButton = $("<button/>", {
      class: classes[2],
      html: 'Unfavorite <i class="fas fa-heart-broken"/>',
      click: removeFavorite,
    })

    useFavorites((favorites) => {
      if (isFavorited(favorites)) {
        addFavoriteButton.hide()
      } else {
        removeFavoriteButton.hide()
      }

      resolve(
        $("<div/>", {
          class: classes[0],
          id: "favorite-button",
        }).append([addFavoriteButton, removeFavoriteButton])
      )
    })
  })
