require([
    "content-scripts/doordash",
    "content-scripts/ubereats",
    "content-scripts/grubhub"
], (dd_obs, ub_obs, gh_obs) => {
    const vendor_obs = (() => {
        switch (window.location.origin) {
            case "https://www.doordash.com":
                return dd_obs
            case "https://www.ubereats.com":
                return ub_obs
            case "https://www.grubhub.com":
                return gh_obs
            default:
                return undefined
        }
    })()

    for (obs of vendor_obs) {
        obs()
        
        new MutationObserver(obs).observe(document.body, {
            childList: true,
            subtree: true
        })
    }
})
