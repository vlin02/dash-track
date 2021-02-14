class vendorAPI {
    storage = new storageAPI()

    static checkSupported(v_id) {
        if (!(v_id && v_id in storageAPI.default_vendors))
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

    async getVendor({ v_id }) {
        vendorAPI.checkSupported(v_id)

        return (await this.storage.get("vendors")).vendors[v_id]
    }
}
