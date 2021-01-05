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

    const favButton = $("<a/>", {
      id: "favorite-button",
      class: "btn-floating btn-large",
      html: '<i class="material-icons">favorite</i>'
    })

    let setAddButton, setRemoveButton

    setAddButton = () => {
      favButton.off("click")
      favButton.click(setRemoveButton)
      favButton.removeClass("fav-btn").addClass("not-fav-btn")
    }

    setRemoveButton = () => {
      favButton.off("click")
      favButton.click(setAddButton)
      favButton.removeClass("not-fav-btn").addClass("fav-btn")
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
      })

    useFavorites((favorites) => {
      isFavorited(favorites) ? setRemoveButton() : setAddButton()
      resolve(
        $("<div/>", {
          class: "fixed-action-btn direction-top",
          style: "bottom: 45px; right: 24px;"
        }).append([favButton])
      )
    })
  })
