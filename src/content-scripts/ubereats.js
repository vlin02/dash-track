define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = () => {
        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )
        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("#main-content")

        if (
            schema.length &&
            injectDiv.children().length > 1 &&
            !favWrapper.length &&
            chrome.storage
        ) {
            const context = JSON.parse(schema.html())

            if (
                new RegExp(
                    /^https:\/\/www.ubereats.com\/store\/.*$/
                ).test(location.href)
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
    }

    const favBtnObs = () =>
        $(
            'button[title="Save as favorite"], button[title="Remove from favorites"]'
        ).remove()

    return [mainObs, favBtnObs]
})
