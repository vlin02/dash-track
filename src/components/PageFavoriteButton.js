const renderPageFavorite = (rsnt) =>
  new Promise((resolve) => {
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
      favButton.click(() => {
        rsnt.vendor.removeRestaurant(rsnt).catch(alert)
        setNotFavButton()
      })
      favButton.removeClass("not-fav-btn tooltipped").addClass("fav-btn")
    }

    setNotFavButton = () => {
      buttonWrapper.floatingActionButton({ hoverEnabled: false })

      toolBar.hide()

      favButton.off("click")
      favButton.click(() => {
        rsnt.vendor.addRestaurant(rsnt).catch(alert)
        setFavButton()
      })
      favButton.removeClass("fav-btn").addClass("not-fav-btn tooltipped")
    }

    rsnt.vendor.defaultFetch().then(({rsnts}) => {
      buttonWrapper.append([favButton, toolBar])

      rsnt.url in rsnts ? setFavButton(true) : setNotFavButton()
      showStarred.tooltip()

      resolve(buttonWrapper)
    })
  })
