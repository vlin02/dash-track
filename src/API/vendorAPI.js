class vendorAPI {
    storage = new storageAPI()

    static checkSupported(id) {
        if (!(id && id in storageAPI.default_vendors))
            throw "UNSUPPORTED_VENDOR"
    }

    GET({ type, body }) {
        switch (type) {
            case "VENDOR":
                return this.getVendor(body)
            default:
                throw "UNKNOWN_VENDOR_GET_TYPE"
        }
    }

    async getVendor({ id }) {
        vendorAPI.checkSupported(id)

        return (await this.storage.get("vendors")).vendors[id]
    }
}
