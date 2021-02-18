define([
    "jquery",
    "lodash",
    "hooks",
    "API/storageAPI",
    "API/vendorAPI",
    "./Logo",
    "./header/Header",
    "./GridView"
], ($, _, {setState}, storageAPI, vendorAPI, Logo, Header, GridView) => {
    class Dashboard {
        s_API = new storageAPI()
        v_API = new vendorAPI()

        state = {
            selected_vendor: null
        }

        onVendorChange(selected_vendor) {
            this.set({ selected_vendor })
        }

        constructor() {
            return (async () => {
                const onVendorChange = this.onVendorChange.bind(this)

                const [vendors, default_vendor] = await Promise.all([
                    this.v_API.GET({}),
                    this.v_API.GET({
                        v_id: (await this.s_API.get("settings")).default_vendor
                    })
                ])

                this.logo = new Logo()
                this.header = await new Header(vendors, onVendorChange)
                this.gridView = new GridView()

                this.e = $("<div/>", {
                    style: "width: 95vw; margin: auto; margin-top: 15px"
                }).append([this.logo.get(), this.header.get(), this.gridView.get()])
                
                this.set({ selected_vendor: default_vendor })

                return this
            })()
        }

        get = () => this.e

        set(state) {
            if (setState(this.state, state)) return

            const { selected_vendor } = this.state

            this.header.set({ selected_vendor })
            this.gridView.set(selected_vendor)
        }
    }

    return Dashboard
})

// gridView = new gridView()

// unfavoriteModal = new unfavoriteModal(this.doUnfavorite)

// this.settings.defaultFetch().then(({ default_vendor }) => {
//   const { setDefault, setNotDefault } = this.defaultBtn
//   v_name == default_vendor ? setDefault() : setNotDefault()

//   this.defaultBtn.e.off("click")
//   this.defaultBtn.e.click(() => {
//     this.settings.update({ default_vendor: v_name })
//     this.defaultBtn.setDefault()
//   })
// })

// this.renderGrid(new Vendor(v_name))
