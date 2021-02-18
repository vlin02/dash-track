define([
    "jquery",
    "lodash",
    "hooks",
    "API/storageAPI",
    "API/vendorAPI",
    "./VendorTitle",
    "./DefaultButton",
    "./VendorSelection"
], (
    $,
    _,
    { setState },
    storageAPI,
    vendorAPI,
    VendorTitle,
    DefaultButton,
    VendorSelection
) => {
    class Header {
        s_API = new storageAPI()
        v_API = new vendorAPI()

        state = {
            selected_vendor: null,
            default_vendor: null
        }

        async onDefaultChange(vendor) {
            await this.s_API.set("settings", {
                default_vendor: vendor.id
            })

            this.set({ default_vendor: vendor })
        }

        constructor(vendors, onVendorChange) {
            const onDefaultChange = this.onDefaultChange.bind(this)

            this.vendorTitle = new VendorTitle()
            this.defaultButton = new DefaultButton(onDefaultChange)
            this.vendorSelection = new VendorSelection(vendors, onVendorChange)

            this.e = $("<div/>", {
                class: "row valign-wrapper",
                style: "margin-top: 0px"
            })

            this.onMount()
        }

        async onMount() {
            const default_vendor = await this.v_API.GET({
                v_id: (await this.s_API.get("settings")).default_vendor
            })

            this.e.append([
                $("<div/>", { class: "col" }).append(this.vendorTitle.get()),
                ...this.vendorSelection.get(),
                $("<div/>", {
                    class: "col",
                    style: "margin-left: auto"
                }).append(this.defaultButton.get())
            ])

            this.set({ default_vendor })
        }

        get = () => this.e

        set(state) {
            if (setState(this.state, state)) return

            const { selected_vendor, default_vendor } = this.state

            this.vendorTitle.set(selected_vendor)
            this.vendorSelection.set(selected_vendor)
            this.defaultButton.set(selected_vendor, default_vendor)
        }
    }

    return Header
})
