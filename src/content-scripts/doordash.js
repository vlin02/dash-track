define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = () => {
        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )
        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("[style='z-index:1']")
        const item_imgs = $("picture > img[src*='/media/photos/']")

        if (
            schema.length &&
            injectDiv.length &&
            item_imgs.length &&
            !favWrapper.length &&
            chrome.storage
        ) {
            const context = JSON.parse(JSON.parse(schema.html()))

            if (
                new RegExp(/^https:\/\/www.doordash.com\/store\/.*$/).test(location.href)
            ) {
                const banner = $("picture > img[src*='/media/store/header']")

                const img_src =
                    banner.length !== 0
                        ? banner[0].src
                        : item_imgs[0].src

                injectDiv.append(
                    new pageFavoriteButton({
                        name: context["name"],
                        url: context["@id"],
                        src: img_src,
                        vendor: "doordash"
                    }).buttonWrapper
                )
            }
        } else if (favWrapper.length > 1) {
            favWrapper.first().remove()
        }
    }

    return [mainObs]
})
