define(["lodash"], (_) => ({
    setState: (state, new_state) => {
        state = _.assign(state, new_state)
        return _.values(state).includes(null)
    }
}))
