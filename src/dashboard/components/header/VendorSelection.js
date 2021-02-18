define(["jquery", "lodash", "./VendorButton"], ($, _, VendorButton) => {
    class VendorSelection {
        constructor(vendors, onVendorChange) {

            this.vendorButtons = _.mapValues(vendors, (vendor) => {
                const btn_class = vendor.id === "doordash" ? "doordash-vendor-btn" : null
                const btn = new VendorButton(vendor, btn_class)
                btn.get().click(() => onVendorChange(vendor))
                return btn
            })

            this.e = _.values(this.vendorButtons).map((btn) =>
                $("<div/>", { class: "col" }).append(btn.get())
            )
        }

        get = () => this.e

        set(selected_vendor) {
            for (const v_id of _.keys(this.vendorButtons)) {
                const btn = this.vendorButtons[v_id]
                btn.set(v_id == selected_vendor.id)
            }
        }
    }

    return VendorSelection
})
