define(() => {
    class DashTrackError extends Error {
        constructor(message) {
            super(message)
            this.name = this.constructor.name
        }
    }

    class APIFieldError extends DashTrackError {}

    class UnknownIDError extends DashTrackError {}

    class TestError extends DashTrackError {}

    class StorageAccessError extends APIFieldError {
        constructor(field) {
            super(`field "${field}" not authorized to be accessed from storage`)
            this.field = field
        }
    }

    class IllegalFieldError extends APIFieldError {
        constructor(field) {
            super(`"${field}" is an illegal field for this PATCH`)
            this.field = field
        }
    }

    class RequiredFieldError extends APIFieldError {
        constructor(field) {
            super(`"${field}" is a required field for this request`)
            this.field = field
        }
    }

    class UnsupportedVendorError extends UnknownIDError {
        constructor(v_id) {
            super(`"${v_id}" not a supported vendor ID`)
            this.v_id = v_id
        }
    }

    class RestaurantNotFoundError extends UnknownIDError {
        constructor(v_id, r_id) {
            super(`restaurant "${r_id}" cannot be found for vendor "${v_id}"`)
            this.r_id = r_id
            this.v_id = v_id
        }
    }

    class RestaurantAlreadyExistsError extends UnknownIDError {
        constructor(v_id, r_id) {
            super(
                `Trying to add existing restaurant "${r_id}" for vendor "${v_id}"`
            )
            this.r_id = r_id
            this.v_id = v_id
        }
    }

    class errUtils {
        static assertErrorThrown = async (func, expected_err) => {
            try {
                await func()
            } catch (e) {
                if (!(e instanceof expected_err))
                    throw new TestError(
                        `incorrect error thrown </br></br>${e.stack}</br>`
                    )
                return
            }

            throw new TestError(`Expected a ${expected_err}`)
        }
    }

    return {
        DashTrackError,
        APIFieldError,
        UnknownIDError,
        TestError,
        StorageAccessError,
        IllegalFieldError,
        RequiredFieldError,
        UnsupportedVendorError,
        RestaurantNotFoundError,
        RestaurantAlreadyExistsError,
        errUtils
    }
})
