define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = () => {
        const is_restaurant_page = new RegExp(
            /^https:\/\/www.doordash.com\/store\/.*$/
        ).test(location.href)

        if (!is_restaurant_page) return

        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )
        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("[style='z-index:1']")

        const banner = $("picture > img[src*='/media/store/header']")
        const item_imgs = $("picture > img[src*='/media/photos/']")

        const thumbnail_img = banner ?? item_imgs

        if (
            schema.length &&
            injectDiv.length &&
            !favWrapper.length &&
            thumbnail_img &&
            chrome.storage
        ) {
            const context = JSON.parse(JSON.parse(schema.html()))

            injectDiv.append(
                new pageFavoriteButton({
                    name: context["name"],
                    url: context["@id"],
                    src: thumbnail_img[0].src,
                    vendor: "doordash"
                }).buttonWrapper
            )
        } else if (favWrapper.length > 1) {
            favWrapper.first().remove()
        }
    }

    return [mainObs]
})
