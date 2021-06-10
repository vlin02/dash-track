define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = () => {
        const is_restaurant_page = new RegExp(
            /^https:\/\/www.grubhub.com\/restaurant\/.*$/
        ).test(location.href)

        if (!is_restaurant_page) return

        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )

        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("main")
        const rsnt_header = $("div[data-testid=restaurant-header]")

        if (
            schema.length &&
            injectDiv.length &&
            rsnt_header.length &&
            !favWrapper.length &&
            chrome.storage
        ) {
            const context = JSON.parse(schema.html())

            const rsnt_img =
                rsnt_header[0].style.backgroundImage.match(/^url\(\"(.*)\"\)$/)
            injectDiv.append(
                new pageFavoriteButton({
                    name: context["name"],
                    url: context["@id"],
                    src: rsnt_img ? rsnt_img[1] : context["image"],
                    vendor: "grubhub"
                }).buttonWrapper
            )
        } else if (favWrapper.length > 1) {
            favWrapper.first().remove()
        }
    }

    const favBtnObs = () =>
        $(
            'button[title="Save this restaurant"], button[title="Saved restaurant"]'
        ).remove()

    return [mainObs, favBtnObs]
})
