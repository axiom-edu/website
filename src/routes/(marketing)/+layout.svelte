<script lang="ts">
  import "../../app.css"
  import { onMount } from "svelte"
  import { fade, fly } from "svelte/transition"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()
  let mobileNavOpen = $state(false)

  const toggleMobileNav = () => {
    mobileNavOpen = !mobileNavOpen
    // Prevent body scroll when nav is open
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  const closeMobileNav = () => {
    mobileNavOpen = false
    document.body.style.overflow = ""
  }

  // Helper function to get a cookie value by name
  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    return match ? match[2] : null
  }

  // Helper function to get URL parameter
  const getUrlParam = (name: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(name)
  }

  // Function to collect Meta tracking data
  const collectMetaTrackingData = async (): Promise<string | null> => {
    try {
      // Collect tracking data
      const trackingData: {
        ip?: string
        fbc?: string
        fbp?: string
        ua?: string
      } = {}

      // Get IP address from ipify.org
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json")
        const ipData = await ipResponse.json()
        trackingData.ip = ipData.ip
      } catch (e) {
        console.warn("Could not fetch IP address:", e)
      }

      // Get Meta Click ID (_fbc cookie or fbclid URL parameter)
      const fbcCookie = getCookie("_fbc")
      const fbclid = getUrlParam("fbclid")
      if (fbcCookie) {
        trackingData.fbc = fbcCookie
      } else if (fbclid) {
        // Generate fbc format: fb.1.<timestamp>.<fbclid>
        const timestamp = Date.now()
        trackingData.fbc = `fb.1.${timestamp}.${fbclid}`
      }

      // Get Meta Browser ID (_fbp cookie)
      const fbpCookie = getCookie("_fbp")
      if (fbpCookie) {
        trackingData.fbp = fbpCookie
      }

      // Get User Agent
      trackingData.ua = navigator.userAgent

      // Only return if we have any tracking data
      if (Object.keys(trackingData).length > 0) {
        // Encode to Base64
        const jsonString = JSON.stringify(trackingData)
        return btoa(jsonString)
      }
      return null
    } catch (e) {
      console.warn("Meta tracking data collection error:", e)
      return null
    }
  }

  // Apply tracking data to all Fillout buttons
  const applyTrackingToButtons = (base64Data: string) => {
    const filloutButtons = document.querySelectorAll("[data-fillout-id]")
    filloutButtons.forEach((button) => {
      button.setAttribute("data-data", base64Data)
    })
  }

  // Load the Fillout embed script
  const loadFilloutScript = () => {
    if (
      !document.querySelector(
        'script[src="https://server.fillout.com/embed/v1/"]',
      )
    ) {
      const filloutScript = document.createElement("script")
      filloutScript.src = "https://server.fillout.com/embed/v1/"
      filloutScript.async = true
      document.body.appendChild(filloutScript)
    }
  }

  onMount(() => {
    // Step 1: Collect tracking data first
    // Step 2: Apply to buttons
    // Step 3: THEN load Fillout script
    collectMetaTrackingData().then((trackingData) => {
      if (trackingData) {
        applyTrackingToButtons(trackingData)
      }
      // Load Fillout script AFTER tracking data is applied
      loadFilloutScript()

      // Watch for new Fillout buttons added to the DOM
      const observer = new MutationObserver((mutations) => {
        // Check if any new fillout buttons were added
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof Element) {
              const newButtons = node.querySelectorAll
                ? node.querySelectorAll("[data-fillout-id]:not([data-data])")
                : []
              if (
                node.matches?.("[data-fillout-id]:not([data-data])") ||
                newButtons.length > 0
              ) {
                // Apply tracking data to new buttons
                if (trackingData) {
                  applyTrackingToButtons(trackingData)
                }
                // Re-initialize Fillout for new buttons by removing initialized flag
                const uninitializedButtons = document.querySelectorAll(
                  "[data-fillout-id]:not([data-fillout-initialized])",
                )
                if (uninitializedButtons.length > 0) {
                  // Trigger Fillout re-scan by re-adding script
                  const existingScript = document.querySelector(
                    'script[src="https://server.fillout.com/embed/v1/"]',
                  )
                  if (existingScript) {
                    existingScript.remove()
                  }
                  loadFilloutScript()
                }
                break
              }
            }
          }
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    })

    return () => {
      document.body.style.overflow = ""
    }
  })
</script>

<div
  class="min-h-screen bg-base-100 bg-[radial-gradient(ellipse_50%_50%_at_50%_30%,#ddd6fe,transparent)]"
