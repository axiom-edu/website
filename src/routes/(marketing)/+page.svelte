<script lang="ts">
  import Hero3D from "$lib/components/Hero3D.svelte"
  import { onMount } from "svelte"

  let carouselElement: HTMLElement | null = null
  let currentPage = 0
  let totalPages = 1
  let showVideoPopup = false
  let showComingSoonPopup = false

  const openComingSoonPopup = () => {
    showComingSoonPopup = true
  }

  const closeComingSoonPopup = () => {
    showComingSoonPopup = false
  }

  const openVideoPopup = () => {
    showVideoPopup = true
  }

  const closeVideoPopup = () => {
    showVideoPopup = false
  }

  const scrollToPage = (pageIndex: number) => {
    if (!carouselElement) return
    const cards = carouselElement.querySelectorAll(".course-card")
    if (cards.length === 0) return

    const cardWidth = (cards[0] as HTMLElement).offsetWidth
    const gap = 24 // gap-6 = 1.5rem = 24px
    const cardsPerView = Math.max(
      1,
      Math.round(carouselElement.offsetWidth / (cardWidth + gap)),
    )
    const scrollTo = pageIndex * (cardWidth + gap) * cardsPerView

    carouselElement.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    })
  }

  const updateActiveDot = () => {
    if (!carouselElement) return
    const cards = carouselElement.querySelectorAll(".course-card")
    if (cards.length === 0) return

    const scrollLeft = carouselElement.scrollLeft
    const cardWidth = (cards[0] as HTMLElement).offsetWidth
    const gap = 24
    const cardsPerView = Math.max(
      1,
      Math.round(carouselElement.offsetWidth / (cardWidth + gap)),
    )
    const totalCardsCount = cards.length
    totalPages = Math.ceil(totalCardsCount / cardsPerView)

    const scrollPerPage = (cardWidth + gap) * cardsPerView
    currentPage = Math.min(
      Math.round(scrollLeft / scrollPerPage),
      totalPages - 1,
    )
  }

  onMount(() => {
    carouselElement = document.getElementById("coursesCarousel")
    if (carouselElement) {
      carouselElement.addEventListener("scroll", updateActiveDot)
      updateActiveDot()
    }

    // Recalculate on window resize (as cards per view may change)
    const handleResize = () => updateActiveDot()
    window.addEventListener("resize", handleResize)

    // Load Fillout script dynamically after DOM is ready
    const filloutScript = document.createElement("script")
    filloutScript.src = "https://server.fillout.com/embed/v1/"
    filloutScript.async = true
    document.body.appendChild(filloutScript)

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", updateActiveDot)
      }
      window.removeEventListener("resize", handleResize)
    }
  })
</script>

<svelte:head>
  <title>Axiom Education</title>
</svelte:head>

