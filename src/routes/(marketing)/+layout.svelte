<script lang="ts">
  import "../../app.css"
  import { onMount } from "svelte"

  interface Props {
    children?: import("svelte").Snippet
  }

  let { children }: Props = $props()

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
  })
</script>

<div
  class="min-h-screen bg-base-100 bg-[radial-gradient(ellipse_50%_50%_at_50%_30%,#ddd6fe,transparent)]"
>
  <div class="navbar container mx-auto py-4 bg-transparent text-base-content">
    <div class="navbar-start">
      <div class="dropdown lg:hidden">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            /></svg
          >
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a href="/#about">Why Axiom</a></li>
          <li><a href="/#programs">Programs</a></li>
          <li><a href="/our-tutors">Our Tutors</a></li>
        </ul>
      </div>
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

  <main>
    {@render children?.()}
  </main>
</div>
