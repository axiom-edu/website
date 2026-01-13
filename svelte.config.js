import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    // allow up to 150kb of style to be inlined with the HTML
    // Faster FCP (First Contentful Paint) by reducing the number of requests
    inlineStyleThreshold: 150000,
    prerender: {
      // Ignore missing IDs on blog pages (blog not yet implemented)
      handleMissingId: "warn",
      // Warn instead of fail on HTTP errors during prerender
      handleHttpError: ({ path, message }) => {
        // Ignore blog-related errors since blog isn't implemented yet
        if (path.startsWith("/blog")) {
          console.warn(`Ignoring prerender error for ${path}: ${message}`)
          return
        }
        throw new Error(message)
      },
    },
  },
  preprocess: vitePreprocess(),
}

export default config