>
  <div
    class="navbar container mx-auto py-4 bg-transparent text-base-content relative z-50"
  >
    <div class="navbar-start">
      <!-- Mobile hamburger button -->
      <button
        class="btn btn-ghost btn-circle lg:hidden hover:bg-primary/10 z-50"
        onclick={toggleMobileNav}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
      >
        <div class="w-5 h-5 flex flex-col justify-center items-center relative">
          <span
            class="block w-5 h-0.5 bg-current transition-all duration-300 absolute {mobileNavOpen
              ? 'rotate-45'
              : '-translate-y-1.5'}"
          ></span>
          <span
            class="block w-5 h-0.5 bg-current transition-all duration-300 {mobileNavOpen
              ? 'opacity-0'
              : 'opacity-100'}"
          ></span>
          <span
            class="block w-5 h-0.5 bg-current transition-all duration-300 absolute {mobileNavOpen
              ? '-rotate-45'
              : 'translate-y-1.5'}"
          ></span>
        </div>
      </button>
      <a
        href="/"
        class="btn btn-ghost normal-case text-2xl font-bold flex items-center gap-2"
      >
        <img
          src="/images/axiom_logo_long.svg"
          alt="Axiom Logo"
          class="w-40 h-6"
        />
      </a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul
        class="menu menu-horizontal px-1 font-medium text-base text-base-content/80"
      >
        <li><a href="/#about">Why Axiom</a></li>
        <li><a href="/#programs">Programs</a></li>
        <li><a href="/our-tutors">Our Tutors</a></li>
      </ul>
    </div>
    <div class="navbar-end gap-2">
      <!-- <a href="/login" class="btn btn-ghost font-bold">Login</a> -->
      <!-- <a
        href="/signup"
        class="btn btn-primary rounded-full px-6 font-bold text-white shadow-lg shadow-primary/30"
        >Get Started</a
      > -->
      <button
        class="btn btn-primary rounded-full px-6 font-bold text-white shadow-lg shadow-primary/30"
        data-fillout-id="jjPvoJu6Ebus"
        data-fillout-embed-type="popup"
        data-fillout-dynamic-resize
        data-fillout-inherit-parameters
        data-fillout-popup-size="medium">Get Started</button
      >
    </div>
  </div>

  <!-- Full-screen mobile navigation overlay -->
  {#if mobileNavOpen}
    <div
      class="fixed inset-0 z-40 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      transition:fade={{ duration: 200 }}
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-base-100 via-base-100 to-primary/5 backdrop-blur-sm"
        onclick={closeMobileNav}
        onkeydown={(e) => e.key === "Escape" && closeMobileNav()}
        role="button"
        tabindex="-1"
        aria-label="Close navigation"
      ></div>

      <!-- Navigation content -->
      <nav
        class="relative h-full flex flex-col items-center justify-center px-8"
        in:fly={{ y: 20, duration: 300, delay: 100 }}
        out:fly={{ y: 20, duration: 200 }}
      >
        <ul class="flex flex-col items-center gap-2 text-center">
          <li>
            <a
              href="/#about"
              onclick={closeMobileNav}
              class="group flex flex-col items-center gap-3 py-6 px-8 rounded-2xl transition-all hover:bg-primary/5"
            >
              <span
                class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all"
              >
                <i class="fa-solid fa-question text-primary text-xl"></i>
              </span>
              <span
                class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors"
                >Why Axiom</span
              >
            </a>
          </li>
          <li>
            <a
              href="/#programs"
              onclick={closeMobileNav}
              class="group flex flex-col items-center gap-3 py-6 px-8 rounded-2xl transition-all hover:bg-primary/5"
            >
              <span
                class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all"
              >
                <i class="fa-solid fa-graduation-cap text-primary text-xl"></i>
              </span>
              <span
                class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors"
                >Programs</span
              >
            </a>
          </li>
          <li>
            <a
              href="/our-tutors"
              onclick={closeMobileNav}
              class="group flex flex-col items-center gap-3 py-6 px-8 rounded-2xl transition-all hover:bg-primary/5"
            >
              <span
                class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all"
              >
                <i class="fa-solid fa-users text-primary text-xl"></i>
              </span>
              <span
                class="text-2xl font-bold text-base-content group-hover:text-primary transition-colors"
                >Our Tutors</span
              >
            </a>
          </li>
        </ul>

        <!-- CTA at bottom removed -->
      </nav>
    </div>
  {/if}

  <main>
    {@render children?.()}
  </main>
</div>
