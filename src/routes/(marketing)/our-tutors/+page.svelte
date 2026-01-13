<script lang="ts">
  import { goto } from "$app/navigation"

  const tutors = [
    {
      slug: "garv",
      name: "Garv Shah",
      atar: "99.50",
      subjects: ["Methods", "Specialist", "Software Dev"],
      image: "/images/people/garv.jpg",
    },
    {
      slug: "eric",
      name: "Eric Lai",
      atar: "99.30",
      subjects: ["Methods", "Specialist", "Media"],
      image: "/images/people/eric.jpg",
    },
    {
      slug: "helen",
      name: "Helen Yang",
      atar: "99.45",
      subjects: ["Accounting", "English Lang"],
      image: "/images/people/helen.jpg",
    },
    {
      slug: "ava",
      name: "Ava Goldenberg",
      atar: "98.00",
      subjects: ["Psychology", "Literature"],
      image: "/images/people/ava.jpg",
    },
  ]
</script>

<svelte:head>
  <title>Our Tutors | Axiom Education</title>
  <meta
    name="description"
    content="All of our tutors are recent 2024 graduates with ATARs of 98.00+ and study scores of 40+. When combined with their fresh knowledge of the latest study designs, they are highly qualified to boost your VCE success."
  />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-6xl">
  <!-- Header Section -->
  <div class="text-center mb-12">
    <h1 class="text-4xl md:text-5xl font-bold text-base-content mb-6">
      Our Tutors
    </h1>
    <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
      All of our tutors are recent 2024 graduates with ATARs of 98.00+ and study
      scores of 40+. When combined with their fresh knowledge of the latest
      study designs, they are highly qualified to boost your VCE success.
    </p>
  </div>

  <!-- Tutors Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each tutors as tutor}
      <button
        class="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer text-left"
        onclick={() => goto(`/our-tutors/${tutor.slug}`)}
      >
        <figure class="px-6 pt-6">
          <div class="avatar">
            <div
              class="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img src={tutor.image} alt={`${tutor.name} profile`} />
            </div>
          </div>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title text-xl font-bold">{tutor.name}</h2>
          <div class="badge badge-success text-white font-semibold">
            {tutor.atar} ATAR
          </div>
          <div class="flex flex-wrap justify-center gap-1 mt-2">
            {#each tutor.subjects as subject}
              <span class="badge badge-outline badge-sm">{subject}</span>
            {/each}
          </div>
          <div class="card-actions mt-4">
            <span class="text-primary font-medium text-sm">View Profile →</span>
          </div>
        </div>
      </button>
    {/each}
  </div>

  <!-- Back to Home -->
  <div class="text-center mt-12">
    <a href="/" class="btn btn-ghost">← Back to Home</a>
  </div>
</div>
