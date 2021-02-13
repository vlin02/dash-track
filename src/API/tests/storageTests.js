// Test Storage class

async function storageTests() {
    let TEST, res, assert
    const s_API = new storageAPI()

    try {
        $("#test-log").append("<li>Running Storage tests</li>")

        TEST = "GET_SINGLE_DEFAULT_KEY"
        {
            res = await s_API.get("vendors")

            assert =
                Object.keys(res).length === 1 &&
                res.vendors.doordash.title === "DoorDash"

            if (!assert) throw "incorrect response"
        }

        TEST = "GET_MULTI_DEFAULT_KEYS"
        {
            res = await s_API.get(["items", "restaurants"])

            assert =
                Object.keys(res).length === 2 &&
                Array.isArray(res.items) &&
                Array.isArray(res.restaurants)

            if (!assert) throw "incorrect response"
        }

        TEST = "GET_INVALID_KEY"
        {
            await errUtils.assertErrorThrown(
                async () => await s_API.get(["vendors", "invalid key"]),
                "UNKNOWN_STORAGE_KEY"
            )
        }

        TEST = "SET_INVALID_KEY"
        {
            await errUtils.assertErrorThrown(
                async () => await s_API.set({ invalid_key: 123 }),
                "UNKNOWN_STORAGE_KEY"
            )
        }

        TEST = "SETTINGS_SET_BEFORE_GET"
        {
            await s_API.set({ settings: { default_vendor: "ubereats" } })
            let { settings } = await s_API.get("settings")

            if (settings.default_vendor !== "ubereats")
                throw "settings was not set"
        }

        TEST = "SETTINGS_SET_AGAIN"
        {
            await s_API.set({ settings: { default_vendor: "grubhub" } })
            const {settings} = (await s_API.get("settings"))

            if (settings.default_vendor !== "grubhub")
                throw "settings not changed"
        }
    } catch (e) {
        console.log(e)
        throw `${TEST}: ${e}`
    }
}
