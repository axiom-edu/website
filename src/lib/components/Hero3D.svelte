<script lang="ts">
  import { onMount } from "svelte"
  import * as THREE from "three"

  let container: HTMLDivElement
  let canvas: HTMLCanvasElement

  // Reactive dimensions that update on resize
  let currentWidth = 1
  let currentHeight = 1

  // Track whether the scene is ready for animation
  let isSceneReady = false

  onMount(() => {
    const scene = new THREE.Scene()

    // Animation entrance state
    let entranceStartTime: number | null = null
    const ENTRANCE_DURATION = 1.2 // seconds for full entrance animation
    const STAGGER_DELAY = 0.08 // seconds between each shape starting

    // Helper to get CSS variable color
    const getCssColor = (name: string) => {
      const style = getComputedStyle(document.documentElement)
      return style.getPropertyValue(name).trim()
    }

    // Get initial dimensions from container
    currentWidth = container.clientWidth
    currentHeight = container.clientHeight

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, // Narrower FOV for less distortion
      currentWidth / currentHeight,
      0.1,
      1000,
    )
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(currentWidth, currentHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4 // Slightly bright for high-key look

    // === SCENE ENVIRONMENT ===
    // === SCENE ENVIRONMENT ===
    // Fog helps distant objects blend softly into the background
    const fogColor = new THREE.Color(getCssColor("--color-3d-fog") || 0xf0f0f5)
    scene.fog = new THREE.Fog(fogColor, 10, 50)

    // === LIGHTING SETUP ===
    // Goal: Bright, airy, pastel look with white highlights and purple-tinted shadows

    // Ambient Light - Strong purple to color the shadows
    // Ambient Light - Strong purple to color the shadows
    // This is the key to getting purple shadows instead of grey/black
    const ambientColor = new THREE.Color(
      getCssColor("--color-3d-ambient") || 0xb0a4e3,
    )
    const ambientLight = new THREE.AmbientLight(ambientColor, 1.4)
    scene.add(ambientLight)

    // Main Key Light - Strong white directional from top-left
    // Main Key Light - Strong white directional from top-left
    // Creates bright white highlights on the lit side of objects
    const mainLightColor = new THREE.Color(
      getCssColor("--color-3d-main-light") || 0xffffff,
    )
    const mainLight = new THREE.DirectionalLight(mainLightColor, 1.8)
    mainLight.position.set(-5, 10, 5)
    scene.add(mainLight)

    // Fill Light - Softer white from the right to reduce harsh shadows
    // Fill Light - Softer white from the right to reduce harsh shadows
    // reusing main light color for fill light as per original
    const fillLight = new THREE.DirectionalLight(mainLightColor, 0.6)
    fillLight.position.set(5, 5, 5)
    scene.add(fillLight)

    // Rim Light - Subtle pink/purple point light from bottom-right
    // Rim Light - Subtle pink/purple point light from bottom-right
    // Adds a soft glow and prevents objects from looking flat
    const rimLightColor = new THREE.Color(
      getCssColor("--color-3d-rim-light") || 0xffd1dc,
    )
    const rimLight = new THREE.PointLight(rimLightColor, 0.8, 20)
    rimLight.position.set(5, -3, 3)
    scene.add(rimLight)

    // === MATERIAL SETUP ===
    // Very pale off-white/lavender - objects should be LIGHTER than background
    // The purple ambient light will tint the shadows purple
    const materialColor = new THREE.Color(
      getCssColor("--color-3d-material") || 0xf2f0ff,
    )
    const material = new THREE.MeshStandardMaterial({
      color: materialColor, // Very pale off-white with subtle lavender tint
      roughness: 0.7, // Soft matte finish like unglazed ceramic
      metalness: 0.0, // No metalness for soft, diffuse look
    })

    const shapes: THREE.Mesh[] = []

    // ============================================
    // RESPONSIVE POSITIONING SYSTEM
    // ============================================
    //
    // Layout requirements:
    // 1. Crescent shape: middle elements furthest from center, top/bottom closer
    // 2. Inverse scaling: larger on small screens, smaller on big screens
    // 3. Vertical alignment with text anchors
    // 4. Never overlap text/buttons or clip edges

    // Crescent shape X offsets (distance from center)
    // Middle elements are at peak of curve (furthest out)
    // Top elements slightly in, bottom elements furthest in
    const CRESCENT_X_OFFSETS = {
      top: 6.5, // Medium offset (mid-curve) - increased for more clearance
      middle: 8.0, // Largest offset (peak of curve) - increased
      bottom: 5.5, // Smallest offset (ends of curve) - increased
    }

    // Vertical positions aligned with text content
    // Even spacing: top-to-middle and middle-to-bottom should be similar
    const VERTICAL_Y = {
      top: 1.6, // Near "read classics of the genre..." description text
      middle: -0.3, // Raised - between buttons and checkboxes for even spacing
      bottom: -2.5, // Near "scroll to discover" area
    }

    // Base positions: [left, right] pairs for each row
    // Uses crescent offsets to create curved shape
    const basePositions = [
      { x: -CRESCENT_X_OFFSETS.top, y: VERTICAL_Y.top, z: 0 }, // Capsule (Top Left)
      { x: -CRESCENT_X_OFFSETS.middle, y: VERTICAL_Y.middle, z: 0 }, // Cone (Mid Left)
      { x: -CRESCENT_X_OFFSETS.bottom, y: VERTICAL_Y.bottom, z: 0 }, // Coil (Bottom Left)
      { x: CRESCENT_X_OFFSETS.top, y: VERTICAL_Y.top, z: 0 }, // Disk (Top Right)
      { x: CRESCENT_X_OFFSETS.middle, y: VERTICAL_Y.middle, z: 0 }, // Torus (Mid Right)
      { x: CRESCENT_X_OFFSETS.bottom, y: VERTICAL_Y.bottom, z: 0 }, // C-Shape (Bottom Right)
    ]

    // Base scales for each element
    const baseScales = [1, 1, 1, 1, 1, 1]

    // Size thresholds
    const MIN_SCALE = 0.65 // Minimum scale on very large screens
    const MAX_SCALE = 1.0 // Maximum scale on small screens

    // Width thresholds for clamping (in pixels)
    const MIN_WIDTH_THRESHOLD = 850 // Stop scaling up below this
    const MAX_WIDTH_THRESHOLD = 1600 // Stop scaling down above this

    // 1. Capsule (Top Left) - Tilted
    const capsuleGeo = new THREE.CapsuleGeometry(0.25, 1.2, 4, 16)
    const capsule = new THREE.Mesh(capsuleGeo, material)
    capsule.rotation.set(0, 0, Math.PI / 4 + 0.2)
    scene.add(capsule)
    shapes.push(capsule)

    // 2. Pyramid/Cone (Mid Left)
    const coneGeo = new THREE.ConeGeometry(0.5, 0.8, 4) // Pyramid (4 sides)
    const cone = new THREE.Mesh(coneGeo, material)
    cone.rotation.set(0.5, 0.5, 0)
    scene.add(cone)
    shapes.push(cone)

    // 3. Coil/Spring (Bottom Left)
    // Helper function for helix curve
    const createHelixPoint = (t: number, curveScale: number): THREE.Vector3 => {
      const angle = t * Math.PI * 6 // 3 turns
      const radius = 0.3
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = (t - 0.5) * 1.5
      return new THREE.Vector3(x, y, z).multiplyScalar(curveScale)
    }

    class HelixCurve extends THREE.Curve<THREE.Vector3> {
      curveScale: number
      constructor(scale = 1) {
        super()
        this.curveScale = scale
      }
      getPoint(t: number) {
        return createHelixPoint(t, this.curveScale)
      }
    }

    const helixCurve = new HelixCurve(1.5)
    const coilGeo = new THREE.TubeGeometry(helixCurve, 100, 0.12, 12, false)
    const coil = new THREE.Mesh(coilGeo, material)
    coil.rotation.set(0, 0, -Math.PI / 3)
    scene.add(coil)
    shapes.push(coil)

    // 4. Disk/Pill (Top Right)
    const diskGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 64)
    const disk = new THREE.Mesh(diskGeo, material)
    disk.rotation.set(0.5, 0.2, 0.2)
    scene.add(disk)
    shapes.push(disk)

    // 5. Torus/Donut (Mid Right)
    const torusGeo = new THREE.TorusGeometry(0.6, 0.2, 32, 64)
    const torus = new THREE.Mesh(torusGeo, material)
    torus.rotation.set(0.5, -0.4, 0)
    scene.add(torus)
    shapes.push(torus)

    // 6. C-Shape (Bottom Right)
    const cShapeGeo = new THREE.TorusGeometry(0.5, 0.2, 32, 64, Math.PI * 1.4)
    const cShape = new THREE.Mesh(cShapeGeo, material)
    cShape.rotation.set(0, 0, Math.PI / 1.8)
    scene.add(cShape)
    shapes.push(cShape)

    // Animation loop - computes responsive positions every frame using reactive dimensions
    const clock = new THREE.Clock()

    // Easing function for smooth entrance (easeOutBack - slight overshoot)
    const easeOutBack = (t: number): number => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    // Easing function for smooth fade (easeOutQuad)
    const easeOutQuad = (t: number): number => {
      return 1 - (1 - t) * (1 - t)
    }

    const animate = () => {
      const time = clock.getElapsedTime()

      // Start entrance animation on first frame
      if (entranceStartTime === null) {
        entranceStartTime = time
        // Trigger canvas fade-in
        isSceneReady = true
      }

      // Calculate entrance progress
      const entranceElapsed = time - entranceStartTime

      // ============================================
      // RESPONSIVE CALCULATIONS
      // ============================================

      const aspect = currentWidth / currentHeight
      const referenceAspect = 16 / 9 // Design reference

      // Calculate visible width at z=0 based on camera FOV
      const vFOV = THREE.MathUtils.degToRad(45)
      const visibleHeight = 2 * camera.position.z * Math.tan(vFOV / 2)
      const visibleWidth = visibleHeight * aspect

      // INVERSE SCALING: larger on smaller screens, smaller on larger screens
      // Clamp width to thresholds
      const clampedWidth = Math.max(
        MIN_WIDTH_THRESHOLD,
        Math.min(MAX_WIDTH_THRESHOLD, currentWidth),
      )
      // Calculate scale: maps from threshold range to scale range
      const widthRange = MAX_WIDTH_THRESHOLD - MIN_WIDTH_THRESHOLD
      const scaleRange = MAX_SCALE - MIN_SCALE
      const normalizedWidth = (clampedWidth - MIN_WIDTH_THRESHOLD) / widthRange
      const objectScale = MAX_SCALE - normalizedWidth * scaleRange // Inverse: larger at small widths

      // ADAPTIVE X POSITIONING - CRESCENT SHAPE PRESERVED
      const edgePadding = 1.0 * objectScale
      const halfVisibleWidth = visibleWidth / 2
      const maxAllowedX = halfVisibleWidth - edgePadding

      // TEXT EXCLUSION ZONE - expands on narrow screens
      const narrownessRatio = Math.max(0, Math.min(1, (1.8 - aspect) / 0.8))
      const textContentWidthRatio = 0.36 + narrownessRatio * 0.18 // 36% to 54%
      const minExclusionFromCenter =
        halfVisibleWidth * textContentWidthRatio + 0.6

      // Calculate gutter (space between text zone and screen edge)
      const gutterWidth = maxAllowedX - minExclusionFromCenter
      const gutterCenter = minExclusionFromCenter + gutterWidth / 2

      // CRESCENT SHAPE: Calculate relative X positions for each row
      // Middle = 1.0 (furthest out), Top = 0.7 (middle), Bottom = 0.3 (closest to center)
      const crescentRatios = {
        top: 0.65, // Closer to center than middle
        middle: 1.0, // Furthest from center (peak of crescent)
        bottom: 0.35, // Closest to center
      }

      // Map element index to row type
      const getRowType = (index: number): "top" | "middle" | "bottom" => {
        if (index === 0 || index === 3) return "top"
        if (index === 1 || index === 4) return "middle"
        return "bottom"
      }

      shapes.forEach((shape, i) => {
        const basePos = basePositions[i]
        const baseScale = baseScales[i]
        const rowType = getRowType(i)

        // ============================================
        // ENTRANCE ANIMATION
        // ============================================
        // Each shape starts with a staggered delay
        const shapeDelay = i * STAGGER_DELAY
        const shapeEntranceElapsed = Math.max(0, entranceElapsed - shapeDelay)
        const entranceProgress = Math.min(
          1,
          shapeEntranceElapsed / ENTRANCE_DURATION,
        )
        const entranceScale = easeOutBack(entranceProgress)

        // Calculate animated Y offset (subtle floating motion)
        const animatedYOffset = Math.sin(time * 0.8 + i * 10) * 0.06

        // CRESCENT X POSITIONING
        // Position each row within gutter based on crescent ratio
        let targetX: number

        if (gutterWidth > 0.5) {
          // Calculate position within gutter using crescent ratio
          const crescentRatio = crescentRatios[rowType]
          // Middle elements at outer edge of gutter, others proportionally inward
          const positionInGutter =
            minExclusionFromCenter + gutterWidth * (0.3 + crescentRatio * 0.6)
          targetX = basePos.x < 0 ? -positionInGutter : positionInGutter
        } else {
          // Very narrow gutter - all elements at edge
          targetX = basePos.x < 0 ? -maxAllowedX : maxAllowedX
        }

        // Clamp to visible area (prevent clipping)
        targetX = Math.max(-maxAllowedX, Math.min(maxAllowedX, targetX))

        // Apply position
        shape.position.x = targetX
        shape.position.y = basePos.y + animatedYOffset
        shape.position.z = basePos.z

        // Apply responsive scaling WITH entrance animation
        const finalScale = baseScale * objectScale * entranceScale
        shape.scale.set(finalScale, finalScale, finalScale)

        // Very slow, gentle rotation
        shape.rotation.x += 0.001
        shape.rotation.y += 0.0015
      })

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize - called when container dimensions change
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight

      // Update reactive dimensions (used by animation loop)
      currentWidth = width
      currentHeight = height

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      // Responsive math to keep elements in view
      // We want ~15 units of horizontal width visible to avoid cutting off edge shapes
      const targetVisibleWidth = 16
      const vFOV = THREE.MathUtils.degToRad(45) // Using 45 deg FOV
      const targetZ =
        targetVisibleWidth / 2 / (camera.aspect * Math.tan(vFOV / 2))

      camera.position.z = Math.max(10, targetZ)
    }

    // Use ResizeObserver to detect container size changes
    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(container)

    // Initial setup
    handleResize()

    // Also listen to window resize as a fallback
    window.addEventListener("resize", handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  })
</script>

<div
  bind:this={container}
  class="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
>
  <canvas
    bind:this={canvas}
    class="w-full h-full"
    style="opacity: {isSceneReady ? 1 : 0}; transition: opacity 0.8s ease-out;"
  ></canvas>
</div>
