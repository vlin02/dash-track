define(["materialize", "jquery", "API/restaurantAPI", "APIerrors"], (
    _,
    $,
    restaurantAPI,
    { RestaurantNotFoundError, RestaurantAlreadyExistsError }
) => {
    class pageFavoriteButton {
        r_API = new restaurantAPI()

        constructor(rsnt) {
            this.rsnt = rsnt

            this.buttonWrapper = $("<div/>", {
                class: "fixed-action-btn direction-top favorite-wrapper",
                style: "bottom: 45px; right: 24px; z-index: 10000;",
                id: "button-wrapper"
            })

            this.favButton = $("<a/>", {
                class: "btn-floating btn-large",
                style: "background-color: #424242",
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

            this.r_API
                .GET({
                    v_id: this.rsnt.vendor
                })
                .then((rsnts) => {
                    this.buttonWrapper.append([this.favButton, this.toolBar])

                    this.rsnt.url in rsnts
                        ? this.setFavButton(true)
                        : this.setNotFavButton()
                    this.showStarred.tooltip()
                })
        }

        setFavButton = (onLoad = false) => {
            this.buttonWrapper.floatingActionButton({ hoverEnabled: true })
            if (!onLoad) this.buttonWrapper.floatingActionButton("open")

            this.toolBar.show()

            this.favButton.off("click")
            this.favButton.click(() => {
                this.r_API
                    .DELETE({ v_id: this.rsnt.vendor, r_id: this.rsnt.url })
                    .catch((err) => {
                        if (err instanceof RestaurantNotFoundError)
                            alert("This restaurant is already unfavorited")
                    })
                this.setNotFavButton()
            })

            this.favButton
                .removeClass("not-fav-btn tooltipped")
                .addClass("fav-btn")
        }

        setNotFavButton = () => {
            this.buttonWrapper.floatingActionButton({ hoverEnabled: false })

            this.toolBar.hide()

            this.favButton.off("click")
            this.favButton.click(() => {
                this.r_API
                    .POST({ v_id: this.rsnt.vendor, restaurant: this.rsnt })
                    .catch((err) => {
                        if (err instanceof RestaurantAlreadyExistsError)
                            alert("This restaurant is already favorited")
                    })
                this.setFavButton()
            })
            this.favButton
                .removeClass("fav-btn")
                .addClass("not-fav-btn tooltipped")
        }
    }

    return pageFavoriteButton
})
