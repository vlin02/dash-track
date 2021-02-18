define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = new MutationObserver(() => {
        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )
        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("#main-content")

        if (
            schema.length &&
            injectDiv.children().length > 1 &&
            !favWrapper.length
        ) {
            const context = JSON.parse(schema.html())

            if (
                new RegExp(/^https:\/\/www.ubereats.com\/.*\/food-delivery\/.*$/).test(location.href)
            ) {
                const img_src = context["image"][2].replace("\\u002F", "/")

                injectDiv.append(
                    new pageFavoriteButton({
                        name: context["name"],
                        url: context["@id"],
                        src: img_src,
                        vendor: "ubereats"
                    }).buttonWrapper
                )
            }
        } else if (favWrapper.length > 1) {
            favWrapper.first().remove()
        }
    }).observe(document, { childList: true, subtree: true })

    const favBtnObs = new MutationObserver(() =>
        $(
            'button[title="Save as favorite"], button[title="Remove from favorites"]'
        ).remove()
    ).observe(document, { childList: true, subtree: true })

    return [mainObs, favBtnObs]
})
