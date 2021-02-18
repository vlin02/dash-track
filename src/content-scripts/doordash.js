define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = new MutationObserver(() => {
        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )
        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("body > #root > div > div")
        const first_item_img = $("picture > img")

        if (
            schema.length &&
            injectDiv.length &&
            first_item_img.length &&
            !favWrapper.length
        ) {
            const context = JSON.parse(schema.html())

            if (
                new RegExp(/^https:\/\/www.doordash.com\/store\/.*$/).test(location.href)
            ) {
                const banner = $("img[srcset*='/media/store']")
                const item_imgs = first_item_img
                    .attr("srcset")
                    .split(/ \d+w,? ?/)

                const img_src =
                    banner.length !== 0
                        ? banner[0].srcset.split(" ")[10]
                        : item_imgs[4]

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
    })

    return [mainObs]
})
