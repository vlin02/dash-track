class errUtils {
    static keysExist(obj, keys) {
        for (const key of keys)
            if (!(key in obj)) return false
        return true
    }

    static assertErrorThrown = async (func, expected_err) => {
        try {
            await func()
        } catch (e) {
            if (e !== expected_err) throw `threw wrong error - ${e}`
            return
        }
    
        throw "expected error"
    }
}