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

  onMount(() => {
    // Load Fillout script dynamically for navbar button
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
