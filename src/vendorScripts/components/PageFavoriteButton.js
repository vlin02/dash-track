class pageFavoriteButton {
  constructor(rsnt) {
    this.rsnt = rsnt

    this.buttonWrapper = $("<div/>", {
      class: "fixed-action-btn direction-top favorite-wrapper",
      style: "bottom: 45px; right: 24px; z-index: 10000;",
      id: "button-wrapper"
    })

    this.favButton = $("<a/>", {
      class: "btn-floating btn-large",
      html: '<i class="material-icons">favorite</i>'
    })

    this.showStarred = $("<a/>", {
      class: "fav-item btn-floating grey darken-3",
      html: `<i class="material-icons yellow-text darken-1">star</i>`,
      "data-position": "left",
      "data-tooltip": "Under Development - coming soon!"
    })

    this.toolBar = $("<ul/>").append([
      $("<li/>", {
        html: this.showStarred
      })
    ])

    this.rsnt.vendor.defaultFetch().then(({ rsnts }) => {
      this.buttonWrapper.append([this.favButton, this.toolBar])

      this.rsnt.url in rsnts ? this.setFavButton(true) : this.setNotFavButton()
      this.showStarred.tooltip()
    })
  }

  setFavButton = (onLoad = false) => {
    this.buttonWrapper.floatingActionButton({ hoverEnabled: true })
    if (!onLoad) this.buttonWrapper.floatingActionButton("open")

    this.toolBar.show()

    this.favButton.off("click")
    this.favButton.click(() => {
      this.rsnt.vendor.removeRestaurant(this.rsnt).catch(alert)
      this.setNotFavButton()
    })
    
    this.favButton.removeClass("not-fav-btn tooltipped").addClass("fav-btn")
  }

  setNotFavButton = () => {
    this.buttonWrapper.floatingActionButton({ hoverEnabled: false })

    this.toolBar.hide()

    this.favButton.off("click")
    this.favButton.click(() => {
      this.rsnt.vendor.addRestaurant(this.rsnt).catch(alert)
      this.setFavButton()
    })
    this.favButton.removeClass("fav-btn").addClass("not-fav-btn tooltipped")
  }
}
