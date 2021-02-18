define(["API/storageAPI", "APIerrors"], (
    storageAPI,
    { TestError, errUtils, StorageAccessError }
) => {
    async function storageTests() {
        let TEST
        const s_API = new storageAPI()

        try {
            $("#test-log").append("<li>Running Storage tests</li>")

            TEST = "GET_SINGLE_DEFAULT_KEY"
            {
                const res = await s_API.get("vendors")

                assert =
                    _.keys(res).length === 3 &&
                    res.doordash.title === "DoorDash"

                if (!assert) throw new TestError("incorrect response")
            }

            TEST = "GET_INVALID_KEY"
            {
                await errUtils.assertErrorThrown(
                    () => s_API.get("invalid key"),
                    StorageAccessError
                )
            }

            TEST = "SET_INVALID_KEY"
            {
                await errUtils.assertErrorThrown(
                    () => s_API.set("invalid_key", 123),
                    StorageAccessError
                )
            }

            TEST = "SETTINGS_SET_BEFORE_GET"
            {
                await s_API.set("settings", { default_vendor: "ubereats" })
                const settings = await s_API.get("settings")

                if (settings.default_vendor !== "ubereats")
                    throw new TestError("settings was not set")
            }

            TEST = "SETTINGS_SET_AGAIN"
            {
                await s_API.set("settings", { default_vendor: "grubhub" })
                const settings = await s_API.get("settings")

                if (settings.default_vendor !== "grubhub")
                    throw new TestError("settings not changed")
            }
        } catch (e) {
            throw { error: e, test: TEST }
        }
    }

    return storageTests
})
