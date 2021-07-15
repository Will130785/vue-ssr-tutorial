import { createApp } from './app'

// Client specific bootstrapping logic
const { app, store } = createApp()

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__)
}

// Force hydration
app.$mount('#app', true)
