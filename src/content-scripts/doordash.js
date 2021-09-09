define(["jquery", "./components/pageFavoriteButton"], (
    $,
    pageFavoriteButton
) => {
    const mainObs = () => {
        const is_restaurant_page = new RegExp(
            /\/store\/.*$/
        ).test(location.href)

        if (!is_restaurant_page) return
        
        const title = $('title')
        const canonical = $('[rel=canonical]')

        const injectDiv = $("[style='z-index:1'], [style='z-index: 1;']")
        const favWrapper = $(".favorite-wrapper")

        const banner = $("img[src*='/media/store/header']")
        const item_imgs = $("img[src*='/media/photos/']")
        const thumbnail_img = banner ?? item_imgs

        if (
            title.length && title[0].text &&
            canonical.length &&
            injectDiv.length &&
            thumbnail_img.length &&
            !favWrapper.length &&
            chrome.storage
        ) {
            const name = title[0].text.match(/(.*) Delivery & Takeout/)[1]

            injectDiv.append(
                new pageFavoriteButton({
                    name: name,
                    url: canonical[0].href+'?utm_campaign=gpa', // legacy compatability
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
