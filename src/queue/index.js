const eventBus = {
  observers: [],
  listen(event, callback) {
    this.observers.push({
      event,
      callback,
    })
  },
  notify(event, payload) {
    this.observers
      .filter(obs => obs.event === event)
      .forEach(({callback}) => {
        callback(payload)
      })
  },
}

export default {
  install(Vue) {
    Vue.prototype.$listen = (event, callback) => {
      eventBus.listen(event, callback)
    }
    Vue.prototype.$notify = (event, callback) => {
      eventBus.listen(event, callback)
    }
  },
  eventBus,
}
