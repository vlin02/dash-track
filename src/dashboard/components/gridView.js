define([
    "jquery",
    "lodash",
    "API/restaurantAPI",
    "./StoreDetails",
    "common/UnfavoriteModal"
], ($, _, restaurantAPI, StoreDetails, UnfavoriteModal) => {
    class GridView {
        r_API = new restaurantAPI()

        state = {
            selected_vendor: null
        }

        onUnfavorite(rsnt) {
            this.unfavoriteModal.set(this.state.selected_vendor, rsnt)
            this.unfavoriteModal.show()
        }

        async onConfirm(vendor, rsnt) {
            await this.r_API.DELETE({
                v_id: vendor.id,
                r_id: rsnt.url
            })

            this.rsnts = _.filter(this.rsnts, ({url}) => url !== rsnt.url)
            this.renderRsnts()
        }

        constructor() {
            const onConfirm = this.onConfirm.bind(this)
            this.unfavoriteModal = new UnfavoriteModal(onConfirm)

            this.grid = $("<div/>", { class: "row" })
            this.e = $("<div/>").append([this.unfavoriteModal.get(), this.grid])
        }

        get = () => this.e

        set = async (selected_vendor) => {
            this.state.selected_vendor = selected_vendor

            this.rsnts = await this.r_API.GET({ v_id: selected_vendor.id })
            this.renderRsnts()
        }
        
        renderRsnts = () => {
            this.grid.empty()
            const onUnfavorite = this.onUnfavorite.bind(this)

            if (!_.isEmpty(this.rsnts)) {
                const storeCards = _.values(this.rsnts).map((rsnt) =>
                    $("<div/>", {
                        class: "col s12 m6 l4"
                    }).append(new StoreDetails(rsnt, onUnfavorite).get())
                )

                this.grid.append(storeCards)
            } else {
                this.grid.append($("<div/>", { class: "row" }))
            }
        }
    }

    return GridView
})
