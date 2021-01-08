chrome.storage.sync.get({new_key: 5}, (res) => {
    console.log(res)
})

default_obj = {
    name: "doordash",
    rsnts: {
        "Mcdonalds_URL": {
            name: "Mcdonald's",
            src: "src_to_mcdonalds_banner.png"
        },
        "Burger_king_URL": {
            name: "Burger King",
            src: "src_to_burger_king_banner.png"
        }
    }
}

chrome.storage.sync.get({new_key: default_obj}, (res) => {
    console.log(res)
})