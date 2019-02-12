export const isReady = (state) => {
    const { daemons, app } = state.app.config
    const config_daemon = daemons[app.net_type]

    let target_height
    if (config_daemon.type === "local" && !state.daemon.info.is_ready) {
        target_height = Math.max(state.daemon.info.height, state.daemon.info.target_height)
    } else {
        target_height = state.daemon.info.height
    }

    if (config_daemon.type === "local") {
        return state.daemon.info.is_ready && state.wallet.info.height >= target_height - 1
    } else {
        return state.wallet.info.height >= target_height - 1
    }
    return false
}

export const isAbleToSend = (state) => {
    const { daemons, app } = state.app.config
    const config_daemon = daemons[app.net_type]

    let target_height
    if (config_daemon.type === "local" && !state.daemon.info.is_ready) {
        target_height = Math.max(state.daemon.info.height, state.daemon.info.target_height)
    } else {
        target_height = state.daemon.info.height
    }

    if (config_daemon.type === "local") {
        return state.daemon.info.is_ready && state.wallet.info.height >= target_height - 1
    } else if (config_daemon.type === "local_remote") {
        return state.daemon.info.height_without_bootstrap >= target_height && state.wallet.info.height >= target_height - 1
    } else {
        return state.wallet.info.height >= target_height - 1
    }
    return false
}