<div class="min-h-screen font-sans text-base-content relative overflow-hidden">
  <!-- HERO SECTION -->
  <section class="relative pt-20 pb-32 px-4 sm:px-4 mobile-padding text-center">
    <!-- 3D Background -->
    <Hero3D />

    <div class="relative z-10 max-w-4xl mx-auto mt-10">
      <h1
        class="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-base-content"
      >
        Small Enough to Care, Skilled Enough to Deliver
      </h1>
      <p
        class="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Tutoring that is personalised, constructive and fruitful. We aim to meet
        you where you are, and help you get to where you want to be.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          class="btn btn-primary rounded-full px-8 py-3 h-auto text-lg font-bold shadow-xl shadow-primary/40 capitalize"
          data-fillout-id="jjPvoJu6Ebus"
          data-fillout-embed-type="popup"
          data-fillout-dynamic-resize
          data-fillout-inherit-parameters
          data-fillout-popup-size="medium"
        >
          Book Free Trial
        </button>
        <button
          class="btn btn-ghost rounded-full px-8 py-3 h-auto text-lg font-bold flex items-center gap-3"
          on:click={openVideoPopup}
        >
          <span
            class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 ml-1"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          Play Video
        </button>
      </div>

      <div
        class="hero-checkboxes mt-12 flex justify-center gap-8 text-xs font-semibold text-base-content/70 mx-auto"
      >
        <span class="flex items-center gap-1"
          ><span
            class="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px]"
            >✓</span
          > 1:1 or 3-5 Students</span
        >
        <span class="flex items-center gap-1"
          ><span
            class="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px]"
            >✓</span
          > Pedagogy First</span
        >
        <span class="flex items-center gap-1"
          ><span
            class="w-4 h-4 bg-primary/20 text-primary rounded-full flex items-center justify-center text-[10px]"
            >✓</span
          > Custom Resources</span
        >
      </div>

      <div class="mt-20">
        <div
          class="w-16 h-16 border border-dashed border-base-content/30 rounded-full mx-auto flex items-center justify-center animate-spin-slow"
          style="animation-duration: 10s;"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-base-content/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        <p
          class="text-[10px] uppercase tracking-widest mt-2 text-base-content/40 font-bold"
        >
          Scroll to discover
        </p>
      </div>
    </div>
  </section>

  <!-- ABOUT SECTION -->
  <section
    id="about"
    class="pt-10 md:pt-20 pb-20 px-4 sm:px-4 mobile-padding container mx-auto"
  >
    <div class="flex flex-col lg:flex-row gap-12">
      <div class="lg:w-1/3">
        <span class="text-primary font-bold text-sm uppercase tracking-wide"
          >About Us</span
        >
        <h2 class="text-4xl font-extrabold mt-2 mb-6">Why Choose Axiom</h2>
        <p class="text-gray-500 text-sm leading-relaxed mb-8">
          Tutoring mainly comprises of two things: teaching and resources. Large
          companies can make teaching less personalised due to large groups, but
          offer great resources for students who are already ahead. Small
          private tutors will be able to tailor to individual needs, but often
          don't have the means to create custom high-quality resources
          themselves.
          <br />
          <br />
          At Axiom, we are able to provide both personalised teaching
          <em>and</em> the best resources possible, with a network of high-achieving
          tutors constantly collaborating to create the best resources for every student's
          VCE success.
        </p>
        <ul class="space-y-4">
          <li
            class="flex items-start gap-3 text-xs font-bold text-base-content/80"
          >
            <span class="mt-0.5 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span
              >Providing personalised learning focusing on one-to-one classes or
              small groups with at most 5 students.</span
            >
          </li>
          <li
            class="flex items-start gap-3 text-xs font-bold text-base-content/80"
          >
            <span class="mt-0.5 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span
              >Rejecting the 'one-size-fits-all' model and crafting learning
              material that tailors to a gradient of skill levels.</span
            >
          </li>
          <li
            class="flex items-start gap-3 text-xs font-bold text-base-content/80"
          >
            <span class="mt-0.5 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span
              >Offering a learning approach that doesn't just present, but
              inspires.</span
            >
          </li>
        </ul>
      </div>

      <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Card 1 - Your Needs (Purple) -->
        <div class="feature-card feature-card--purple">
          <span class="feature-card__badge feature-card__badge--purple"
            >Built Around Your Needs</span
          >
          <p class="feature-card__text">
            One-to-one classes or small groups of at most 5 students. We tailor
            our teaching to your individual learning style and target your
            specific gaps, not a generic curriculum. Every lesson is designed
            around where you are and where you need to be, ensuring no time is
            wasted on concepts you've already mastered.
          </p>
          <span class="feature-card__icon feature-card__icon--purple"
            ><i class="fa-solid fa-clipboard-user"></i></span
          >
        </div>
        <!-- Card 2 - Resources (Gray Cyan) -->
        <div class="feature-card feature-card--graycyan feature-card--stagger">
          <span class="feature-card__badge feature-card__badge--graycyan"
            >Amazing Resources</span
          >
          <p class="feature-card__text">
            Our network of high-achieving tutors constantly collaborates to
            create custom, high-quality resources for every subject. From
            comprehensive study guides to practice exams, you get the best of
            both worlds: personalised teaching and top-tier materials that large
            tutoring companies simply don't match.
          </p>
          <span class="feature-card__icon feature-card__icon--graycyan"
            ><i class="fa-solid fa-book-open"></i></span
          >
        </div>
        <!-- Card 3 - Pedagogy (Orange) -->
        <div class="feature-card feature-card--orange">
          <span class="feature-card__badge feature-card__badge--orange"
            >Pedagogy First</span
          >
          <p class="feature-card__text">
            As a group of closely-knit, experienced and professional tutors, we
            aim to construct a pedagogy-first environment. Our tutors aren't
            just high ATAR-achievers—they are compassionate mentors with real
            teaching skills who know how to explain complex concepts in ways
            that click. We focus on building genuine understanding, not just
            rote memorisation.
          </p>
          <span class="feature-card__icon feature-card__icon--orange"
            ><i class="fa-solid fa-chalkboard-user"></i></span
          >
        </div>
        <!-- Card 4 - Affordable and Accessible (Red) -->
        <div class="feature-card feature-card--red feature-card--stagger">
          <span class="feature-card__badge feature-card__badge--red"
            >Affordable and Accessible</span
          >
          <p class="feature-card__text">
            Quality tutoring shouldn't break the bank. At $65/hour for
            one-on-one and $40/hour for group classes, we offer competitive
            pricing without compromising on the personalised attention and
            resources you deserve. We also offer flexible scheduling and online
            options, letting us meet you where you're at.
          </p>
          <span class="feature-card__icon feature-card__icon--red"
            ><i class="fa-solid fa-hand-holding-dollar"></i></span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <!-- <section class="py-12 container mx-auto">
    <div
      class="flex flex-wrap justify-between items-center max-w-4xl mx-auto px-4 text-center"
    >
      <div>
        <h3 class="text-3xl font-bold">+22K</h3>
        <p class="text-xs text-gray-500 mt-1">Students Use Our Platform</p>
      </div>
      <div>
        <h3 class="text-3xl font-bold">+950</h3>
        <p class="text-xs text-gray-500 mt-1">Course In Fiction Platform</p>
      </div>
      <div>
        <h3 class="text-3xl font-bold">+15K</h3>
        <p class="text-xs text-gray-500 mt-1">Recently Issued Certificate</p>
      </div>
    </div>
  </section> -->

  <!-- LOGOS -->
  <!-- <section class="py-12 px-4 container mx-auto text-center">
    <p
      class="text-primary text-[10px] font-bold tracking-widest uppercase mb-4"
    >
      Get To Know Our Partners
    </p>
    <h3 class="text-lg font-bold mb-10 max-w-lg mx-auto">
      We have many distinguished companies that help us provide the best we have
    </h3>

    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 opacity-40 grayscale"
    >
      {#each Array(10) as _, i}
        <div
          class="h-12 border rounded-lg flex items-center justify-center font-bold text-xl tracking-tighter"
        >
          <span class="mr-1">🍃</span>LOGO
        </div>
      {/each}
    </div>
  </section> -->

  <!-- COURSES -->
  <section
    id="programs"
    class="courses-section py-20 px-4 sm:px-4 mobile-padding"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12">
        <span class="text-primary font-bold text-sm uppercase tracking-wide"
          >Our Programs</span
        >
        <h2 class="text-3xl font-extrabold mt-2">
          Curricula that are designed around you.
        </h2>
      </div>

      <!-- Scrollable Course Cards Container -->
      <div class="courses-carousel-wrapper">
        <div class="courses-carousel" id="coursesCarousel">
          <!-- Card 1 - Maths Methods (Purple) -->
          <div class="course-card course-card--purple">
            <div class="course-card__header">
              <span class="course-card__icon course-card__icon--purple">
                <i class="fa-solid fa-square-root-variable"></i>
              </span>
              <h4 class="course-card__title">Maths Methods</h4>
            </div>
            <div class="course-card__levels">
              <span class="course-card__pill course-card__pill--purple"
                >Year 10</span
              >
              <span class="course-card__pill course-card__pill--purple"
                >Units 1/2</span
              >
              <span class="course-card__pill course-card__pill--purple"
                >Units 3/4</span
              >
            </div>
            <p class="course-card__text">
              Diagnostic-led tutoring that targets your specific gaps.
            </p>
            <button
              on:click={openComingSoonPopup}
              class="course-card__btn course-card__btn--purple"
            >
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 2 - Specialist Maths (Violet) -->
          <div class="course-card course-card--violet">
            <div class="course-card__header">
              <span class="course-card__icon course-card__icon--violet">
                <i class="fa-solid fa-infinity"></i>
              </span>
              <h4 class="course-card__title">Specialist Maths</h4>
            </div>
            <div class="course-card__levels">
              <span class="course-card__pill course-card__pill--violet"
                >Units 1/2</span
              >
              <span class="course-card__pill course-card__pill--violet"
                >Units 3/4</span
              >
            </div>
            <p class="course-card__text">
              Small groups with tailored resources matched to your level.
            </p>
            <button
              on:click={openComingSoonPopup}
              class="course-card__btn course-card__btn--violet"
            >
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 3 - Accounting (Teal) -->
          <div class="course-card course-card--teal">
            <div class="course-card__header">
              <span class="course-card__icon course-card__icon--teal">
                <i class="fa-solid fa-calculator"></i>
              </span>
              <h4 class="course-card__title">Accounting</h4>
            </div>
            <div class="course-card__levels">
              <span class="course-card__pill course-card__pill--teal"
                >Units 3/4</span
              >
            </div>
            <p class="course-card__text">
              Where debits and credits finally make sense.
            </p>
            <button
              on:click={openComingSoonPopup}
              class="course-card__btn course-card__btn--teal"
            >
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 4 - Software Development (Green) -->
          <div class="course-card course-card--green">
            <div class="course-card__header">
              <span class="course-card__icon course-card__icon--green">
                <i class="fa-solid fa-code"></i>
              </span>
              <h4 class="course-card__title">Software Dev</h4>
            </div>
            <div class="course-card__levels">
              <span class="course-card__pill course-card__pill--green"
                >Units 3/4</span
              >
            </div>
            <p class="course-card__text">
              Taught by tutors who actually know how to teach, not just code.
            </p>
            <button
              on:click={openComingSoonPopup}
              class="course-card__btn course-card__btn--green"
            >
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 5 - Literature (Blue) -->
          <div class="course-card course-card--blue">
            <div class="course-card__header">
              <span class="course-card__icon course-card__icon--blue">
                <i class="fa-solid fa-book"></i>
              </span>
              <h4 class="course-card__title">Literature</h4>
            </div>
            <div class="course-card__levels">
              <span class="course-card__pill course-card__pill--blue"
                >Units 1/2</span
              >
              <span class="course-card__pill course-card__pill--blue"
                >Units 3/4</span
              >
            </div>
            <p class="course-card__text">
              Lessons crafted to feel intuitive and spark a love for reading.
            </p>
            <button
              on:click={openComingSoonPopup}
              class="course-card__btn course-card__btn--blue"
            >
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <!-- Card 6 - Psychology (Orange) -->
          <div class="course-card course-card--orange">
            <div class="course-card__header">
              <span class="course-card__icon course-card__icon--orange">
                <i class="fa-solid fa-brain"></i>
              </span>
              <h4 class="course-card__title">Psychology</h4>
            </div>
            <div class="course-card__levels">
              <span class="course-card__pill course-card__pill--orange"
                >Units 1/2</span
              >
              <span class="course-card__pill course-card__pill--orange"
                >Units 3/4</span
              >
            </div>
            <p class="course-card__text">
              Quality teaching and custom resources - we do both.
            </p>
            <button
              on:click={openComingSoonPopup}
              class="course-card__btn course-card__btn--orange"
            >
              Learn More <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination Dots -->
      <div class="flex justify-center mt-10 gap-2 items-center">
        {#each Array(totalPages) as _, i}
          <button
            class="pagination-dot {currentPage === i
              ? 'pagination-dot--active'
              : ''}"
            on:click={() => scrollToPage(i)}
            aria-label="Page {i + 1}"
          ></button>
        {/each}
      </div>
    </div>
  </section>

  <!-- STUDENT VOICE & FOOTER -->
  <!-- Creating a custom footer here to match design structure -->
  <section
    id="trial"
    class="py-10 px-4 sm:px-4 mobile-padding container mx-auto text-center relative"
  >
    <!-- <span class="text-primary font-bold text-sm uppercase tracking-wide"
      >Our Student Voice</span
    >
    <h2 class="text-3xl font-extrabold mt-2 mb-16">
      Get To Know The Opinions Of Our Students <br /> Through Their Experience With
      Us
    </h2> -->

    <!-- Avatar Circle -->
    <!-- <div class="relative w-[300px] h-[300px] mx-auto mb-20 hidden md:block">
      <div class="absolute inset-0 flex items-center justify-center z-10">
        <p class="text-xs font-bold max-w-[200px] italic">
          "Although I Was Scared At First, The Result Was Great And I Was Very
          Happy With My Study Experience"
        </p>
      </div>

      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-blue-200 rounded-full bg-cover"
        style="background-image: url('https://i.pravatar.cc/100?img=1');"
      ></div>
      <div
        class="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-green-200 rounded-full bg-cover"
        style="background-image: url('https://i.pravatar.cc/100?img=5');"
      ></div>
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-200 rounded-full bg-cover"
        style="background-image: url('https://i.pravatar.cc/100?img=9');"
      ></div>
      <div
        class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-200 rounded-full bg-cover"
        style="background-image: url('https://i.pravatar.cc/100?img=12');"
      ></div>

      <div
        class="absolute top-[15%] left-[15%] w-8 h-8 bg-purple-200 rounded-full bg-cover"
        style="background-image: url('https://i.pravatar.cc/100?img=20');"
      ></div>
      <div
        class="absolute top-[15%] right-[15%] w-8 h-8 bg-pink-200 rounded-full bg-cover"
        style="background-image: url('https://i.pravatar.cc/100?img=32');"
      ></div>
    </div> -->

    <!-- <div class="md:hidden mb-10">
      <p class="text-xs font-bold italic mb-4">
        "Although I Was Scared At First, The Result Was Great And I Was Very
        Happy With My Study Experience"
      </p>
      <div class="flex justify-center gap-2">
        {#each Array(5) as _, i}
          <div
            class="w-8 h-8 bg-gray-200 rounded-full bg-cover"
            style="background-image: url('https://i.pravatar.cc/100?img={i +
              10}');"
          ></div>
        {/each}
      </div>
    </div> -->

    <!-- <div class="text-center mb-20">
      <h4 class="font-bold">Jason H.</h4>
      <span class="text-xs text-gray-500">The Student</span>
    </div> -->

    <!-- Purple Footer Box -->
    <div
      class="bg-primary rounded-3xl p-8 md:p-16 text-white text-left relative overflow-hidden"
    >
      <!-- Decorative Circles -->
      <div
        class="absolute -left-10 -bottom-10 w-40 h-40 border border-white/20 rounded-full"
      ></div>
      <div
        class="absolute right-10 top-10 w-10 h-10 bg-white/10 rounded-full"
      ></div>

      <div
        class="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10"
      >
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-2">
            Register for a Free Trial Today
          </h2>
        </div>

        <button
          class="btn bg-white text-primary hover:bg-gray-100 rounded-full px-8 py-3 font-semibold text-lg"
          data-fillout-id="jjPvoJu6Ebus"
          data-fillout-embed-type="popup"
          data-fillout-dynamic-resize
          data-fillout-inherit-parameters
          data-fillout-popup-size="medium"
        >
          Register Now
        </button>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div
      class="mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400"
    >
      <div class="flex items-center gap-2 mb-4 md:mb-0">
        <img
          src="/images/axiom_logo_medium.svg"
          alt="Axiom Logo"
          class="w-25 h-10"
        />
      </div>

      <!-- Social Media Icons -->
      <div class="flex gap-4 text-xl">
        <a
          href="https://www.instagram.com/axiomvcetutoring/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#E1306C] transition-colors"
          aria-label="Instagram"
        >
          <i class="fa-brands fa-instagram"></i>
        </a>
        <a
          href="https://www.linkedin.com/company/axiomeducation"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#0077b5] transition-colors"
          aria-label="LinkedIn"
        >
          <i class="fa-brands fa-linkedin"></i>
        </a>
        <a
          href="https://www.facebook.com/people/Axiom-Education/61578398888240/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#1877F2] transition-colors"
          aria-label="Facebook"
        >
          <i class="fa-brands fa-facebook"></i>
        </a>
        <a
          href="https://www.youtube.com/@axiom-education"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[#FF0000] transition-colors"
          aria-label="YouTube"
        >
          <i class="fa-brands fa-youtube"></i>
        </a>
      </div>
      <div class="mt-4 md:mt-0">
        © 2026 Axiom Learning. All rights reserved.
      </div>
    </div>
  </section>
</div>

<!-- Video Popup Modal -->
{#if showVideoPopup}
  <div
    class="video-popup-overlay"
    on:click={closeVideoPopup}
    on:keydown={(e) => e.key === "Escape" && closeVideoPopup()}
    role="dialog"
    aria-modal="true"
    aria-label="Video popup"
    tabindex="-1"
  >
    <div
      class="video-popup-content"
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="document"
    >
      <button
        class="video-popup-close"
        on:click={closeVideoPopup}
        aria-label="Close video"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="video-popup-iframe-wrapper">
        <iframe
          src="https://www.youtube.com/embed/YSOn67sLFKo?autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
{/if}

<!-- Coming Soon Popup Modal -->
{#if showComingSoonPopup}
  <div
    class="coming-soon-overlay"
    on:click={closeComingSoonPopup}
    on:keydown={(e) => e.key === "Escape" && closeComingSoonPopup()}
    role="dialog"
    aria-modal="true"
    aria-label="Coming soon popup"
    tabindex="-1"
  >
    <div
      class="coming-soon-content"
      on:click|stopPropagation
      on:keydown|stopPropagation
      role="document"
    >
      <button
        class="coming-soon-close"
        on:click={closeComingSoonPopup}
        aria-label="Close popup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="coming-soon-icon">
        <i class="fa-solid fa-rocket"></i>
      </div>
      <h3 class="coming-soon-title">Coming Soon!</h3>
      <p class="coming-soon-text">
        More detailed subject pages are coming soon. In the meantime, if you
        have any questions, please email us at:
      </p>
      <a href="mailto:contact@axiomeducation.com.au" class="coming-soon-email">
        contact@axiomeducation.com.au
      </a>
      <button class="coming-soon-btn" on:click={closeComingSoonPopup}>
        Got it!
      </button>
    </div>
  </div>
{/if}

<style>
  /* Feature Card Base Styles - Matches reference design exactly */
  .feature-card {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 1.25rem;
    padding-top: 1.75rem;
    padding-bottom: 2.5rem;
    margin-top: 12px;
    transition: all 0.25s ease;
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }

  /* Staggered layout for right column cards */
  @media (min-width: 768px) {
    .feature-card--stagger {
      transform: translateY(60px);
    }

    .feature-card--stagger:hover {
      transform: translateY(56px);
    }
  }

  /* Badge Styles - Solid pill overlapping top border */
  .feature-card__badge {
    position: absolute;
    top: -12px;
    left: 20px;
    padding: 5px 14px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    z-index: 1;
  }

  /* Text Styles */
  .feature-card__text {
    font-size: 0.85rem;
    color: #4b5563;
    line-height: 1.6;
    margin: 0;
  }

  /* Icon in bottom-right corner - overlapping border */
  .feature-card__icon {
    position: absolute;
    bottom: -12px;
    right: 12px;
    width: 26px;
    height: 26px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: white;
  }

  /* Color Variants - Purple #7F52B2 */
  .feature-card--purple {
    border: 2px solid #7f52b2;
  }

  .feature-card--purple:hover {
    /* 5% purple + 95% white = #f5f0fa */
    background-color: #f5f0fa;
  }

  .feature-card__badge--purple {
    background: #7f52b2;
  }

  .feature-card__icon--purple {
    background: #7f52b2;
  }

  /* Color Variants - Gray Cyan #5AA1B9 */
  .feature-card--graycyan {
    border: 2px solid #5aa1b9;
  }

  .feature-card--graycyan:hover {
    /* 5% graycyan + 95% white = #f1f7f9 */
    background-color: #f1f7f9;
  }

  .feature-card__badge--graycyan {
    background: #5aa1b9;
  }

  .feature-card__icon--graycyan {
    background: #5aa1b9;
  }

  /* Color Variants - Orange #FD9337 */
  .feature-card--orange {
    border: 2px solid #fd9337;
  }

  .feature-card--orange:hover {
    /* 5% orange + 95% white = #fef6ef */
    background-color: #fef6ef;
  }

  .feature-card__badge--orange {
    background: #fd9337;
  }

  .feature-card__icon--orange {
    background: #fd9337;
  }

  /* Color Variants - Red #BD4242 */
  .feature-card--red {
    border: 2px solid #bd4242;
  }

  .feature-card--red:hover {
    /* 5% red + 95% white = #fbf1f1 */
    background-color: #fbf1f1;
  }

  .feature-card__badge--red {
    background: #bd4242;
  }

  .feature-card__icon--red {
    background: #bd4242;
  }
  /* Course Section Styles - No background to prevent hard outline */
  .courses-section {
    /* Transparent - inherits from parent for seamless gradient continuity */
  }

  /* Carousel Wrapper */
  .courses-carousel-wrapper {
    overflow: hidden;
    margin: 0 -1rem;
    padding: 0 1rem;
  }

  /* Scrollable Carousel */
  .courses-carousel {
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    padding: 1.5rem 0.5rem;
    padding-top: 1.75rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .courses-carousel::-webkit-scrollbar {
    display: none;
  }

  /* Course Card Base Styles - VCE Course Cards */
  .course-card {
    position: relative;
    background: white;
    border-radius: 16px;
    padding: 1.25rem;
    transition: all 0.25s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    min-height: 180px;
    min-width: 260px;
    flex: 0 0 calc(25% - 1.125rem);
    scroll-snap-align: start;
  }

  @media (max-width: 1024px) {
    .course-card {
      flex: 0 0 calc(50% - 0.75rem);
    }
  }

  @media (max-width: 640px) {
    .course-card {
      flex: 0 0 calc(100% - 0.5rem);
    }
  }

  .course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  /* Badge Styles - No longer used, kept for reference */
  .course-card__badge {
    display: none;
  }

  /* Header with Icon and Title */
  .course-card__header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  /* Icon in header */
  .course-card__icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: white;
    flex-shrink: 0;
  }

  /* Title Styles */
  .course-card__title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }

  /* Level Pills Container */
  .course-card__levels {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  /* Level Pill Styles */
  .course-card__pill {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
  }

  /* Text Styles */
  .course-card__text {
    font-size: 0.8rem;
    color: #6b7280;
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }

  /* Button Styles */
  .course-card__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.25s ease;
    margin-top: auto;
    width: fit-content;
  }

  .course-card__btn i {
    font-size: 0.7rem;
    transition: transform 0.25s ease;
  }

  .course-card__btn:hover i,
  .course-card:hover .course-card__btn i {
    transform: translateX(3px);
  }

  /* ========== Course Card Color Variants ========== */

  /* Purple #7F52B2 */
  .course-card--purple {
    border: 2px solid #7f52b2;
  }
  .course-card--purple:hover {
    background-color: #f5f0fa;
  }
  .course-card__icon--purple {
    background: #7f52b2;
  }
  .course-card__pill--purple {
    background: #7f52b2;
  }
  .course-card__btn--purple {
    background: #f5f0fa;
    color: #7f52b2;
  }
  .course-card__btn--purple:hover,
  .course-card--purple:hover .course-card__btn--purple {
    background: #7f52b2;
    color: white;
  }

  /* Teal #5AA1B9 */
  .course-card--teal {
    border: 2px solid #5aa1b9;
  }
  .course-card--teal:hover {
    background-color: #f1f7f9;
  }
  .course-card__icon--teal {
    background: #5aa1b9;
  }
  .course-card__pill--teal {
    background: #5aa1b9;
  }
  .course-card__btn--teal {
    background: #f1f7f9;
    color: #5aa1b9;
  }
  .course-card__btn--teal:hover,
  .course-card--teal:hover .course-card__btn--teal {
    background: #5aa1b9;
    color: white;
  }

  /* Green #52B256 */
  .course-card--green {
    border: 2px solid #52b256;
  }
  .course-card--green:hover {
    background-color: #f2f9f2;
  }
  .course-card__icon--green {
    background: #52b256;
  }
  .course-card__pill--green {
    background: #52b256;
  }
  .course-card__btn--green {
    background: #f2f9f2;
    color: #52b256;
  }
  .course-card__btn--green:hover,
  .course-card--green:hover .course-card__btn--green {
    background: #52b256;
    color: white;
  }

  /* Orange #FD9337 */
  .course-card--orange {
    border: 2px solid #fd9337;
  }
  .course-card--orange:hover {
    background-color: #fef6ef;
  }
  .course-card__icon--orange {
    background: #fd9337;
  }
  .course-card__pill--orange {
    background: #fd9337;
  }
  .course-card__btn--orange {
    background: #fef6ef;
    color: #fd9337;
  }
  .course-card__btn--orange:hover,
  .course-card--orange:hover .course-card__btn--orange {
    background: #fd9337;
    color: white;
  }

  /* Red #BD4242 */
  .course-card--red {
    border: 2px solid #bd4242;
  }
  .course-card--red:hover {
    background-color: #fbf1f1;
  }
  .course-card__icon--red {
    background: #bd4242;
  }
  .course-card__pill--red {
    background: #bd4242;
  }
  .course-card__btn--red {
    background: #fbf1f1;
    color: #bd4242;
  }
  .course-card__btn--red:hover {
    background: #bd4242;
    color: white;
  }

  /* Blue #4268BD */
  .course-card--blue {
    border: 2px solid #4268bd;
  }
  .course-card--blue:hover {
    background-color: #f0f3fa;
  }
  .course-card__icon--blue {
    background: #4268bd;
  }
  .course-card__pill--blue {
    background: #4268bd;
  }
  .course-card__btn--blue {
    background: #f0f3fa;
    color: #4268bd;
  }
  .course-card__btn--blue:hover,
  .course-card--blue:hover .course-card__btn--blue {
    background: #4268bd;
    color: white;
  }

  /* Violet #8B5CF6 */
  .course-card--violet {
    border: 2px solid #8b5cf6;
  }
  .course-card--violet:hover {
    background-color: #f5f3ff;
  }
  .course-card__icon--violet {
    background: #8b5cf6;
  }
  .course-card__pill--violet {
    background: #8b5cf6;
  }
  .course-card__btn--violet {
    background: #f5f3ff;
    color: #8b5cf6;
  }
  .course-card__btn--violet:hover,
  .course-card--violet:hover .course-card__btn--violet {
    background: #8b5cf6;
    color: white;
  }

  /* Cyan #06B6D4 */
  .course-card--cyan {
    border: 2px solid #06b6d4;
  }
  .course-card--cyan:hover {
    background-color: #ecfeff;
  }
  .course-card__icon--cyan {
    background: #06b6d4;
  }
  .course-card__pill--cyan {
    background: #06b6d4;
  }
  .course-card__btn--cyan {
    background: #ecfeff;
    color: #06b6d4;
  }
  .course-card__btn--cyan:hover {
    background: #06b6d4;
    color: white;
  }

  /* Pagination Dots */
  .pagination-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #d1d5db;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pagination-dot--active {
    width: 32px;
    background: #7c3aed;
  }

  .pagination-dot:hover:not(.pagination-dot--active) {
    background: #9ca3af;
  }

  /* Video Popup Styles */
  .video-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .video-popup-content {
    position: relative;
    width: 100%;
    max-width: 900px;
    animation: scaleIn 0.25s ease;
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .video-popup-close {
    position: absolute;
    top: -48px;
    right: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .video-popup-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .video-popup-iframe-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  .video-popup-iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Coming Soon Popup Styles */
  .coming-soon-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }

  .coming-soon-content {
    position: relative;
    background: white;
    border-radius: 20px;
    padding: 2.5rem;
    max-width: 420px;
    width: 100%;
    text-align: center;
    animation: scaleIn 0.25s ease;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
  }

  .coming-soon-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: #f3f4f6;
    border: none;
    color: #6b7280;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .coming-soon-close:hover {
    background: #e5e7eb;
    color: #374151;
  }

  .coming-soon-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #8078b8, #99d5cb);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-size: 1.75rem;
    color: white;
  }

  .coming-soon-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 1rem;
  }

  .coming-soon-text {
    font-size: 0.95rem;
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 1rem;
  }

  .coming-soon-email {
    display: inline-block;
    font-size: 1rem;
    font-weight: 600;
    color: #8078b8;
    text-decoration: none;
    margin-bottom: 1.5rem;
    transition: color 0.2s ease;
  }

  .coming-soon-email:hover {
    color: #6b5fa0;
    text-decoration: underline;
  }

  .coming-soon-btn {
    display: block;
    width: 100%;
    padding: 0.875rem 1.5rem;
    background: linear-gradient(135deg, #8078b8, #6b5fa0);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .coming-soon-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(128, 120, 184, 0.4);
  }
</style>
