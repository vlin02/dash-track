const renderFavoriteButton = (vendor, context) =>
  new Promise((resolve) => {
    const isFavorited = (favorites) =>
      favorites.some((rsnt) => rsnt["id"] === context["id"])

    const useFavorites = (callback) =>
      chrome.storage.sync.get(vendor, (res) => {
        if (res[vendor] === undefined) res[vendor] = {}
        if (res[vendor].favorites === undefined) res[vendor].favorites = []
        callback(res[vendor].favorites)
      })

    const buttonWrapper = $("<div/>", {
      class: "fixed-action-btn direction-top favorite-wrapper",
      style: "bottom: 45px; right: 24px; z-index: 10000;",
      id: "button-wrapper"
    })

    const favButton = $("<a/>", {
      class: "btn-floating btn-large",
      html: '<i class="material-icons">favorite</i>'
    })

    const showStarred = $("<a/>", {
      class: "fav-item btn-floating grey darken-3",
      html: `<i class="material-icons yellow-text darken-1">star</i>`,
      "data-position": "left",
      "data-tooltip": "View favorited items"
    })

    const toolBar = $("<ul/>").append([
      $("<li/>", {
        html: showStarred
      })
    ])

    let setFavButton, setNotFavButton

    setFavButton = (onLoad = false) => {
      buttonWrapper.floatingActionButton({ hoverEnabled: true })
      if (!onLoad) buttonWrapper.floatingActionButton("open")

      toolBar.show()

      favButton.off("click")
      favButton.click(removeFavorite)
      favButton.removeClass("not-fav-btn tooltipped").addClass("fav-btn")
    }

    setNotFavButton = () => {
      buttonWrapper.floatingActionButton({ hoverEnabled: false })

      toolBar.hide()

      favButton.off("click")
      favButton.click(addFavorite)
      favButton.removeClass("fav-btn").addClass("not-fav-btn tooltipped")
    }

    addFavorite = () =>
      useFavorites((favorites) => {
        if (!isFavorited(favorites)) {
          favorites.push(context)
        } else {
          alert("This restaurant is already favorited")
        }

        chrome.storage.sync.set({ [vendor]: { favorites } })
        setFavButton()
      })

    removeFavorite = () =>
      useFavorites((favorites) => {
        if (isFavorited(favorites)) {
          favorites = favorites.filter((rsnt) => rsnt["@id"] !== context["@id"])
        } else {
          alert("This restaurant is already unfavorited")
        }

        chrome.storage.sync.set({ [vendor]: { favorites } })
        setNotFavButton()
      })

    useFavorites((favorites) => {
      buttonWrapper.append([favButton, toolBar])

      isFavorited(favorites) ? setFavButton(true) : setNotFavButton()
      showStarred.tooltip()

      resolve(buttonWrapper)
    })
  })
