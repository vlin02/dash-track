define(["jquery"], ($) => {
    class VendorButton {
        constructor(vendor, classes = "") {
            this.e = $("<a/>", {
                class: `waves-effect ${classes}`,
                style: "border-radius: 5px; display: flex;",
                html: `<img class='vendor-img' src='../../images/${vendor.title}-logo.png'/>`
            })
        }

        get = () => this.e

        set(selected) {
            if (selected)
                this.e
                    .removeClass("hoverable unselected-vendor-btn")
                    .addClass("selected-vendor-btn")
            else
                this.e
                    .removeClass("selected-vendor-btn")
                    .addClass("hoverable unselected-vendor-btn")
        }
    }

    return VendorButton
})
