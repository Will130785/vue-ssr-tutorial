import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

// Export a factory function for creating fresh app, router and store instances
export function createApp () {
  // Create router and store instances
  const router = createRouter()
  const store = createStore()
  // Sync so route state is available as part of the store
  sync(store, router)
  // Create the app instance, injecting both the router and the store
  const app = new Vue({
    // The root instance simply renders the App component
    router,
    store,
    render: h => h(App)
  })
  // expose the app, the router and the store
  return {
    app,
    router,
    store
  }
}
