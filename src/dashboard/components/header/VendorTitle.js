define(["jquery"], ($) => {
    class VendorTitle {
        constructor() {
            this.e = $("<a/>")

            this.text = $("<h2/>", {
                style: "line-height: 90%; margin: 0px 0px 0px 0px;"
            })

            this.e.append(this.text)
        }

        get = () => this.e

        set = (selected_vendor) => {
            const { title, link, color } = selected_vendor

            this.e.attr("href", link)

            this.text.html(title)
            this.text.css({ color })
        }
    }
    return VendorTitle
})
