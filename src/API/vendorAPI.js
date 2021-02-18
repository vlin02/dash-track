define(["lodash", "./storageAPI", "APIerrors"], (
    _,
    storageAPI,
    { IllegalFieldError, UnsupportedVendorError }
) => {
    class vendorAPI {
        storage = new storageAPI()

        checkSupported(v_id) {
            if (!(v_id && v_id in this.storage.default_vendors))
                throw new UnsupportedVendorError(v_id)
        }

        async GET({ v_id }) {
            if (v_id) this.checkSupported(v_id)

            const vendors = await this.storage.get("vendors")

            return v_id ? vendors[v_id] : vendors
        }

        async PATCH({ v_id, ...patch }) {
            this.checkSupported(v_id)

            const allowedFields = ["restaurants"]

            for (const field in patch)
                if (!_.includes(allowedFields, field))
                    throw new IllegalFieldError(field)

            const vendors = await this.storage.get("vendors")

            await this.storage.set("vendors", {
                ...vendors,
                [v_id]: {
                    ...vendors[v_id],
                    ...patch
                }
            })
        }
    }

    return vendorAPI
})
