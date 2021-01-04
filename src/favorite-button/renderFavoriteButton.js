const renderFavoriteButton = (vendor, context, attr) =>
  new Promise((resolve) => {
    const isFavorited = (favorites) =>
      favorites.some((rsnt) => rsnt["id"] === context["id"])

    const useFavorites = (callback) =>
      chrome.storage.sync.get(vendor, (res) => {
        if (res[vendor] === undefined) res[vendor] = {}
        if (res[vendor].favorites === undefined) res[vendor].favorites = []
        callback(res[vendor].favorites)
      })

    const favButton = $("<button/>", {
      id: "favorite-button"
    })

    let addFavorite, removeFavorite

    const setAddButton = () => {
      favButton.html('Favorite <i class="far fa-heart"/>')
      favButton.off("click")
      favButton.click(addFavorite)
      favButton.attr(attr.add)
    }

    const setRemoveButton = () => {
      favButton.html('Unfavorite <i class="fas fa-heart-broken"/>')
      favButton.off("click")
      favButton.click(removeFavorite)
      favButton.attr(attr.remove)
    }

    addFavorite = () =>
      useFavorites((favorites) => {
        if (!isFavorited(favorites)) {
          favorites.push(context)
        } else {
          alert("This restaurant is already favorited")
        }

        chrome.storage.sync.set({ [vendor]: { favorites } })
        setRemoveButton()
        favButton.blur()
      })

    removeFavorite = () =>
      useFavorites((favorites) => {
        if (isFavorited(favorites)) {
          favorites = favorites.filter((rsnt) => rsnt["@id"] !== context["@id"])
        } else {
          alert("This restaurant is already unfavorited")
        }

        chrome.storage.sync.set({ [vendor]: { favorites } })
        setAddButton()
        favButton.blur()
      })

    useFavorites((favorites) => {
      isFavorited(favorites) ? setRemoveButton() : setAddButton()
      resolve(favButton)
    })
  })
