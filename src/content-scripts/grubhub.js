define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    $("body").append(
        $("<script/>", {
            id: "jq",
            src: "https://code.jquery.com/jquery-3.3.1.min.js"
        })
    )

    const mainObs = new MutationObserver(() => {
        const schema = $(
            'script[type="application/ld+json"]:contains(@context)'
        )
        const favWrapper = $(".favorite-wrapper")
        const injectDiv = $("main")
        const rsnt_header = $("div[data-testid=restaurant-header]")

        if (
            schema.length !== 0 &&
            favWrapper.length == 0 &&
            injectDiv.length &&
            rsnt_header.length
        ) {
            const context = JSON.parse(schema.html())

            const rsnt_img = rsnt_header[0].style.backgroundImage.match(/^url\(\"(.*)\"\)$/)

            if (
                new RegExp(/^https:\/\/www.grubhub.com\/restaurant\/.*$/).test(location.href)
            ) {
                injectDiv.append(
                    new pageFavoriteButton({
                        name: context["name"],
                        url: context["@id"],
                        src: rsnt_img ? rsnt_img[1] : context["image"],
                        vendor: "grubhub"
                    }).buttonWrapper
                )
            }
        } else if (favWrapper.length > 1) {
            favWrapper.first().remove()
        }
    })

    const favBtnObs = new MutationObserver(() =>
        $(
            'button[title="Save this restaurant"], button[title="Saved restaurant"]'
        ).remove()
    )

    return [mainObs, favBtnObs]
})
