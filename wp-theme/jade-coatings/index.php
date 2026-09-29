<!-- Live Interactive Preview for JADE Coatings -->
<!-- Updated with:
  1. Logo sized up TWICE as large (h-28 to h-44 in header, h-24 to h-32 in footer)
  2. Interactive Before/After Slide Preview on each product card
  3. Interactive Smart Coverage Calculator (Area, Surface Porosity, Coats, Can breakdown, Direct Quote export)
  4. Exact Logo Color Palette: Primary Jade #00A651, Charcoal #231F20, Deep Forest #074626, Mint #EBF8F2
-->
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <script>
    const THEME_DIR_URI = "<?php echo get_template_directory_uri(); ?>";
    const GITHUB_ASSETS_CDN = "https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/";
  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JADE Coatings | Advanced Water-based Solutions</title>
  <link rel="icon" type="image/png" href="https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/Logo.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script>
    document.documentElement.classList.remove('dark');
    try { localStorage.removeItem('jade-theme'); } catch(e) {}
  </script>
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            heading: ['Manrope', 'Inter', 'sans-serif'],
          },
          colors: {
            brand: {
              DEFAULT: '#00A651', // Exact Logo Green
              hover: '#008F45',
              dark: '#074626',
              deep: '#032613',
              pale: '#EBF8F2',
              light: '#bbf1d5',
              charcoal: '#231F20', // Exact Logo Typography Black
            },
            dark: {
              bg: '#0B0F17',
              card: '#131B26',
              surface: '#1A2433',
              border: '#233044',
            }
          }
        }
      }
    }
  </script>
  <style>
    body, button, input, select, textarea {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      letter-spacing: -0.011em;
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      letter-spacing: -0.025em;
    }
    :root {
      --brand-green: #00A651;
      --brand-charcoal: #231F20;
      --brand-dark: #074626;
      --brand-pale: #EBF8F2;
    }
    .page-tab { display: none; }
    .page-tab.active { display: block; animation: fadeIn 0.25s ease-out forwards; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .logo-shadow {
      filter: drop-shadow(0 6px 16px rgba(0, 166, 81, 0.18));
    }
    /* Before After Slider Styling */
    .ba-container {
      position: relative;
      overflow: hidden;
      user-select: none;
      border-radius: 1rem;
    }
    .ba-slider-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: ew-resize;
      z-index: 20;
      margin: 0;
      touch-action: pan-y;
      -webkit-tap-highlight-color: transparent;
    }
    .ba-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: rgba(255, 255, 255, 0.45);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      z-index: 15;
      pointer-events: none;
    }
    .ba-handle-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: -1px;
      border: 1.5px solid rgba(255, 255, 255, 0.85);
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }
    /* Sliding Logo Marquee Animation */
    @keyframes slideMarquee {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .animate-slide-logos {
      display: flex;
      width: max-content;
      animation: slideMarquee 26s linear infinite;
      will-change: transform;
    }
    .animate-slide-logos:hover {
      animation-play-state: paused;
    }
    /* 3D Deck Transformation Hero Animation */
    @keyframes deckTransform {
      0%, 35% {
        opacity: 0;
        transform: scale(1.04) rotateX(2deg);
        filter: brightness(0.9) contrast(0.95);
      }
      45%, 90% {
        opacity: 1;
        transform: scale(1) rotateX(0deg);
        filter: brightness(1.05) contrast(1.05);
      }
      100% {
        opacity: 0;
        transform: scale(1.04) rotateX(2deg);
        filter: brightness(0.9) contrast(0.95);
      }
    }
    @keyframes deckScanWave {
      0%, 32% {
        left: -20%;
        opacity: 0;
      }
      38% {
        opacity: 1;
      }
      48% {
        opacity: 0.9;
      }
      55%, 100% {
        left: 120%;
        opacity: 0;
      }
    }
    .hero-deck-3d-restored {
      animation: deckTransform 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      will-change: opacity, transform, filter;
    }
    .hero-deck-scanline {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 120px;
      background: linear-gradient(90deg, transparent 0%, rgba(0, 166, 81, 0.4) 40%, rgba(255, 255, 255, 0.9) 50%, rgba(0, 166, 81, 0.4) 60%, transparent 100%);
      animation: deckScanWave 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      transform: skewX(-20deg);
      pointer-events: none;
      z-index: 2;
      filter: blur(2px);
    }
    /* 3D Product Hero Floating Can and Orbital Rings */
    @keyframes float3DCan {
      0%, 100% {
        transform: translateY(0px) rotateY(-8deg) rotateX(4deg) scale(1);
      }
      50% {
        transform: translateY(-16px) rotateY(12deg) rotateX(-2deg) scale(1.03);
      }
    }
    @keyframes orbitSpin {
      0% {
        transform: rotate(0deg) scale(1);
      }
      50% {
        transform: rotate(180deg) scale(1.05);
      }
      100% {
        transform: rotate(360deg) scale(1);
      }
    }
    @keyframes pulseGlow {
      0%, 100% {
        opacity: 0.35;
        transform: scale(0.95);
      }
      50% {
        opacity: 0.75;
        transform: scale(1.1);
      }
    }
    .animate-float-3d {
      animation: float3DCan 6s ease-in-out infinite;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .animate-orbit-ring {
      animation: orbitSpin 18s linear infinite;
      will-change: transform;
    }
    .animate-pulse-glow {
      animation: pulseGlow 4s ease-in-out infinite;
    }
    /* 3D Mascot Character Floating & Interactive Rotation */
    @keyframes float3DMascot {
      0%, 100% {
        transform: translateY(0px) rotateY(-6deg) rotateX(3deg) scale(1);
      }
      25% {
        transform: translateY(-14px) rotateY(4deg) rotateX(-2deg) scale(1.02);
      }
      50% {
        transform: translateY(-22px) rotateY(10deg) rotateX(1deg) scale(1.04);
      }
      75% {
        transform: translateY(-10px) rotateY(-2deg) rotateX(-1deg) scale(1.01);
      }
    }
    @keyframes mascotGroundShadow {
      0%, 100% {
        transform: scale(1);
        opacity: 0.55;
      }
      50% {
        transform: scale(0.75);
        opacity: 0.25;
      }
    }
    .animate-mascot-3d {
      animation: float3DMascot 5s ease-in-out infinite;
      transform-style: preserve-3d;
      will-change: transform;
    }
    .animate-mascot-shadow {
      animation: mascotGroundShadow 5s ease-in-out infinite;
      will-change: transform, opacity;
    }
  </style>
<?php wp_head(); ?>
</head>
<body class="bg-[#FAFCFA] dark:bg-[#0B0F17] text-[#231F20] dark:text-slate-100 font-sans antialiased selection:bg-[#00A651] selection:text-white min-h-screen flex flex-col transition-colors duration-200">

  <!-- Top Announcement Bar -->
  <div class="bg-[#231F20] text-emerald-300 text-xs py-2 px-4 border-b border-[#074626]">
    <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
      <div class="flex items-center gap-2">
        <span class="inline-block w-2.5 h-2.5 rounded-full bg-[#00A651] animate-ping"></span>
        <span class="font-medium text-white">A brand of Colour Max Lanka Pvt Ltd</span>
        <span class="text-emerald-500">|</span>
        <span class="text-gray-300">Pioneering Water-Based Solutions Since 2015</span>
      </div>
      <div class="flex items-center gap-4 text-gray-300">
        <span class="flex items-center gap-1.5 text-white">
          <svg class="w-3.5 h-3.5 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          <span class="font-medium">077 377 4340</span> / 011 287 2591
        </span>
        <span class="hidden sm:inline text-gray-500">|</span>
        <span class="hidden sm:flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          <a href="mailto:info@colourmax.lk" class="hover:text-white transition-colors">info@colourmax.lk</a>
        </span>
      </div>
    </div>
  </div>

  <!-- Header / Navbar with Elegantly Proportioned Responsive Logo -->
  <header class="sticky top-0 z-40 bg-white/98 dark:bg-[#0B0F17]/95 backdrop-blur-md shadow-sm border-b border-emerald-100 dark:border-slate-800 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-18 sm:h-20">
        <!-- Responsive Balanced Logo -->
        <a href="javascript:void(0)" onclick="navigateTo('home')" class="flex items-center py-2 group">
          <div class="bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl flex items-center transition-transform duration-200 group-hover:scale-105 shadow-sm border border-emerald-50">
            <img
              src="https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/Logo.png"
              onerror="this.onerror=null; this.src='assests/Logo.png'"
              alt="JADE Coatings Logo"
              class="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </div>
        </a>

        <!-- Desktop Navigation: Home, About Us, Products, Project & Clients, Contact Us, Coverage Calculator -->
        <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <button onclick="navigateTo('home')" class="nav-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 text-[#00A651] bg-[#EBF8F2]" data-page="home">Home</button>
          <button onclick="navigateTo('about')" class="nav-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-[#231F20] dark:text-slate-200 hover:text-[#00A651] dark:hover:text-[#00A651] hover:bg-[#EBF8F2]/60 dark:hover:bg-slate-800/80" data-page="about">About Us</button>
          <button onclick="navigateTo('products')" class="nav-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-[#231F20] dark:text-slate-200 hover:text-[#00A651] dark:hover:text-[#00A651] hover:bg-[#EBF8F2]/60 dark:hover:bg-slate-800/80" data-page="products">Products</button>
          <button onclick="navigateTo('projects')" class="nav-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-[#231F20] dark:text-slate-200 hover:text-[#00A651] dark:hover:text-[#00A651] hover:bg-[#EBF8F2]/60 dark:hover:bg-slate-800/80" data-page="projects">Project & Clients</button>
          <button onclick="navigateTo('contact')" class="nav-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-[#231F20] dark:text-slate-200 hover:text-[#00A651] dark:hover:text-[#00A651] hover:bg-[#EBF8F2]/60 dark:hover:bg-slate-800/80" data-page="contact">Contact Us</button>
          <button onclick="navigateTo('shops')" class="nav-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-[#231F20] dark:text-slate-200 hover:text-[#00A651] dark:hover:text-[#00A651] hover:bg-[#EBF8F2]/60 dark:hover:bg-slate-800/80 flex items-center gap-1.5" data-page="shops">
            <svg class="w-4 h-4 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Find a Shop</span>
          </button>
          <button onclick="navigateTo('calculator')" class="nav-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 text-[#231F20] dark:text-slate-200 hover:text-[#00A651] dark:hover:text-[#00A651] hover:bg-[#EBF8F2]/60 dark:hover:bg-slate-800/80 flex items-center gap-1.5" data-page="calculator">
            <svg class="w-4 h-4 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <span>Coverage Calculator</span>
          </button>
        </nav>

        <!-- Mobile Menu Toggle -->
        <div class="flex items-center gap-2 lg:hidden">
          <button onclick="toggleMobileMenu()" class="p-2.5 rounded-xl text-[#231F20] hover:text-[#00A651] hover:bg-gray-100">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden lg:hidden py-4 border-t border-gray-100 dark:border-slate-800 dark:bg-[#131B26] rounded-2xl px-2 mt-2 space-y-1">
        <button onclick="navigateTo('home'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-semibold text-[#00A651] bg-[#EBF8F2] rounded-xl">Home</button>
        <button onclick="navigateTo('about'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#231F20] hover:bg-[#EBF8F2] rounded-xl">About Us</button>
        <button onclick="navigateTo('products'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#231F20] hover:bg-[#EBF8F2] rounded-xl">Products</button>
        <button onclick="navigateTo('projects'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#231F20] hover:bg-[#EBF8F2] rounded-xl">Project & Clients</button>
        <button onclick="navigateTo('contact'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#231F20] hover:bg-[#EBF8F2] rounded-xl">Contact Us</button>
        <button onclick="navigateTo('shops'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-medium text-[#231F20] hover:bg-[#EBF8F2] rounded-xl flex items-center gap-2">
          <svg class="w-4 h-4 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span>Find a Shop</span>
        </button>
        <button onclick="navigateTo('calculator'); toggleMobileMenu();" class="block w-full text-left px-4 py-2.5 text-sm font-semibold text-[#00A651] hover:bg-[#EBF8F2] rounded-xl">Coverage Calculator</button>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- PAGE 1: HOME PAGE -->
  <!-- ========================================================================= -->
  <main id="page-home" class="page-tab active flex-grow">
    <!-- Hero Section with hero-image.jpg Background -->
    <section class="relative text-white overflow-hidden py-24 sm:py-36 min-h-[85vh] flex items-center justify-center">
      <!-- 3D Animated Deck Transformation Background -->
      <div class="absolute inset-0 z-0 overflow-hidden" style="perspective: 1000px;">
        <!-- State 1: Dried Out / Weathered Wooden Deck (Base Layer) -->
        <img
          src="https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/deck-weathered.jpg"
          onerror="this.onerror=null; this.src='assests/deck-weathered.jpg'"
          alt="Weathered Dried Out Wooden Deck"
          class="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        <!-- State 2: Elegant Coated Wooden Deck (3D Transformed Layer) -->
        <img
          src="https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/deck-restored.jpg"
          onerror="this.onerror=null; this.src='assests/deck-restored.jpg'"
          alt="Restored Elegant Golden Teak Wooden Deck"
          class="hero-deck-3d-restored absolute inset-0 w-full h-full object-cover object-center"
        />

        <!-- 3D Energy Transformation Scanline -->
        <div class="hero-deck-scanline"></div>

        <!-- Neutral Charcoal/Slate Glass Depth Overlays (Replaces green tint) -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/85 via-[#231F20]/70 to-black/90"></div>
        <div class="absolute inset-0 bg-black/35"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Water-Borne Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md shadow-sm">
          <span class="w-2 h-2 rounded-full bg-[#00A651] animate-pulse"></span>
          <span>Pioneering Water-Borne Technology Since 2015</span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none drop-shadow-md">
          Coatings that brings out the <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-white">best</span>
        </h1>

        <p class="mt-4 sm:mt-6 text-lg sm:text-2xl text-white/90 font-light italic max-w-2xl mx-auto drop-shadow-sm">
          &ldquo;We render life to your coatings.&rdquo;
        </p>

        <p class="mt-3 sm:mt-4 text-emerald-200/85 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
          Pioneering high-performance water-based coating solutions in Sri Lanka since 2015. Certified eco-friendly, ultra-low VOC protection for wood, masonry, decoratives, and heavy industry.
        </p>

        <div class="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <button onclick="navigateTo('products')" class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#00A651] hover:bg-[#008F45] transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#00A651]/30">
            Explore Products & Before/After
          </button>
          <button onclick="navigateTo('calculator')" class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#231F20]/80 hover:bg-[#231F20] border border-[#00A651] transition-all backdrop-blur-sm shadow-md flex items-center justify-center gap-2">
            <svg class="w-4 h-4 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            <span>Coverage Calculator</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="py-16 bg-white relative -mt-6 rounded-t-3xl border-t border-emerald-100/50 shadow-inner">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-xs uppercase font-extrabold tracking-widest text-[#00A651]">Purity & Performance</h2>
          <p class="text-2xl sm:text-3xl font-bold text-[#231F20] dark:text-white mt-2 tracking-tight">Engineered for Human Health & Environmental Harmony</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-[#EBF8F2] to-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-[#00A651] text-white flex items-center justify-center mb-4 shadow-sm shadow-[#00A651]/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#231F20]">Low VOC Formula</h3>
            <p class="text-sm text-gray-600 mt-2 leading-relaxed">Virtually odorless application with minimal volatile organic emissions, ensuring safe indoor air quality.</p>
          </div>

          <div class="bg-gradient-to-br from-[#EBF8F2] to-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-[#00A651] text-white flex items-center justify-center mb-4 shadow-sm shadow-[#00A651]/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#231F20]">Eco Friendly</h3>
            <p class="text-sm text-gray-600 mt-2 leading-relaxed">Formulated with biodegradable, 100% water-borne resins that protect nature without toxic chemical residue.</p>
          </div>

          <div class="bg-gradient-to-br from-[#EBF8F2] to-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-[#00A651] text-white flex items-center justify-center mb-4 shadow-sm shadow-[#00A651]/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#231F20]">UV Protection</h3>
            <p class="text-sm text-gray-600 mt-2 leading-relaxed">Superior ultraviolet blockers resist fading, yellowing, and weathering in harsh tropical sun conditions.</p>
          </div>

          <div class="bg-gradient-to-br from-[#EBF8F2] to-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 rounded-xl bg-[#00A651] text-white flex items-center justify-center mb-4 shadow-sm shadow-[#00A651]/30">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-[#231F20]">No Added Lead / Mercury</h3>
            <p class="text-sm text-gray-600 mt-2 leading-relaxed">Certified free from toxic heavy metals, making it safe for children, pets, residential interiors, and food-adjacent areas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sliding Client Logos Section on Home Page -->
    <section class="py-14 bg-gradient-to-b from-white via-[#EBF8F2]/30 to-white border-y border-emerald-100 overflow-hidden relative">
      <div class="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div class="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span class="inline-block px-3.5 py-1 rounded-full bg-[#00A651]/10 text-[#00A651] text-xs font-bold uppercase tracking-widest mb-2">
          Enterprise & Industry Partners
        </span>
        <h3 class="text-2xl sm:text-3xl font-bold text-[#231F20] dark:text-white">
          Trusted by Industry Leaders
        </h3>
        <p class="text-xs sm:text-sm text-gray-500 mt-1">
          Certified water-borne coating systems chosen by industry pioneers nationwide
        </p>
      </div>

      <div class="flex overflow-hidden py-4">
        <div class="animate-slide-logos flex items-center gap-8 sm:gap-12 whitespace-nowrap pl-4" id="home-sliding-logos">
          <!-- Populated dynamically via JS -->
        </div>
      </div>
    </section>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE 2: ABOUT US -->
  <!-- ========================================================================= -->
  <main id="page-about" class="page-tab flex-grow">
    <section class="bg-gradient-to-b from-[#032613] to-[#074626] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs uppercase font-extrabold tracking-widest text-[#00A651]">About JADE Coatings</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">Water-Based Innovation & Responsibility</h1>
        <p class="mt-4 text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base">
          A distinguished brand of Colour Max Lanka Pvt Ltd, committed to the harmonious integration of water-based products with the community.
        </p>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-xs uppercase font-extrabold tracking-widest text-[#00A651]">Who We Are</span>
            <h2 class="text-3xl font-bold tracking-tight text-[#231F20] dark:text-white mt-2 leading-tight">Global Expertise Combined with Local Excellence</h2>
            <p class="mt-4 text-gray-600 leading-relaxed">
              JADE Coatings works in strategic association with global experts to offer low to ultra-low VOC water-borne paints that rival and exceed conventional solvent solutions in durability, aesthetic finish, and surface protection.
            </p>
            <p class="mt-3 text-gray-600 leading-relaxed">
              Based in Biyagama, Sri Lanka, our operations deliver state-of-the-art formulations across two main sectors: architectural & domestic wood and masonry coatings, and high-performance industrial corrosion & tyre manufacturing solutions.
            </p>
          </div>
          <div class="bg-[#EBF8F2] rounded-3xl p-8 border border-emerald-100 relative overflow-hidden shadow-sm">
            <h3 class="text-xl font-bold text-[#074626] font-bold tracking-tight mb-4">Our Core Commitments</h3>
            <ul class="space-y-4 text-sm text-[#231F20]">
              <li class="flex items-start gap-3">
                <div class="p-1 rounded-md bg-[#00A651] text-white mt-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div>
                <span><strong>Zero Compromise:</strong> Maximum durability, scratch resistance, and waterproofing without toxic chemical smells.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="p-1 rounded-md bg-[#00A651] text-white mt-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div>
                <span><strong>Tropical Optimization:</strong> Formulated specifically to endure Sri Lanka's intense UV exposure and humid coastal conditions.</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="p-1 rounded-md bg-[#00A651] text-white mt-0.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div>
                <span><strong>Health Safeguards:</strong> Complete absence of added lead, mercury, or carcinogenic raw materials.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Statement -->
    <section class="py-16 bg-gradient-to-r from-[#231F20] via-[#074626] to-[#231F20] text-white text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span class="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-[#00A651] text-white mb-4 uppercase tracking-widest">Our Vision</span>
        <blockquote class="text-2xl sm:text-4xl font-bold tracking-tight font-bold italic leading-relaxed text-white">
          &ldquo;Our vision is the harmonious integration of water based products with the community.&rdquo;
        </blockquote>
        <p class="mt-4 text-xs tracking-wider uppercase text-emerald-300 font-semibold">— JADE Coatings (Colour Max Lanka Pvt Ltd)</p>
      </div>
    </section>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE 3: PRODUCTS (WITH INTERACTIVE BEFORE/AFTER SLIDE PREVIEW ON CARDS) -->
  <!-- ========================================================================= -->
  <main id="page-products" class="page-tab flex-grow">
    <!-- 3D Animated Hero Section -->
    <section class="relative py-16 sm:py-24 bg-gradient-to-b from-[#032613] via-[#074626] to-[#032613] text-white overflow-hidden">
      <!-- Ambient light glows -->
      <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#00A651]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight mt-1 leading-tight">
            Engineered for <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-[#00A651] to-emerald-200">Unrivaled Protection</span>
          </h1>
          <p class="mt-4 text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Drag the interactive Before / After slider on any product card below to see real surface transformations before & after applying JADE Coatings!
          </p>
        </div>
      </div>
    </section>

    <!-- Filters & Search Toolbar -->
    <section class="bg-white border-b border-gray-200 sticky top-28 sm:top-36 md:top-40 z-30 shadow-sm py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center bg-gray-100 dark:bg-slate-800 p-1.5 rounded-xl text-sm font-bold w-full sm:w-auto">
            <button onclick="filterDivision('all')" id="tab-all" class="div-tab flex-1 sm:flex-none px-5 py-2.5 rounded-lg transition-all bg-white dark:bg-slate-700 text-[#00A651] dark:text-emerald-400 shadow-sm">All Products (<span id="count-all">0</span>)</button>
            <button onclick="filterDivision('Domestic')" id="tab-domestic" class="div-tab flex-1 sm:flex-none px-5 py-2.5 rounded-lg transition-all text-gray-600 dark:text-slate-300 hover:text-[#00A651] dark:hover:text-emerald-400">Domestic (<span id="count-domestic">0</span>)</button>
            <button onclick="filterDivision('Industrial')" id="tab-industrial" class="div-tab flex-1 sm:flex-none px-5 py-2.5 rounded-lg transition-all text-gray-600 dark:text-slate-300 hover:text-[#00A651] dark:hover:text-emerald-400">Industrial (<span id="count-industrial">0</span>)</button>
          </div>

          <div class="relative w-full sm:w-80">
            <input type="text" id="product-search" oninput="handleSearch(this.value)" placeholder="Search products or brands..." class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-[#231F20] dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A651]">
            <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid with Before/After Sliders -->
    <section class="py-12 bg-[#F4F9F6] dark:bg-[#0B0F17] transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="products-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
        <div id="no-products" class="hidden text-center py-20">
          <h3 class="text-lg font-bold text-gray-700">No matching products found</h3>
          <p class="text-sm text-gray-500 mt-1">Try another search keyword or switch division tabs.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE 4: COVERAGE CALCULATOR (NEW FEATURE) -->
  <!-- ========================================================================= -->
  <main id="page-calculator" class="page-tab flex-grow">
    <section class="bg-gradient-to-b from-[#032613] to-[#074626] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-1">Coverage Calculator</h1>
        <p class="mt-3 text-emerald-100 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
          Please note: This is an estimated figure. Actual results may vary depending on the specific surface characteristics, porosity, and the chosen method of application.
        </p>
      </div>
    </section>

    <section class="py-12 sm:py-16 bg-[#F4F9F6] dark:bg-[#0B0F17] transition-colors">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white dark:bg-[#131B26] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-200 dark:border-slate-800">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            <!-- Calculator Inputs (7 Cols) -->
            <div class="lg:col-span-7 space-y-6">
              <h2 class="text-lg sm:text-xl font-bold font-bold tracking-tight text-[#231F20] dark:text-white border-b border-gray-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00A651]"></span>
                <span>Enter Your Project Parameters</span>
              </h2>

              <!-- Product Selection -->
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300 mb-1.5">Select JADE Product</label>
                <select id="calc-product" onchange="runCalculator()" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 text-sm font-semibold text-[#231F20] dark:text-white focus:ring-2 focus:ring-[#00A651] focus:outline-none bg-gray-50 dark:bg-slate-900">
                  <optgroup label="Domestic - Wood Coatings (WOODSHIELD)">
                    <option value="woodshield-sanding-sealer" data-sqft="100">WOODSHIELD Sanding Sealer</option>
                    <option value="woodshield-topcoat" data-sqft="120">WOODSHIELD Top Coat</option>
                    <option value="woodshield-stains" data-sqft="150">WOODSHIELD Wood Stains</option>
                    <option value="woodshield-allinone" data-sqft="130">WOODSHIELD All in One</option>
                    <option value="woodshield-floor" data-sqft="150">WOODSHIELD Floor Coat</option>
                  </optgroup>
                  <optgroup label="Domestic - Decoratives">
                    <option value="jade-easy-floor" data-sqft="150">JADE Easy Floor</option>
                    <option value="jade-roof-wall" data-sqft="220">JADE Roof & Wall Shield</option>
                  </optgroup>
                  <optgroup label="Domestic - Masonry Coatings (MASOGUARD)">
                    <option value="masoguard-paving" data-sqft="180">MASOGUARD Wet Look Paving Sealer</option>
                    <option value="masoguard-primer" data-sqft="120">MASOGUARD Primer</option>
                    <option value="masoguard-allinone" data-sqft="150">MASOGUARD All in One</option>
                    <option value="masoguard-topcoat" data-sqft="150">MASOGUARD Top Coat</option>
                  </optgroup>
                  <optgroup label="Industrial - Metal Coatings (METASHIELD)">
                    <option value="metashield-anticorrosive" data-sqft="210">METASHIELD Anti Corrosive - Black</option>
                  </optgroup>
                </select>
              </div>

              <!-- Surface Area & Unit -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="text-xs font-bold uppercase tracking-wider text-gray-600">Total Surface Area</label>
                  <div class="flex items-center bg-gray-100 p-1 rounded-lg text-xs font-semibold">
                    <button type="button" onclick="setCalcUnit('sqft')" id="unit-sqft-btn" class="px-2.5 py-1 rounded bg-[#00A651] text-white font-bold text-xs">Sq. Feet</button>
                    <button type="button" onclick="setCalcUnit('sqm')" id="unit-sqm-btn" class="px-2.5 py-1 rounded text-gray-600 font-semibold text-xs">Sq. Meters</button>
                  </div>
                </div>
                <div class="relative">
                  <input type="number" id="calc-area" value="500" min="1" oninput="runCalculator()" class="w-full px-4 py-3 rounded-xl border border-gray-300 text-base font-bold text-[#231F20] focus:ring-2 focus:ring-[#00A651] focus:outline-none">
                  <span id="unit-display-label" class="absolute right-4 top-3.5 text-xs font-bold text-gray-400 uppercase">sq.ft</span>
                </div>
              </div>

            </div>

            <!-- Calculator Results Card (5 Cols) -->
            <div class="lg:col-span-5 bg-gradient-to-br from-[#074626] to-[#032613] text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-[#00A651]/20 rounded-full blur-2xl"></div>

              <div>
                <span class="text-[11px] font-bold tracking-widest uppercase text-emerald-300">Estimated Requirement</span>
                
                <div class="mt-4 pb-6 border-b border-white/15">
                  <div class="flex items-baseline gap-2">
                    <span id="res-liters" class="text-6xl font-black font-bold tracking-tight text-white tracking-tight">4.3</span>
                    <span class="text-xl font-bold text-[#00A651]">Liters</span>
                  </div>
                  <p class="text-xs text-emerald-200/80 mt-1">Recommended for complete, uniform coverage.</p>
                </div>

                <!-- Eco Guarantee Note -->
                <div class="mt-6 p-3 rounded-xl bg-[#00A651]/20 border border-[#00A651]/40 flex items-center gap-2.5 text-xs text-emerald-100">
                  <svg class="w-4 h-4 text-[#00A651] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                  <span>100% Water-borne formula. Easy water cleanup without solvent thinners.</span>
                </div>
              </div>

              <!-- Export to Contact Form -->
              <div class="pt-8">
                <button onclick="transferToContact()" class="w-full py-3.5 rounded-full text-sm font-bold text-white bg-[#00A651] hover:bg-[#008F45] transition-all shadow-xl shadow-[#00A651]/40 flex items-center justify-center gap-2">
                  <span>Inquire with this Calculation</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE 5: PROJECTS & CLIENTS -->
  <!-- ========================================================================= -->
  <main id="page-projects" class="page-tab flex-grow">
    <!-- Hero: Centered Clean Layout (No JPG) -->
    <section class="relative bg-gradient-to-b from-[#032613] via-[#074626] to-[#032613] text-white py-20 lg:py-24 overflow-hidden">
      <!-- Ambient background glows -->
      <div class="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00A651]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          Projects & <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-[#00A651]">Clients</span>
        </h1>
        <p class="text-emerald-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Trusted by Sri Lanka's most prestigious hotels, real estate developments, and national institutions. Our commercial-grade water-based formulations deliver enduring beauty across the island.
        </p>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs uppercase font-extrabold tracking-widest text-[#00A651]">Landmark Projects</span>
          <h2 class="text-3xl font-bold tracking-tight text-[#231F20] dark:text-white mt-1">Featured Hospitality & Resort Work</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-container"></div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-b from-[#EBF8F2] via-white to-[#EBF8F2]/40 border-t border-emerald-100 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-14">
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20 mb-3">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            Proven Industry Partnerships
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#231F20] dark:text-white mt-1">Trusted By Industry Leaders</h2>
          <p class="mt-3 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed">
            From multinational tyre manufacturing leaders and national institutions to top tier luxury hospitality groups, JADE Coatings powers demanding projects nationwide.
          </p>

          <div class="mt-7 grid grid-cols-3 gap-3 max-w-lg mx-auto">
            <div class="bg-white dark:bg-[#131B26] rounded-2xl p-3 border border-gray-200 dark:border-slate-800 shadow-xs">
              <span class="block text-xl font-black text-[#00A651]">10+</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Enterprise Brands</span>
            </div>
            <div class="bg-white dark:bg-[#131B26] rounded-2xl p-3 border border-gray-200 dark:border-slate-800 shadow-xs">
              <span class="block text-xl font-black text-[#00A651]">100%</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Eco Water-Based</span>
            </div>
            <div class="bg-white dark:bg-[#131B26] rounded-2xl p-3 border border-gray-200 dark:border-slate-800 shadow-xs">
              <span class="block text-xl font-black text-[#00A651]">7+</span>
              <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Star Resorts</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="clients-container"></div>
      </div>
    </section>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE 6: CONTACT US -->
  <!-- ========================================================================= -->
  <main id="page-contact" class="page-tab flex-grow">
    <section class="bg-gradient-to-b from-[#032613] to-[#074626] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-xs uppercase font-extrabold tracking-widest text-[#00A651]">Connect With JADE</span>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mt-2">Contact Us</h1>
        <p class="mt-3 text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base">
          Reach out to our technical advisory team for product specifications, distributor inquiries, or customized bulk quotes.
        </p>
      </div>
    </section>

    <section class="py-16 bg-[#F4F9F6] dark:bg-[#0B0F17] transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-sm">
            <!-- 1-Click WhatsApp Quick Contact Banner -->
            <div class="p-4 sm:p-5 rounded-2xl bg-[#EBF8F2] border border-[#25D366]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div class="flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#25D366]/30">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </div>
                <div>
                  <h4 class="font-bold text-sm sm:text-base text-[#231F20] dark:text-white">
                    Need Fast Answers? Text Us on WhatsApp
                  </h4>
                  <p class="text-xs text-gray-500">
                    Hotline: <span class="font-bold text-[#231F20]">077 377 4340</span> · Instant replies from our team
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/94773774340?text=Hello%20JADE%20Coatings%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#25D366]/25 hover:scale-[1.02] transition-all shrink-0"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span>Chat Right Away</span>
              </a>
            </div>

            <div class="relative flex py-1 items-center mb-6">
              <div class="flex-grow border-t border-gray-200"></div>
              <span class="flex-shrink mx-4 text-xs uppercase font-bold tracking-wider text-gray-400">
                Or Send Structured Inquiry via WhatsApp
              </span>
              <div class="flex-grow border-t border-gray-200"></div>
            </div>

            <h2 class="text-2xl font-bold tracking-tight text-[#231F20] dark:text-white">Send an Inquiry</h2>
            <p class="text-sm text-gray-500 mt-1 mb-6">Fill the details below to open WhatsApp with your customized message directly.</p>

            <form id="contact-form" onsubmit="handleContactSubmit(event)" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#231F20] mb-1">Your Name *</label>
                  <input type="text" id="form-name" required placeholder="e.g. Kasun Perera" class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent">
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-[#231F20] mb-1">Contact Number or Email *</label>
                  <input type="text" id="form-email" required placeholder="e.g. 077 123 4567 or email" class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent">
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#231F20] mb-1">Subject / Project Type *</label>
                <input type="text" id="form-subject" required placeholder="e.g. Quotation for Resort Deck Coating / Woodshield" class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-[#231F20] mb-1">Your Message / Requirements *</label>
                <textarea id="form-message" rows="5" required placeholder="Detail your surface type, approximate square footage, or specific requirement..." class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:border-transparent"></textarea>
              </div>

              <div class="pt-2">
                <button type="submit" id="submit-btn" class="w-full sm:w-auto px-9 py-3.5 rounded-full text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-lg shadow-[#25D366]/25 flex items-center justify-center gap-2.5">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <span>Text on WhatsApp Right Away</span>
                </button>
              </div>

              <div id="contact-success" class="hidden mt-4 p-4 rounded-xl bg-[#EBF8F2] border border-[#25D366]/40 text-[#074626] text-sm flex items-start gap-3">
                <svg class="w-5 h-5 text-[#25D366] mt-0.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <div>
                  <span class="font-bold block">WhatsApp Chat Launched!</span>
                  <span>You can now send your inquiry directly to our technical team on <strong>077 377 4340</strong>.</span>
                </div>
              </div>
            </form>
          </div>

          <div class="lg:col-span-5 space-y-6">
            <div class="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
              <h3 class="text-xl font-bold tracking-tight text-[#231F20] dark:text-white border-b border-gray-100 dark:border-slate-800 pb-4">Corporate Office</h3>
              
              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl bg-[#EBF8F2] text-[#00A651]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <h4 class="text-xs uppercase font-extrabold tracking-wider text-gray-400">Address</h4>
                  <p class="text-sm font-bold text-[#231F20] mt-0.5">424/1/B, Kottunna Rd,</p>
                  <p class="text-sm text-gray-600">Biyagama, Sri Lanka</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl bg-[#EBF8F2] text-[#00A651]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <h4 class="text-xs uppercase font-extrabold tracking-wider text-gray-400">Direct Telephone</h4>
                  <a href="tel:+94773774340" class="text-sm font-bold text-[#231F20] hover:text-[#00A651] mt-0.5 block">077 377 4340</a>
                  <a href="tel:+94112872591" class="text-sm text-gray-600 hover:text-[#00A651] block">011 287 2591</a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl bg-[#EBF8F2] text-[#25D366]">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </div>
                <div>
                  <h4 class="text-xs uppercase font-extrabold tracking-wider text-gray-400">WhatsApp Direct</h4>
                  <a href="https://wa.me/94773774340" target="_blank" rel="noopener noreferrer" class="text-sm font-bold text-[#25D366] hover:underline mt-0.5 block">077 377 4340 (Text right away)</a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="p-3 rounded-xl bg-[#EBF8F2] text-[#00A651]">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h4 class="text-xs uppercase font-extrabold tracking-wider text-gray-400">Email Address</h4>
                  <a href="mailto:info@colourmax.lk" class="text-sm font-bold text-[#00A651] hover:underline mt-0.5 block">info@colourmax.lk</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ========================================================================= -->
  <!-- PAGE: FIND A SHOP (STORE & DEALER LOCATOR) -->
  <!-- ========================================================================= -->
  <main id="page-shops" class="page-tab flex-grow bg-slate-50/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <!-- Clean Compact Top Bar (Title + Search Controls + Radius Pills) -->
      <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200/80 mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h1 class="text-xl sm:text-2xl font-black text-[#231F20] tracking-tight flex items-center gap-2">
              <span class="w-8 h-8 rounded-xl bg-emerald-100 text-[#00A651] flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </span>
              <span>Find a Shop & Dealer Directory</span>
            </h1>
          </div>
        </div>

        <!-- Search & Control Box -->
        <form onsubmit="handleShopSearch(event)" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div class="relative flex-1">
            <svg class="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              type="text"
              id="shop-search-input"
              placeholder="Search city, town or address (e.g. Colombo, Gampaha, Kandy)..."
              class="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-200 text-sm font-medium focus:outline-none focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/20 text-[#231F20]"
            />
          </div>

          <div class="grid grid-cols-2 sm:flex sm:items-center gap-2">
            <button
              type="button"
              id="btn-locate-me"
              onclick="locateUserPosition()"
              class="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#EBF8F2] hover:bg-emerald-100 text-[#074626] font-bold text-xs sm:text-sm transition-all border border-emerald-300 shadow-xs active:scale-95 cursor-pointer"
              title="Detect current location via GPS or network"
            >
              <svg id="locate-icon" class="w-4 h-4 text-[#00A651] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
              <span id="locate-text">Locate Me</span>
            </button>

            <button
              type="submit"
              class="inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#00A651]/25 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        <!-- Radius Selector Pills & Status -->
        <div class="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div class="flex items-center gap-1.5 text-gray-500 font-medium shrink-0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            <span>Search Radius:</span>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none" id="radius-buttons-container">
            <button onclick="setShopRadius(5)" class="radius-btn shrink-0 px-3.5 py-2 rounded-xl font-bold transition-all text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95" data-radius="5">5 km</button>
            <button onclick="setShopRadius(10)" class="radius-btn shrink-0 px-3.5 py-2 rounded-xl font-bold transition-all text-xs bg-[#00A651] text-white shadow-sm active:scale-95" data-radius="10">10 km</button>
            <button onclick="setShopRadius(20)" class="radius-btn shrink-0 px-3.5 py-2 rounded-xl font-bold transition-all text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95" data-radius="20">20 km</button>
            <button onclick="setShopRadius(null)" class="radius-btn shrink-0 px-3.5 py-2 rounded-xl font-bold transition-all text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95" data-radius="null">All Island</button>
          </div>
        </div>

        <!-- Feedback / Status -->
        <div id="shop-location-status" class="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#074626] font-medium hidden"></div>
        <div id="shop-location-error" class="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs hidden"></div>
      </div>

      <!-- Mobile & Tablet View Segmented Switcher (Visible on < lg screens) -->
      <div class="lg:hidden flex items-center p-1 bg-gray-200/80 rounded-2xl mb-5 shadow-xs border border-gray-200 max-w-md mx-auto">
        <button
          type="button"
          id="mobile-tab-list-btn"
          onclick="setMobileShopsView('list')"
          class="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all bg-[#00A651] text-white shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
          <span>List View (<span id="mobile-tab-count">0</span>)</span>
        </button>
        <button
          type="button"
          id="mobile-tab-map-btn"
          onclick="setMobileShopsView('map')"
          class="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-gray-600 hover:text-gray-900"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          <span>Map View</span>
        </button>
      </div>

      <!-- Main Content: Split Shops List & Mapbox Map -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <!-- Left: List of Stores (5 cols on desktop; toggled on mobile/tablet) -->
        <div id="shops-list-column" class="block lg:block lg:col-span-5 space-y-4">
          <div class="pb-2 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-extrabold text-[#231F20]">Available Shops</h2>
              <p id="shops-count-label" class="text-xs text-gray-500 mt-0.5">Showing authorized locations</p>
            </div>
            <button
              type="button"
              onclick="setMobileShopsView('map')"
              class="lg:hidden text-xs font-bold text-[#00A651] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              <span>View Map</span>
            </button>
          </div>

          <!-- Shops List Container -->
          <div id="shops-cards-list" class="space-y-3.5 max-h-[750px] overflow-y-auto pr-1"></div>
        </div>

        <!-- Right: Mapbox Map Container (7 cols on desktop; toggled on mobile/tablet) -->
        <div id="shops-map-column" class="hidden lg:block lg:col-span-7 sticky top-24">
          <div class="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 relative">
            <!-- Mobile Quick Return to List Button (Floating inside map) -->
            <button
              type="button"
              onclick="setMobileShopsView('list')"
              class="lg:hidden absolute top-5 left-5 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-gray-200 text-xs font-bold text-gray-800 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <svg class="w-3.5 h-3.5 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              <span>Back to List</span>
            </button>

            <div id="mapbox-shops-map" class="w-full h-[420px] sm:h-[520px] md:h-[580px] lg:h-[720px] rounded-xl sm:rounded-2xl bg-gray-100 overflow-hidden relative">
              <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-50">
                <svg class="w-10 h-10 text-[#00A651] animate-pulse mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                <span class="text-sm font-bold text-[#231F20]">Connecting to Mapbox...</span>
                <span class="text-xs text-gray-400 mt-1 max-w-xs">Initializing real-time interactive dealer coordinates.</span>
              </div>
            </div>

            <!-- Map Floating Legend -->
            <div id="legend-user-dot" class="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-lg border border-gray-200 text-xs hidden items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              <span class="font-semibold text-gray-700">Your Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Modal -->
  <div id="product-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
      <div class="p-6 border-b border-gray-100 flex items-start justify-between bg-[#EBF8F2]">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span id="modal-brand-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-[#00A651] text-white">BRAND</span>
            <span id="modal-division-badge" class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">Division</span>
          </div>
          <h3 id="modal-title" class="text-2xl font-bold tracking-tight text-[#231F20] dark:text-white">Product Name</h3>
        </div>
        <button onclick="closeProductModal()" class="p-2 rounded-full text-gray-400 hover:text-[#231F20] hover:bg-gray-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="p-6 space-y-6">
        <div>
          <h4 class="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-2">Description</h4>
          <p id="modal-desc" class="text-[#231F20] text-sm leading-relaxed"></p>
        </div>

        <!-- Modal Shades Box (for Wood Stains) -->
        <div id="modal-shades-box" class="hidden p-4 rounded-2xl bg-amber-50/90 border border-amber-200">
          <div class="flex items-center justify-between gap-1 mb-2.5">
            <h4 class="text-xs uppercase font-extrabold tracking-wider text-amber-900 flex items-center gap-1.5">
              Available colors
            </h4>
            <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">11 Hues</span>
          </div>
          <div id="modal-shades-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-2"></div>
        </div>

        <!-- Modal Colors Box (e.g. for Wood Putty) -->
        <div id="modal-colors-box" class="hidden p-4 rounded-2xl bg-amber-50/90 border border-amber-200">
          <div class="flex items-center justify-between gap-1 mb-2.5">
            <h4 class="text-xs uppercase font-extrabold tracking-wider text-amber-900 flex items-center gap-1.5">
              Available colors
            </h4>
            <span id="modal-colors-badge" class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">5 Colors</span>
          </div>
          <div id="modal-colors-grid" class="grid grid-cols-2 sm:grid-cols-3 gap-2"></div>
          <p id="modal-colors-note" class="hidden mt-2 text-[10px] italic text-amber-900/80"></p>
        </div>

        <!-- Modal Finishes Box (e.g. for Top Coat) -->
        <div id="modal-finishes-box" class="hidden p-4 rounded-2xl bg-amber-50/90 border border-amber-200">
          <div class="flex items-center justify-between gap-1 mb-2.5">
            <h4 class="text-xs uppercase font-extrabold tracking-wider text-amber-900 flex items-center gap-1.5">
              Available finishes
            </h4>
            <span id="modal-finishes-badge" class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">3 Finishes</span>
          </div>
          <div id="modal-finishes-grid" class="flex flex-wrap gap-2"></div>
        </div>

        <!-- Modal Sizes Box -->
        <div id="modal-sizes-box" class="hidden p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200">
          <div class="flex items-center justify-between gap-1 mb-2.5">
            <h4 class="text-xs uppercase font-extrabold tracking-wider text-emerald-900 flex items-center gap-1.5">
              Available sizes
            </h4>
            <span id="modal-sizes-badge" class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950">Packs</span>
          </div>
          <div id="modal-sizes-grid" class="flex flex-wrap gap-2"></div>
        </div>

        <div>
          <h4 class="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-2">Key Features & Technical Merits</h4>
          <ul id="modal-features" class="space-y-2 text-sm text-gray-700"></ul>
        </div>

        <div id="modal-tutorial-box" class="hidden p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-600/30">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </div>
            <div>
              <h4 class="font-bold text-xs text-[#231F20] dark:text-white">Applying Tutorial</h4>
              <p class="text-[11px] text-gray-500 dark:text-slate-300">Official video guide on YouTube</p>
            </div>
          </div>
          <a id="modal-tutorial-link" href="#" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow transition-all flex items-center gap-1">
            <span>Watch Video</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
        <button onclick="closeProductModal()" class="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-200/70 transition-colors">Close</button>
        <button id="modal-calc-btn" onclick="closeProductModal(); navigateTo('calculator');" class="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#00A651] hover:bg-[#008F45] transition-colors shadow-md">Calculate Coverage</button>
        <button id="modal-inquire-btn" onclick="closeProductModal(); navigateTo('contact');" class="hidden px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#00A651] hover:bg-[#008F45] transition-colors shadow-md">Request Quote</button>
      </div>
    </div>
  </div>

  <!-- Footer with Balanced Responsive Logo -->
  <footer class="bg-[#231F20] text-gray-300 text-sm border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <!-- Brand with Balanced Logo -->
        <div class="sm:col-span-2 space-y-4">
          <div class="bg-white px-3 py-2 rounded-xl inline-flex shadow-sm border border-white/20">
            <img
              src="https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/Logo.png"
              onerror="this.onerror=null; this.src='assests/Logo.png'"
              alt="JADE Coatings Logo"
              class="h-11 sm:h-13 w-auto object-contain"
            />
          </div>
          <p class="text-xs text-gray-400 max-w-sm leading-relaxed">
            A brand of Colour Max Lanka Pvt Ltd. Pioneers in water-based, eco-friendly coating technology in Sri Lanka since 2015.
          </p>
          <p class="text-xs text-[#00A651] font-semibold">
            &ldquo;The Correct Touch&rdquo; · &ldquo;Coatings that brings out the best&rdquo;
          </p>

          <!-- Social Media Links -->
          <div class="pt-2">
            <span class="text-[11px] uppercase font-bold tracking-wider text-emerald-400 block mb-2.5">Connect With Us</span>
            <div class="flex items-center gap-2.5">
              <!-- Facebook -->
              <a
                href="https://www.facebook.com/profile.php?id=100091035491653&sk=directory_contact_info"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="JADE Coatings on Facebook"
                title="Facebook"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <!-- Instagram -->
              <a
                href="https://www.instagram.com/jadecoatings.lk/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="JADE Coatings on Instagram"
                title="Instagram"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <!-- TikTok -->
              <a
                href="https://www.tiktok.com/@jadecoatings?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-black hover:border hover:border-white/40 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="JADE Coatings on TikTok"
                title="TikTok"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.87-4.48V8.71a8.21 8.21 0 0 0 4.9 1.6V6.86a4.86 4.86 0 0 1-1-.17z"/>
                </svg>
              </a>
              <!-- YouTube -->
              <a
                href="https://youtube.com/@jadecoatings?si=Tx74PvG4brcIrWkf"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="JADE Coatings on YouTube"
                title="YouTube"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <!-- LinkedIn -->
              <a
                href="https://www.linkedin.com/company/jade-coatings/posts/"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#0A66C2] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="JADE Coatings on LinkedIn"
                title="LinkedIn"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <!-- WhatsApp -->
              <a
                href="https://wa.me/94773774340"
                target="_blank"
                rel="noopener noreferrer"
                class="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Text JADE Coatings on WhatsApp"
                title="WhatsApp: 077 377 4340"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Navigation</h4>
          <ul class="space-y-2.5 text-xs">
            <li><button onclick="navigateTo('home')" class="hover:text-[#00A651] transition-colors">Home</button></li>
            <li><button onclick="navigateTo('about')" class="hover:text-[#00A651] transition-colors">About Us</button></li>
            <li><button onclick="navigateTo('products')" class="hover:text-[#00A651] transition-colors">Products</button></li>
            <li><button onclick="navigateTo('projects')" class="hover:text-[#00A651] transition-colors">Project & Clients</button></li>
            <li><button onclick="navigateTo('contact')" class="hover:text-[#00A651] transition-colors">Contact Us</button></li>
            <li><button onclick="navigateTo('shops')" class="hover:text-[#00A651] transition-colors font-medium">Find a Shop</button></li>
            <li><button onclick="navigateTo('calculator')" class="hover:text-[#00A651] transition-colors font-semibold text-emerald-400">Coverage Calculator</button></li>
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Office Contacts</h4>
          <div class="space-y-2 text-xs text-gray-400">
            <p class="text-white font-medium">424/1/B, Kottunna Rd, Biyagama, LK</p>
            <p>Hotline: <a href="tel:+94773774340" class="text-white font-semibold hover:text-[#00A651]">077 377 4340</a></p>
            <p>Direct: <a href="tel:+94112872591" class="hover:text-white">011 287 2591</a></p>
            <a href="https://wa.me/94773774340" target="_blank" rel="noopener noreferrer" class="text-[#25D366] font-bold hover:underline block flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>WhatsApp: 077 377 4340 (Chat right away)</span>
            </a>
            <a href="mailto:info@colourmax.lk" class="text-gray-300 hover:text-[#00A651] transition-colors block">
              info@colourmax.lk
            </a>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>© 2015–2026 JADE Coatings (Colour Max Lanka Pvt Ltd). All Rights Reserved.</p>
        <p class="flex items-center gap-1.5 text-xs text-emerald-400">
          <span class="w-2 h-2 rounded-full bg-[#00A651]"></span>
          <span>Official Water-Based Eco Coating Solutions</span>
        </p>
      </div>
    </div>
  </footer>

  <script>
    // ASSET CDN HELPER FOR RELIABLE CLOUD DELIVERY
    const ASSETS_BASE = "https://officialumeshmabatuwana27-commits.github.io/jade-website/assests/";
    function getAssetUrl(filename) {
      if (!filename) return '';
      if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
      return ASSETS_BASE + encodeURIComponent(filename.trim());
    }

    // 1. PRODUCTS REPOSITORY WITH BEFORE/AFTER PROFILES
    const PRODUCTS = [
      // DIVISION 1: DOMESTIC
      { 
        id: 1, 
        division: "Domestic", 
        brand: "WOODSHIELD", 
        name: "Wood Putty", 
        desc: "This premium, water-based, and eco-friendly wood filler is expertly formulated to repair minor imperfections on both interior and exterior wooden surfaces, including nail holes, dents, scratches, and damaged edges. It is specifically designed for application prior to using sanding sealers and wood stains.\n\nIdeal for a variety of woodwork, including doors, windows, furniture, MDF, and plywood.", 
        features: [
          "Superior Adhesion: Bonds securely to the wood surface.",
          "Exceptional Durability: Highly resistant to shrinking, cracking, or withdrawal.",
          "Effortless Sandability: Sands easily to achieve a smooth, flawless finish.",
          "Excellent Filling Capacity: Provides deep, flexible coverage for all imperfections.",
          "Fungal Resistance: Formulated to actively prevent mold and fungal growth."
        ],
        colors: [
          { name: "Jak Wood", color: "#D38837", desc: "Golden honey timber" },
          { name: "Burma Teak", color: "#8E4D1E", desc: "Warm golden brown" },
          { name: "Mahogony", color: "#732D24", desc: "Rich reddish mahogany" },
          { name: "Walnut", color: "#63442C", desc: "Deep roasted walnut" },
          { name: "White", color: "#FFFFFF", desc: "Clean base & primed timber" }
        ],
        sizes: ["250g", "500g", "1kg"],
        specs: {
          "Available Colors": "Jak Wood, Burma Teak, Mahogony, Walnut, White",
          "Available Sizes": "250g, 500g, 1kg",
          "Ideal Substrates": "Doors, windows, furniture, MDF, and plywood",
          "Application": "Prior to using sanding sealers and wood stains"
        },
        beforeLabel: "Blemished Raw Timber",
        afterLabel: "Filled & Sanded Smooth",
        beforeColor: "from-amber-900/60 to-yellow-900/80",
        afterColor: "from-amber-700 to-amber-600",
        beforeImage: "JADE woodshield wood putty before.png",
        afterImage: "JADE woodshield wood putty after.png",
        image: "JADE woodshield wood putty after.png"
      },
      { 
        id: 2, 
        division: "Domestic", 
        brand: "WOODSHIELD", 
        name: "Wood Stains", 
        desc: "This high-performance, eco-friendly, and water-based wood stain is expertly formulated to enhance and protect both interior and exterior wooden surfaces. It serves as the perfect foundational layer, specifically designed for application prior to your final topcoat.\n\nIdeal for a diverse range of woodwork, including doors, windows, furniture, and plywood.", 
        features: [
          "Effortless Application: A user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Optimum Durability & UV Protection: Delivers exceptional, long-lasting resilience while shielding the wood from harmful ultraviolet rays.",
          "Superior Water Resistance: Forms a robust protective barrier against moisture and environmental weathering.",
          "Blue Fungi Resistance: Actively prevents the growth of blue stain fungi and mold, preserving the wood's natural integrity.",
          "Advanced Block Resistance: Prevents coated or stained surfaces from sticking together upon contact (such as doors in frames).",
          "Exceptional Color Retention: Maintains deep, vibrant, and fade-resistant hues over time."
        ],
        shades: [
          { name: "Natural", color: "#E5B27A", desc: "Warm birch & pine tone" },
          { name: "Jak Wood", color: "#D38837", desc: "Golden jackfruit timber" },
          { name: "Larch Teak", color: "#B7682C", desc: "Warm reddish copper teak" },
          { name: "Burma Teak", color: "#8E4D1E", desc: "Classic golden brown teak" },
          { name: "Mahogony", color: "#732D24", desc: "Deep rich reddish mahogany" },
          { name: "Dark Teak", color: "#5C361B", desc: "Deep chocolate dark teak" },
          { name: "Walnut", color: "#63442C", desc: "Warm roasted earthy walnut" },
          { name: "Black", color: "#1E1E1E", desc: "Deep satin ebony black" },
          { name: "Green", color: "#2C5530", desc: "Heritage forest timber green" },
          { name: "Red", color: "#9E2A2B", desc: "Colonial rich ruby redwood" },
          { name: "Dark Walnut", color: "#382115", desc: "Intense dark roast espresso" }
        ],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Shades": "Natural, Jak Wood, Larch Teak, Burma Teak, Mahogony, Dark Teak, Walnut, Black, Green, Red, Dark Walnut",
          "Available Sizes": "0.5L, 1L, 4L",
          "Formula": "High-performance, eco-friendly, and water-based",
          "Ideal Substrates": "Doors, windows, furniture, and plywood",
          "Application": "Foundational layer prior to your final topcoat",
          "Coverage": "~12 sq.m / Liter"
        },
        beforeLabel: "Pale Dry Raw Wood",
        afterLabel: "Rich Stained Lustre",
        beforeColor: "from-stone-600/70 to-stone-500/80",
        afterColor: "from-amber-800 to-amber-950",
        beforeImage: "JADE Woodshield stain before.png",
        afterImage: "JADE Woodshield stain after.png",
        image: "JADE Woodshield stain after.png"
      },
      { 
        id: 3, 
        division: "Domestic", 
        brand: "WOODSHIELD", 
        name: "Sanding Sealer", 
        desc: "This premium, water-based, and eco-friendly sealer is expertly formulated for all types of interior and exterior wooden surfaces. It is specifically designed to be applied directly onto well-prepared bare wood or seamlessly layered over interior and exterior wood stains.\n\nIdeal for protecting and preparing wooden doors, windows, furniture, MDF, plywood, and wooden brush handles.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula for a flawlessly smooth application.",
          "Optimal Filling Capacity: Penetrates deeply to provide superior grain filling and surface preparation.",
          "Fungal Resistance: Actively prevents mold and fungal growth, ensuring the long-term integrity of the wood.",
          "Effortless Sandability: Sands quickly and easily to create a perfectly smooth foundation for final topcoats.",
          "Exceptional Sealing: Delivers an outstanding protective seal, resulting in an exquisitely fine finish."
        ],
        colors: [
          { name: "Clear", color: "#F8FAF8", desc: "Translucent crystal-clear protective base" }
        ],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Clear",
          "Available Sizes": "0.5L, 1L, 4L",
          "Formula": "Premium water-based & eco-friendly sealer",
          "Ideal Substrates": "Wooden doors, windows, furniture, MDF, plywood, and wooden brush handles",
          "Application": "Directly onto bare wood or layered over wood stains prior to final topcoats"
        },
        beforeLabel: "Porous Open Grain",
        afterLabel: "Glass-Sealed Foundation",
        beforeColor: "from-stone-700/80 to-amber-950/70",
        afterColor: "from-amber-600 to-amber-800",
        beforeImage: "JADE woodshield sanding sealer before.png",
        afterImage: "JADE woodshield sanding sealer after.png",
        image: "JADE woodshield sanding sealer after.png"
      },
      { 
        id: 4, 
        division: "Domestic", 
        brand: "WOODSHIELD", 
        name: "Top Coat", 
        desc: "This high-performance, water-based, and eco-friendly clear coating is expertly formulated to protect and enhance both interior and exterior wooden surfaces. It is specifically designed to be applied over Woodshield stains, serving as a premium protective topcoat that beautifully complements our wide selection of popular colors.\n\nIdeal for preserving and beautifying wooden doors, windows, and furniture.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Optimum Durability: Delivers exceptional, long-lasting resilience with advanced water and UV protection to withstand the elements.",
          "Color Preservation & Fungal Resistance: Protects the vibrancy of underlying stains from fading while actively preventing mold and fungal growth.",
          "Superior Chemical Resistance: Forms a robust protective barrier against everyday wear, offering excellent resistance to most common household chemicals and spills."
        ],
        colors: [
          { name: "Clear", color: "#FFFFFF", desc: "Crystal-clear high-protection shield (Clear Only)" }
        ],
        finishes: ["Gloss", "Matt", "Semi Gloss"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Clear (Clear Only)",
          "Available Finishes": "Gloss, Matt, Semi Gloss",
          "Available Sizes": "0.5L, 1L, 4L",
          "Formula": "High-performance, water-based, and eco-friendly clear coating",
          "Ideal Substrates": "Wooden doors, windows, and furniture",
          "Application": "Applied over Woodshield stains as a premium protective topcoat"
        },
        beforeLabel: "Unprotected Wood",
        afterLabel: "High-Clarity Top Shield",
        beforeColor: "from-amber-950/70 to-stone-800/80",
        afterColor: "from-amber-500 to-amber-700",
        beforeImage: "JADE woodshield top coat before.png",
        afterImage: "JADE woodshield top coat After.png",
        image: "JADE woodshield top coat After.png"
      },
      { 
        id: 5, 
        division: "Domestic", 
        brand: "WOODSHIELD", 
        name: "All in One", 
        desc: "This high-performance, water-based, and eco-friendly color coating is expertly formulated to elevate and protect both interior and exterior wooden surfaces. Engineered as an innovative 3-in-1 solution, it seamlessly functions as a base, stain, and topcoat in a single application. Remarkably versatile, it can be applied directly over previously treated NC (Nitrocellulose), PU (Polyurethane), and Alkyd finishes, eliminating the need for laborious scraping or sanding down to bare wood.\n\nIdeal for enhancing and protecting wooden doors, windows, ceilings, furniture, MDF, plywood, and timber decks.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Optimum Durability & Protection: Delivers exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions.",
          "Exceptional Color Retention & Block Resistance: Maintains vibrant, fade-resistant hues over time while preventing coated surfaces from sticking together upon contact.",
          "Comprehensive Fungal Defense: Actively prevents the growth of mold, mildew, and blue stain fungi, preserving the wood's natural integrity.",
          "Superior Chemical Resistance: Forms a robust protective barrier against everyday wear and most common household chemicals or spills.",
          "Ultimate Surface Versatility: Designed for direct, hassle-free application over existing NC, PU, and Alkyd-based paints without the need for intensive surface stripping."
        ],
        colors: [
          { name: "Jak Wood", color: "#D38837", desc: "Golden jackfruit timber" },
          { name: "Larch Teak", color: "#B7682C", desc: "Warm reddish copper teak" },
          { name: "Burma Teak", color: "#8E4D1E", desc: "Classic golden brown teak" },
          { name: "Mahogony", color: "#732D24", desc: "Deep rich reddish mahogany" },
          { name: "Dark Teak", color: "#5C361B", desc: "Deep chocolate dark teak" },
          { name: "Walnut", color: "#63442C", desc: "Warm roasted earthy walnut" },
          { name: "Black", color: "#1E1E1E", desc: "Deep satin ebony black" },
          { name: "Dark Mahogony", color: "#4A1E17", desc: "Rich roasted deep mahogany" },
          { name: "Dark Walnut", color: "#382115", desc: "Intense dark roast espresso" }
        ],
        finishes: ["Semi Gloss"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Colors": "Jak Wood, Larch Teak, Burma Teak, Mahogony, Dark Teak, Walnut, Black, Dark Mahogony, Dark Walnut (9 Colors)",
          "Available Finish": "Semi Gloss",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Wooden doors, windows, ceilings, furniture, MDF, plywood, and timber decks",
          "Surface Versatility": "Direct application over existing NC, PU, and Alkyd finishes without stripping",
          "Formula": "Innovative 3-in-1 water-based, eco-friendly color coating (base + stain + topcoat)"
        },
        beforeLabel: "Weathered Raw Wood",
        afterLabel: "Woodshield All in One",
        beforeColor: "from-stone-600 to-stone-700",
        afterColor: "from-amber-800 to-amber-900",
        beforeImage: "JADE woodshield all in one before.png",
        afterImage: "JADE woodshield all in one after.png",
        image: "JADE woodshield all in one after.png",
        tutorialUrl: "https://youtu.be/p5zWiq1RJk8?si=l--sZVHhkiyW4KRE"
      },
      { 
        id: 7, 
        division: "Domestic", 
        brand: "WOODSHIELD", 
        name: "Floor Coat", 
        desc: "This eco-friendly, water-borne, and highly durable decorative coating is expertly engineered to protect and enhance both interior and exterior timber floors.\n\nIdeal for wooden floors, timber decks, and high-traffic areas.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Superior Adhesion & Resilience: Bonds securely to the wood, providing a tough, hard-wearing protective layer specifically designed to withstand heavy foot traffic.",
          "Optimum Durability: Delivers outstanding longevity with advanced water and dirt resistance, keeping your floors looking pristine.",
          "Exceptional Scratch & Abrasion Resistance: Shields against daily wear and tear, effectively minimizing scuffs, scratches, and impact damage.",
          "Superior Chemical Resistance: Forms a robust protective barrier against everyday spills and most common household chemicals.",
          "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a hygienic and enduring surface."
        ],
        colors: [
          { name: "Clear", color: "#FFFFFF", desc: "Crystal-clear high-traffic floor shield" }
        ],
        finishes: ["Semi Gloss"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Clear (Clear Only)",
          "Available Finish": "Semi Gloss (Semi Gloss Only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Wooden floors, timber decks, and high-traffic areas",
          "Formula": "Eco-friendly, water-borne, and highly durable decorative coating",
          "Key Benefits": "Self-leveling, heavy foot-traffic resilience, scratch & abrasion resistance, algal & fungal protection"
        },
        beforeLabel: "Scuffed Living Timber",
        afterLabel: "Satin Abrasion Armor",
        beforeColor: "from-stone-800 to-stone-600",
        afterColor: "from-amber-700 to-amber-900",
        beforeImage: "JADE woodshield top coat before.png",
        afterImage: "JADE woodshield top coat After.png",
        image: "JADE woodshield top coat After.png"
      },
      
      // MASOGUARD - Domestic
      { 
        id: 8, 
        division: "Domestic", 
        brand: "MASOGUARD", 
        name: "Wet Look Paving Sealer", 
        desc: "This premium, water-based, and eco-friendly clear sealer is expertly engineered to provide hard-wearing protection, effectively repelling moisture and water from both horizontal and vertical surfaces, indoors and outdoors.\n\nIdeal for interlocking bricks, cement pavers, natural stones, clay tiles, and most unglazed surfaces, including slate, terracotta, ceramic, marble, and tile grout.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Optimum Durability: Delivers exceptional, long-lasting resilience with advanced water and UV protection to withstand harsh environmental conditions.",
          "Exceptional Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring surface.",
          "Superior Chemical & Alkali Resistance: Forms a robust protective barrier against common household chemicals, spills, and harsh alkaline environments.",
          "Hot Tire Mark Resistance: Specially formulated to withstand vehicular traffic and effectively resist hot tire pick-up, making it perfect for driveways and garages.",
          "Self-Cleaning Technology: Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time."
        ],
        colors: [
          { name: "Clear", color: "#FFFFFF", desc: "Crystal-clear high-penetration sealer" }
        ],
        finishes: ["Wet Finish"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Clear (Clear Only)",
          "Available Finish": "Wet Finish (Wet Finish Only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Interlocking bricks, cement pavers, natural stones, clay tiles, slate, terracotta, ceramic, marble, and tile grout",
          "Formula": "Premium water-based & eco-friendly clear sealer",
          "Key Benefits": "Self-leveling, hot tire mark resistance, self-cleaning tech, algal/fungal defense, superior chemical & alkali resistance"
        },
        beforeLabel: "Chalky Dull Pavers",
        afterLabel: "Permanent Wet-Look Gloss",
        beforeColor: "from-zinc-500 to-stone-400",
        afterColor: "from-stone-800 to-emerald-950",
        beforeImage: "Wet Look Paving Sealer Before.png",
        afterImage: "Wet Look Paving Sealer After.png",
        image: "Wet Look Paving Sealer After.png"
      },
      { 
        id: 9, 
        division: "Domestic", 
        brand: "MASOGUARD", 
        name: "Primer", 
        desc: "This premium, water-based, and eco-friendly pigmented primer is expertly formulated for all types of interior and exterior masonry surfaces.\n\nIdeal for clay tiles, interlocking bricks, cement, cellulose fiber boards, and general masonry applications.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Superior Surface Preparation: Delivers optimal filling, sealing, and priming properties to create the perfect foundational layer for subsequent topcoats.",
          "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.",
          "Optimum Durability & Protection: Provides exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions."
        ],
        colors: [
          { name: "Grey", color: "#8B959E", desc: "Foundational opaque pigmented grey masonry primer (Grey Only)" }
        ],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Grey (Grey Only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Clay tiles, interlocking bricks, cement, cellulose fiber boards, and general masonry applications",
          "Formula": "Premium water-based & eco-friendly pigmented primer",
          "Key Benefits": "Effortless application, superior surface preparation, algal & fungal resistance, optimum durability & protection"
        },
        beforeLabel: "Unfinished Plaster Wall",
        afterLabel: "Masoguard Primer Sealed",
        beforeColor: "from-zinc-400 to-stone-300",
        afterColor: "from-emerald-800 to-[#074626]",
        beforeImage: "Masoguard Primer Before.png",
        afterImage: "Masoguard Primer After.png",
        image: "Masoguard Primer After.png"
      },
      { 
        id: 10, 
        division: "Domestic", 
        brand: "MASOGUARD", 
        name: "All in One", 
        desc: "This high-performance, water-based, and eco-friendly color coating is expertly formulated to create a stunning, authentic timber effect on both interior and exterior masonry surfaces. It is specifically designed for seamless application over Masoguard Primer.\n\nIdeal for transforming cement, concrete, general masonry surfaces, plasterboards, and cement or cellulose fiber boards.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Optimum Durability & Protection: Delivers exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions.",
          "Exceptional Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.",
          "Outstanding Color Retention & Salt Spray Resistance: Maintains deep, vibrant hues over time while offering robust protection against harsh coastal or saline environments.",
          "Superior Chemical Resistance: Forms a durable protective barrier against everyday wear, spills, and most common household chemicals.",
          "Self-Cleaning Technology: Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time."
        ],
        colors: [
          { name: "Larch Teak", color: "#B7682C", desc: "Warm reddish copper teak" },
          { name: "Burma Teak", color: "#8E4D1E", desc: "Classic golden brown teak" },
          { name: "Mahogony", color: "#732D24", desc: "Rich reddish mahogany" },
          { name: "Dark Teak", color: "#5C361B", desc: "Deep chocolate dark teak" },
          { name: "Walnut", color: "#63442C", desc: "Warm roasted earthy walnut" },
          { name: "Titanium", color: "#7D848C", desc: "Modern architectural titanium grey" }
        ],
        finishes: ["Semi Gloss"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Colors": "Larch Teak, Burma Teak, Mahogony, Dark Teak, Walnut, Titanium (6 Colors)",
          "Available Finish": "Semi Gloss (Semi Gloss Only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Cement, concrete, general masonry surfaces, plasterboards, and cement or cellulose fiber boards",
          "Application Timing": "Applied seamlessly over Masoguard Primer for authentic timber effect",
          "Formula": "High-performance, water-based, and eco-friendly timber-effect color coating",
          "Key Benefits": "Self-leveling, salt spray & UV protection, self-cleaning tech, algal/fungal defense, superior chemical resistance"
        },
        beforeLabel: "Weathered Cracked Substrate",
        afterLabel: "Masoguard All in One Shield",
        beforeColor: "from-stone-500 to-zinc-400",
        afterColor: "from-[#00A651] to-[#074626]",
        beforeImage: "Masoguard All in one Before.png",
        afterImage: "After Masoguard All in one After.png",
        image: "After Masoguard All in one After.png"
      },
      { 
        id: 11, 
        division: "Domestic", 
        brand: "MASOGUARD", 
        name: "Top Coat", 
        desc: "This high-performance, water-based, and eco-friendly clear coating is expertly formulated to protect and enhance both interior and exterior concrete and masonry surfaces. It is specifically designed to be applied as a premium protective topcoat over Masoguard All in One, beautifully complementing our wide selection of popular colors.\n\nIdeal for preserving and elevating cement, concrete, general masonry surfaces, and plasterboards.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Optimum Durability & Protection: Delivers exceptional, long-lasting resilience with advanced water and UV resistance to withstand harsh environmental conditions.",
          "Exceptional Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, preserving the integrity and cleanliness of the surface.",
          "Outstanding Color Preservation & Salt Spray Resistance: Protects the vibrancy of underlying colors from fading while offering robust defense against harsh coastal or saline environments.",
          "Superior Chemical Resistance: Forms a durable protective barrier against everyday wear, spills, and most common household chemicals.",
          "Self-Cleaning Technology: Engineered with advanced dirt pick-up resistance, allowing the surface to naturally shed grime and maintain a pristine appearance over time."
        ],
        colors: [
          { name: "Clear", color: "#FFFFFF", desc: "Crystal-clear high-protection masonry topcoat (Clear Only)" }
        ],
        finishes: ["Semi Gloss"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Clear (Clear Only)",
          "Available Finish": "Semi Gloss (Semi Gloss Only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Cement, concrete, general masonry surfaces, and plasterboards",
          "Application": "Specifically designed to be applied as a premium protective topcoat over Masoguard All in One",
          "Formula": "High-performance, water-based, and eco-friendly clear coating",
          "Key Benefits": "Self-leveling, UV & salt spray defense, self-cleaning tech, algal/fungal resistance, superior chemical resistance"
        },
        beforeLabel: "Matte Unsealed Surface",
        afterLabel: "Protective Gloss Top Coat",
        beforeColor: "from-stone-400 to-zinc-300",
        afterColor: "from-[#00A651] to-emerald-700",
        beforeImage: "Masoguard top coat before.png",
        afterImage: "Masoguard top coat after.png",
        image: "Masoguard top coat after.png"
      },
      
      // ECO-CLEANER - Domestic
      { 
        id: 13, 
        division: "Domestic", 
        brand: "ECO-CLEANER", 
        name: "Universal Cleaner", 
        desc: "This eco-friendly, 3-in-1 aqueous solution is expertly formulated to clean, condition, and prepare a diverse range of substrates—including metal, masonry, rubber, and wood—for flawless paint application.", 
        features: [
          "Comprehensive Masonry Restoration: Effectively eradicates algae, fungi, and embedded dirt from all masonry surfaces, ensuring a pristine and hygienic foundation.",
          "Advanced Metal Degreasing & Derusting: Powerfully strips away stubborn rust, oil, and heavy grease from metal substrates, promoting a clean and receptive profile.",
          "Superior Substrate Conditioning: Acts as an advanced surface conditioner, significantly enhancing the adhesion, durability, and longevity of subsequent water-based or solvent-based paint coatings on both metal and masonry."
        ],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Metal, masonry, rubber, and wood",
          "Formula": "Eco-friendly, 3-in-1 aqueous cleaning and conditioning solution",
          "Key Benefits": "Masonry restoration, metal degreasing & derusting, superior substrate conditioning for subsequent water-based or solvent-based paint coatings"
        },
        beforeLabel: "Greasy Soot Build-Up",
        afterLabel: "100% Cleaned Residue-Free",
        beforeColor: "from-zinc-700 to-stone-800",
        afterColor: "from-emerald-500 to-[#00A651]",
        beforeImage: "universal cleaner before.png",
        afterImage: "universal cleaner after.png",
        image: "universal cleaner after.png"
      },
      
      // DECORATIVES - Domestic (NEW)
      { 
        id: 15, 
        division: "Domestic", 
        brand: "DECORATIVES", 
        name: "JADE Easy Floor", 
        desc: "This premium, water-based, and eco-friendly formulation delivers exceptional sealing and priming properties, creating the perfect foundation for subsequent topcoats.\n\nIdeal for both interior and exterior masonry surfaces.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Superior Adhesion & Resilience: Bonds securely to the substrate, providing a tough, hard-wearing base layer.",
          "Optimum Durability: Delivers outstanding longevity with advanced water and dirt resistance to withstand the elements.",
          "Exceptional Scratch & Abrasion Resistance: Shields against physical wear and tear, effectively minimizing scuffs and surface damage.",
          "Superior Chemical Resistance: Forms a robust protective barrier against environmental exposure and most common household chemicals.",
          "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring finish."
        ],
        colors: [
          { name: "Grey", color: "#8B959E", desc: "Contemporary architectural slate grey" },
          { name: "Red", color: "#B83226", desc: "Classic rich vibrant floor red" },
          { name: "Black", color: "#1E1E1E", desc: "Deep modern protective black" },
          { name: "Green", color: "#2C5E43", desc: "Deep rich resilient exterior green" },
          { name: "Reddish Brown", color: "#7E3524", desc: "Warm earthy terracotta reddish brown" },
          { name: "Titanium", color: "#7D848C", desc: "Sleek industrial titanium tone" }
        ],
        finishes: ["Semi Gloss"],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Colors": "Grey, Red, Black, Green, Reddish Brown, Titanium (6 Colors)",
          "Available Finish": "Semi Gloss (Semi Gloss only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Interior and exterior masonry surfaces",
          "Formula": "Premium, water-based, and eco-friendly sealing & priming formulation",
          "Key Benefits": "Self-leveling, exceptional sealing and priming, superior adhesion, scratch & abrasion resistance, algal & fungal protection"
        },
        beforeLabel: "Damaged Peeling Floor",
        afterLabel: "JADE Easy Floor Finish",
        beforeColor: "from-zinc-500 to-stone-500",
        afterColor: "from-red-700 to-red-800",
        beforeImage: "JADE Easy Floor Before.png",
        afterImage: "JADE Easy Floor After.png",
        image: "JADE Easy Floor After.png"
      },
      { 
        id: 16, 
        division: "Domestic", 
        brand: "DECORATIVES", 
        name: "JADE Roof & WAll Shield", 
        desc: "This self-priming, water-based, and eco-friendly decorative coating is a highly durable solution expertly engineered to protect exterior walls and roofing materials. Formulated for maximum efficiency, it delivers an impressive four times the coverage of standard emulsion paints.\n\nIdeal for masonry walls and a wide variety of roofing materials, including cement, terracotta, clay tiles, and asbestos sheets.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Superior Adhesion & Resilience: Bonds securely to the surface, providing a tough, hard-wearing protective layer designed to withstand the elements.",
          "Optimum Durability: Delivers outstanding longevity with advanced water and dirt resistance, keeping exteriors looking pristine.",
          "Exceptional Scratch & Abrasion Resistance: Shields against physical wear and tear, effectively minimizing scuffs and surface damage.",
          "Superior Chemical Resistance: Forms a robust protective barrier against environmental exposure and most common household chemicals.",
          "Algal & Fungal Resistance: Actively prevents the growth of algae, mold, and mildew, ensuring a clean and enduring finish."
        ],
        colors: [
          { name: "White", color: "#FFFFFF", desc: "Clean bright reflective white" },
          { name: "Tile Red", color: "#B84A39", desc: "Traditional terracotta & clay tile red" },
          { name: "Roof Red", color: "#8B2624", desc: "Rich deep architectural roofing red" },
          { name: "Coffee Brown", color: "#4B3621", desc: "Warm deep roasted coffee brown" },
          { name: "Spruce", color: "#2C5E43", desc: "Rich evergreen forest spruce" }
        ],
        finishes: ["Matt"],
        sizes: ["1L", "4L", "10L"],
        specs: {
          "Available Colors": "White, Tile Red, Roof Red, Coffee Brown, Spruce (5 Colors)",
          "Available Finish": "Matt (Matt Only)",
          "Available Sizes": "1L, 4L, 10L",
          "Ideal Substrates": "Masonry walls, cement, terracotta, clay tiles, and asbestos sheets",
          "Coverage Efficiency": "Delivers up to 4x the coverage of standard emulsion paints",
          "Formula": "Self-priming, water-based, and eco-friendly decorative coating",
          "Key Benefits": "Self-leveling, 4x coverage, self-priming, superior adhesion, scratch & abrasion resistance, algal & fungal protection"
        },
        beforeLabel: "Damp Moldy Wall",
        afterLabel: "JADE Shield Coated",
        beforeColor: "from-stone-700 to-zinc-700",
        afterColor: "from-[#00A651] to-emerald-800",
        beforeImage: "JADE Roof & WAll Shield Before.png",
        afterImage: "JADE Roof & WAll Shield After.png",
        image: "JADE Roof & WAll Shield After.png"
      },

      // DIVISION 2: INDUSTRIAL
      { 
        id: 17, 
        division: "Industrial", 
        brand: "METASHIELD", 
        name: "Anti Corrosive - Black", 
        desc: "This eco-friendly, water-based pigmented coating is expertly engineered to provide superior corrosion resistance for a variety of metal substrates. This innovative, fast-drying formula delivers exceptional adhesion and remarkable hardness. It is meticulously crafted from a specialized blend of premium resins and additives, specifically selected to ensure optimal substrate binding and robust anti-corrosive protection.\n\nIdeal for heavy-duty and decorative applications, including steel structures, metal furniture, vehicle undercarriages, and the steel bands of solid tires.", 
        features: [
          "Effortless Application: Features a user-friendly, self-leveling formula that ensures a flawlessly smooth and even finish.",
          "Exceptional Adhesion & Hardness: Bonds securely to metal surfaces, providing a tough, resilient, and highly durable protective layer.",
          "Superior Inter-Coat Adhesion: Creates an optimal foundation that seamlessly anchors subsequent topcoats for a lasting, professional finish.",
          "Outstanding Corrosion Resistance: Forms a robust barrier against rust and oxidation, significantly extending the lifespan of the metal.",
          "Optimum Weather & UV Protection: Delivers advanced resistance to harsh environmental conditions, weathering, and harmful ultraviolet rays."
        ],
        colors: [
          { name: "Black", color: "#1E1E1E", desc: "Heavy-duty protective black (Black only)" }
        ],
        sizes: ["0.5L", "1L", "4L"],
        specs: {
          "Available Color": "Black (Black only)",
          "Available Sizes": "0.5L, 1L, 4L",
          "Ideal Substrates": "Steel structures, metal furniture, vehicle undercarriages, and steel bands of solid tires",
          "Formula": "Eco-friendly, water-based pigmented anti-corrosive coating",
          "Key Benefits": "Self-leveling, exceptional adhesion & hardness, superior inter-coat adhesion, outstanding corrosion & rust resistance, optimum weather & UV protection"
        },
        beforeLabel: "Rusted Corroded Steel",
        afterLabel: "Jet-Black Inhibited Shield",
        beforeColor: "from-amber-900 to-red-950",
        afterColor: "from-[#231F20] to-black",
        beforeImage: "Anti Corrosive - Black Before.png",
        afterImage: "Anti Corrosive - Black After.png",
        image: "Anti Corrosive - Black After.png"
      },
      { 
        id: 18, 
        division: "Industrial", 
        brand: "TYRESHIELD", 
        name: "Wax Stick (Black)", 
        desc: "This premium, eco-friendly TyreShield Wax Stick is expertly designed to seamlessly repair minor to moderate damage on solid rubber and plastic surfaces. Formulated for ultimate convenience and precision, it serves as the perfect preparatory treatment prior to the application of final topcoats, such as TyreShield All-In-One.\n\nIdeal for: Restoring, filling, and preparing solid rubber tires and plastic substrates to ensure a flawlessly smooth final finish.", 
        features: [
          "Seamless Surface Repair: Expertly formulated to repair minor to moderate damage on solid rubber and plastic surfaces.",
          "Precision Preparatory Treatment: Serves as the perfect foundational treatment prior to applying final topcoats like TyreShield All-In-One.",
          "Restores & Fills Substrates: Fills and conditions solid rubber tires and plastic substrates to guarantee a flawlessly smooth finish.",
          "Eco-Friendly Formulation: Water-borne, eco-friendly compound engineered for clean handling and substrate safety.",
          "Convenient Application: Designed for rapid, hassle-free repair and optimal substrate binding."
        ],
        specs: {
          "Primary Function": "Repair minor to moderate damage on solid rubber and plastic surfaces",
          "Recommended System": "Preparatory treatment prior to TyreShield All-In-One topcoat",
          "Ideal Substrates": "Solid rubber tires and plastic substrates",
          "Formula": "Premium, eco-friendly solid wax repair compound",
          "Key Benefits": "Restores, fills, and prepares substrates for a flawlessly smooth final finish"
        },
        beforeLabel: "Damaged Solid Rubber",
        afterLabel: "Wax Stick Repaired",
        beforeColor: "from-zinc-800 to-stone-900",
        afterColor: "from-black to-[#231F20]",
        beforeImage: "wax stick black before.png",
        afterImage: "wax stick black after.png",
        image: "wax stick black after.png"
      },
      { 
        id: 19, 
        division: "Industrial", 
        brand: "TYRESHIELD", 
        name: "All in One", 
        desc: "This eco-friendly, water-based pigmented coating is expertly formulated to seamlessly mask minor cosmetic touch-ups and buffering repairs on cured tires.\n\nIdeal for restoring and refining the visual appearance of solid and cured rubber tires.", 
        features: [
          "Superior Adhesion & Coverage: Bonds securely to the rubber surface while providing exceptional opacity to flawlessly conceal imperfections.",
          "Outstanding Inter-Coat Adhesion & Durability: Ensures a seamless bond with subsequent layers and delivers long-lasting resilience against harsh outdoor elements.",
          "Versatile Compatibility: Expertly engineered to perform consistently and safely across a diverse range of rubber compounds.",
          "Effortless Application & Cleanup: Features a user-friendly formulation that applies smoothly and cleans up effortlessly with just water."
        ],
        colors: [
          { name: "White", color: "#FFFFFF", desc: "Solid tire white" },
          { name: "Black", color: "#1E1E1E", desc: "Deep rich rubber black" },
          { name: "Grey", color: "#8B959E", desc: "Architectural compound grey" },
          { name: "Beige Light", color: "#EADBB6", desc: "Light warm beige rubber compound tone" },
          { name: "Beige Dark", color: "#C4A86C", desc: "Deep tan beige rubber compound tone" }
        ],
        colorNote: "Color may vary with the type of rubber compound",
        specs: {
          "Available Colors": "White, Black, Grey, Beige Light, Beige Dark (5 Colors - color may vary with the type of rubber compound)",
          "Ideal Substrates": "Solid and cured rubber tires",
          "Formula": "Eco-friendly, water-based pigmented coating",
          "Primary Applications": "Cosmetic touch-ups and buffering repairs on cured tires",
          "Key Benefits": "Superior adhesion & coverage, outstanding inter-coat durability, versatile rubber compound compatibility, effortless water cleanup"
        },
        beforeLabel: "Buffed Damaged Tire",
        afterLabel: "TyreShield Restored",
        beforeColor: "from-zinc-800 to-stone-800",
        afterColor: "from-black to-zinc-900",
        beforeImage: "tyreshield all in one before.png",
        afterImage: "tyreshield all in one after.png",
        image: "tyreshield all in one after.png"
      },
      { 
        id: 20, 
        division: "Industrial", 
        brand: "TYRESHIELD", 
        name: "Bladder Releaser", 
        desc: "This eco-friendly, water-based pigmented coating is expertly formulated for rubber substrates. It is specifically engineered for the precise internal application of green tires (uncured tires) during the manufacturing process.\n\nIdeal for optimizing the molding and curing stages of rubber tire production.", 
        features: [
          "Superior Slip Properties: Significantly reduces internal friction to ensure smooth handling, shaping, and flawless processing.",
          "Outstanding Air Release: Expertly formulated to facilitate the efficient escape of trapped air between the tire and the curing bladder, effectively minimizing manufacturing defects.",
          "Optimal Bladder Release: Ensures a seamless, residue-free separation from the vulcanizing bladder, extending bladder life and maintaining tire integrity.",
          "Effortless Application: Features a user-friendly consistency that guarantees even, efficient, and trouble-free coverage.",
          "Hassle-Free Cleanup: The premium water-based composition allows for quick, effortless equipment cleaning using only water."
        ],
        specs: {
          "Ideal Substrates": "Rubber substrates & green tires (uncured tires)",
          "Formula": "Eco-friendly, water-based pigmented coating",
          "Primary Application": "Internal application during molding and curing stages of rubber tire production",
          "Key Benefits": "Superior slip properties, outstanding air release, optimal bladder release, effortless application, water cleanup"
        },
        beforeLabel: "Green Tire Internal",
        afterLabel: "Bladder Release Coated",
        beforeColor: "from-zinc-800 to-stone-900",
        afterColor: "from-black to-zinc-900",
        beforeImage: "tyreshield bladder releaser before.png",
        afterImage: "tyreshield bladder releaser after.png",
        image: "tyreshield bladder releaser after.png"
      }
    ];

    const PROJECTS = [
      { name: "Shangri-La Hambantota", location: "Hambantota, Sri Lanka", desc: "Comprehensive coastal resort timber protection and masonry sealer application enduring Indian Ocean ocean-spray and humidity.", tag: "Luxury Coastal Resort", logo: "Shangrila hambanthota.png" },
      { name: "Heritance Ahungalla", location: "Ahungalla, Sri Lanka", desc: "Eco-friendly WOODSHIELD and MASOGUARD applications across architectural timber pavilions and stone courtyards.", tag: "Heritage Hotel", logo: "Heritance ahungalla.png" },
      { name: "Jetwing Blue Negombo", location: "Negombo, Sri Lanka", desc: "Water-based UV and marine-resistant finishing for exterior beach-facing furniture, decking, and architectural concrete walls.", tag: "Premier Beachfront Resort", logo: "jetwing blue negombo.png" },
      { name: "Palm Resort Nilaveli", location: "Nilaveli, Eastern Province", desc: "High-exposure coastal chalet finishing demanding non-toxic, moisture-proof, ultra-low VOC interior and exterior durability.", tag: "Boutique Beach Resort", logo: "palm resort.png" },
      { name: "Thissa Safari Hotel", location: "Tissamaharama, Sri Lanka", desc: "Natural wood preservation and weather-proof roof/masonry shielding formulated to endure dry-zone tropical climate fluctuations.", tag: "Wildlife Safari Lodge", logo: "thissa safari.png" },
      { name: "Amaya Resorts & Spas", location: "Kandy & Cultural Triangle, Sri Lanka", desc: "Premium timber conditioning, deck preservation, and masonry protection across luxury chalets, suites, and eco-heritage wellness pavilions.", tag: "Luxury Hospitality & Resort", logo: "amaya resort.png" },
      { name: "Margosa Bay", location: "Trincomalee, Sri Lanka", desc: "Marine-grade eco-friendly coastal finishes delivering ultimate UV, high-humidity, and saline resistance for beachfront boutique chalets.", tag: "Boutique Coastal Resort", logo: "Margosa Bay.png" }
    ];

    const CLIENTS = [
      { name: "Prime Lands", category: "Leading Real Estate Developer", logo: "prime lands.png" },
      { name: "Pizza Hut", category: "Global Restaurant Franchise", logo: "pizza hut.png" },
      { name: "Sri Lanka Army", category: "National Defense Institution", logo: "army.png" },
      { name: "El Toro", category: "Premier Dining & Hospitality", logo: "EL toro.png" },
      { name: "Conwood", category: "Fibre Cement & Construction", logo: "conwood.png" },
      { name: "Yokohama TWS", category: "Off-Highway Tyre Systems & Solutions", logo: "Yokohama.png" },
      { name: "Michelin", category: "Global Tyre Manufacturing Leader", logo: "Michelin.png" },
      { name: "Home Lands", category: "Leading Real Estate & Residential Developer", logo: "home lands.png" },
      { name: "Furnicraft", category: "Architectural Furniture & Interior Manufacturing", logo: "furnicraft.png" },
      { name: "Karapitiya Hospital", category: "National Healthcare & Teaching Hospital Institution", logo: "karapitiya hospital.png" }
    ];

    let currentDivision = 'all';
    let searchQuery = '';
    let calcUnit = 'sqft';
    let calcCoats = 2;

    // 2. NAVIGATION
    function navigateTo(pageId) {
      if (pageId === 'admin') {
        window.location.href = 'admin.html';
        return;
      }
      document.querySelectorAll('.page-tab').forEach(tab => tab.classList.remove('active'));
      const activeTab = document.getElementById('page-' + pageId);
      if (activeTab) {
        activeTab.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-page') === pageId) {
          btn.classList.add('text-[#00A651]', 'bg-[#EBF8F2]', 'font-semibold');
          btn.classList.remove('text-[#231F20]', 'font-medium');
        } else {
          btn.classList.remove('text-[#00A651]', 'bg-[#EBF8F2]', 'font-semibold');
          btn.classList.add('text-[#231F20]', 'font-medium');
        }
      });

      if (pageId === 'shops') {
        setTimeout(() => {
          if (!shopMapInstance) {
            initShopMap();
          } else {
            shopMapInstance.resize();
          }
        }, 120);
      }
    }

    function toggleMobileMenu() {
      const menu = document.getElementById('mobile-menu');
      menu.classList.toggle('hidden');
    }

    // 3. RENDER PRODUCTS WITH BEFORE/AFTER INTERACTIVE SLIDER
    function renderProducts() {
      const grid = document.getElementById('products-grid');
      const fallback = document.getElementById('no-products');
      grid.innerHTML = '';

      const filtered = PRODUCTS.filter(p => {
        const matchesDiv = (currentDivision === 'all') || (p.division === currentDivision);
        const q = searchQuery.toLowerCase();
        const matchesShade = p.shades && p.shades.some(s => s.name.toLowerCase().includes(q));
        const matchesColor = p.colors && p.colors.some(c => (typeof c === 'string' ? c : c.name).toLowerCase().includes(q));
        const matchesFinish = p.finishes && p.finishes.some(f => f.toLowerCase().includes(q));
        const matchesSize = p.sizes && p.sizes.some(sz => sz.toLowerCase().includes(q));
        const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || matchesShade || matchesColor || matchesFinish || matchesSize;
        return matchesDiv && matchesQuery;
      });

      document.getElementById('count-all').innerText = PRODUCTS.length;
      document.getElementById('count-domestic').innerText = PRODUCTS.filter(p => p.division === 'Domestic').length;
      document.getElementById('count-industrial').innerText = PRODUCTS.filter(p => p.division === 'Industrial').length;

      if (filtered.length === 0) {
        fallback.classList.remove('hidden');
        return;
      }
      fallback.classList.add('hidden');

      filtered.forEach(p => {
        const isDecoratives = p.brand === 'DECORATIVES';
        const isPutty = p.name.toLowerCase().includes('putty');
        const isCleaner = p.name.toLowerCase().includes('cleaner');
        const isTyreShield = p.brand === 'TYRESHIELD' || p.name.toLowerCase().includes('tyreshield');
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-2xl hover:border-[#00A651]/50 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between group";
        
        card.innerHTML = `
          <div>
            <!-- Badges -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${isDecoratives ? 'bg-[#00A651] text-white shadow-sm' : 'bg-[#EBF8F2] text-[#074626] border border-[#00A651]/20'}">${p.brand}</span>
              <span class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">${p.division}</span>
            </div>

            <!-- Title & Description -->
            <div class="flex items-baseline justify-between gap-2">
              <h3 class="text-lg sm:text-xl font-bold tracking-tight text-[#231F20] dark:text-white group-hover:text-[#00A651] dark:group-hover:text-emerald-400 transition-colors">${p.name}</h3>
              ${p.tutorialUrl ? `
              <a href="${p.tutorialUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold transition-all hover:scale-105 shrink-0 shadow-xs" title="Watch Applying Tutorial on YouTube">
                <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <span>Tutorial ↗</span>
              </a>
              ` : ''}
            </div>
            <p class="text-xs text-gray-600 mt-1.5 mb-4 line-clamp-2 leading-relaxed">${p.desc}</p>

            ${p.noSlider ? `
            <!-- STATIC IMAGE PREVIEW (No slider) -->
            <div class="mb-4">
              <div class="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200 bg-slate-900 flex items-center justify-center">
                <img src="${getAssetUrl(p.image)}" onerror="this.onerror=null; this.src='assests/' + encodeURIComponent('${p.image}')" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${p.name}" />
                <span class="absolute bottom-2 right-2.5 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-black/60 text-white border border-white/20 backdrop-blur-md shadow-sm">Industrial Tyre Solution</span>
              </div>
              <p class="text-[10px] text-gray-400 text-center mt-1 italic">Water-based green tire lubrication & release</p>
            </div>
            ` : `
            <!-- INTERACTIVE BEFORE/AFTER SLIDE PREVIEW -->
            <div class="mb-4">
              <div class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 px-1">
                <span class="text-gray-500">← ${p.beforeLabel}</span>
                <span class="text-[#00A651]">After: JADE Coating →</span>
              </div>

              <div class="ba-container relative h-44 sm:h-48 w-full shadow-inner border border-gray-200" id="ba-box-${p.id}">
                <!-- AFTER IMAGE / VIEW (Background) -->
                <div class="absolute inset-0 bg-cover bg-center overflow-hidden flex items-center justify-center ${p.afterImage ? 'bg-gray-100' : 'bg-gradient-to-br ' + p.afterColor}">
                  ${p.afterImage ? `<img src="${getAssetUrl(p.afterImage)}" onerror="this.onerror=null; this.src='assests/' + encodeURIComponent('${p.afterImage}')" class="w-full h-full object-cover" />` : `<img src="${getAssetUrl(p.image)}" onerror="this.style.display='none'" class="w-full h-full object-cover opacity-90 mix-blend-overlay" />`}
                  <span class="absolute bottom-2 right-2.5 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-black/40 text-white border border-white/20 backdrop-blur-md z-10 shadow-sm">AFTER</span>
                </div>

                <!-- BEFORE IMAGE / VIEW (Foreground Clip) -->
                <div class="absolute inset-0 bg-cover bg-center overflow-hidden flex items-center justify-center ${p.beforeImage ? 'bg-gray-100' : 'bg-gradient-to-br ' + p.beforeColor}" id="ba-before-${p.id}" style="clip-path: inset(0 50% 0 0);">
                  ${p.beforeImage ? `<img src="${getAssetUrl(p.beforeImage)}" onerror="this.onerror=null; this.src='assests/' + encodeURIComponent('${p.beforeImage}')" class="w-full h-full object-cover" />` : `<img src="${getAssetUrl(p.image)}" onerror="this.style.display='none'" class="w-full h-full object-cover filter grayscale contrast-75 opacity-70" />`}
                  <span class="absolute bottom-2 left-2.5 px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-black/40 text-white border border-white/20 backdrop-blur-md z-10 shadow-sm">BEFORE</span>
                </div>

                <!-- SLIDER DIVIDER LINE & HANDLE -->
                <div class="ba-handle" id="ba-handle-${p.id}" style="left: 50%;">
                  <div class="ba-handle-btn">
                    <span>‹›</span>
                  </div>
                </div>

                <!-- INVISIBLE RANGE INPUT OVERLAY -->
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="50"
                  class="ba-slider-input"
                  aria-label="Before after slide comparison"
                  oninput="updateBeforeAfter(${p.id}, this.value)"
                />
              </div>
              <p class="text-[10px] text-gray-400 text-center mt-1 italic">Drag slider left/right to compare</p>
            </div>
            `}

            ${p.shades && p.shades.length > 0 ? `
            <!-- Product Card Specs: Available shades (Wood Stains) -->
            <div class="mb-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80">
              <div class="flex items-center justify-between gap-1 mb-2">
                <span class="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  Available colors
                </span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950">
                  11 Hues
                </span>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                ${p.shades.map(s => `
                  <div class="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white border border-amber-200/70 shadow-xs" title="${s.name} (${s.desc})">
                    <span class="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15 shadow-xs" style="background-color: ${s.color};"></span>
                    <span class="text-[10px] font-semibold text-gray-800 truncate">${s.name}</span>
                  </div>
                `).join('')}
              </div>
              ${p.sizes ? `
              <div class="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-amber-900/80 uppercase tracking-wider">Available sizes:</span>
                <div class="flex items-center gap-1.5">
                  ${p.sizes.map(sz => `
                    <span class="px-2 py-0.5 rounded-md bg-white border border-amber-200/70 text-[10px] font-bold text-gray-800 shadow-xs">${sz}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}
            </div>
            ` : ''}

            ${p.colors && p.colors.length > 0 ? `
            <!-- Product Card Specs: Available colors, finish & sizes (Putty / Sealer / All in One) -->
            <div class="mb-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80 space-y-2">
              <div>
                <div class="flex items-center justify-between gap-1 mb-1.5">
                  <span class="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    ${p.colors.length === 1 ? 'Available color' : 'Available colors'}
                  </span>
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950">
                    ${p.colors.length === 1 ? (typeof p.colors[0] === 'string' ? p.colors[0] : p.colors[0].name) : `${p.colors.length} Colors`}
                  </span>
                </div>
                <div class="${p.colors.length === 1 ? 'flex' : 'grid grid-cols-2 sm:grid-cols-3 gap-1.5'}">
                  ${p.colors.map(c => {
                    const cName = typeof c === 'string' ? c : c.name;
                    const colorMap = {
                      'Jak Wood': '#D38837',
                      'Larch Teak': '#B7682C',
                      'Burma Teak': '#8E4D1E',
                      'Mahogony': '#732D24',
                      'Dark Teak': '#5C361B',
                      'Walnut': '#63442C',
                      'Black': '#1E1E1E',
                      'Dark Mahogony': '#4A1E17',
                      'Dark Walnut': '#382115',
                      'White': '#FFFFFF',
                      'Clear': '#FFFFFF',
                      'Grey': '#8B959E',
                      'Titanium': '#7D848C',
                      'Tile Red': '#B84A39',
                      'Roof Red': '#8B2624',
                      'Coffee Brown': '#4B3621',
                      'Spruce': '#2C5E43',
                      'Red': '#B83226',
                      'Green': '#2C5E43',
                      'Reddish Brown': '#7E3524',
                      'Beige Light': '#EADBB6',
                      'Beige Dark': '#C4A86C'
                    };
                    const cColor = typeof c === 'object' && c.color ? c.color : (colorMap[cName] || '#FFFFFF');
                    const cDesc = typeof c === 'object' && c.desc ? c.desc : '';
                    return `
                      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-amber-200/70 shadow-xs" title="${cName}${cDesc ? ` (${cDesc})` : ''}">
                        <span class="w-2.5 h-2.5 rounded-full shrink-0 border border-black/20 shadow-xs" style="background-color: ${cColor};"></span>
                        <span class="text-[10px] font-semibold text-gray-800 truncate">${cName}</span>
                        ${p.colors.length === 1 ? `<span class="text-[9px] font-medium text-amber-700/80">(${cName} only)</span>` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
                ${p.colorNote ? `<p class="mt-2 text-[10px] italic text-amber-900/80">* ${p.colorNote}</p>` : ''}
              </div>
              ${p.finishes && p.finishes.length > 0 ? `
              <div class="pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-amber-900/80 uppercase tracking-wider">${p.finishes.length > 1 ? 'Available finishes:' : 'Available finish:'}</span>
                <div class="flex items-center gap-1.5">
                  ${p.finishes.map(f => `
                    <span class="px-2 py-0.5 rounded-md bg-white border border-amber-200/70 text-[10px] font-bold text-gray-800 shadow-xs">${f}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              ${p.sizes ? `
              <div class="pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-amber-900/80 uppercase tracking-wider">Available sizes:</span>
                <div class="flex items-center gap-1.5">
                  ${p.sizes.map(sz => `
                    <span class="px-2 py-0.5 rounded-md bg-white border border-amber-200/70 text-[10px] font-bold text-gray-800 shadow-xs">${sz}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}
            </div>
            ` : ''}

            ${(!p.colors || p.colors.length === 0) && p.finishes && p.finishes.length > 0 ? `
            <!-- Product Card Specs: Available finishes & sizes (Top Coat) -->
            <div class="mb-4 p-3 rounded-2xl bg-amber-50/90 border border-amber-200/80 space-y-2">
              <div>
                <div class="flex items-center justify-between gap-1 mb-1.5">
                  <span class="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    Available finishes
                  </span>
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950">
                    ${p.finishes.length} Finishes
                  </span>
                </div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  ${p.finishes.map(f => `
                    <span class="px-2.5 py-1 rounded-lg bg-white border border-amber-200/70 text-[10px] font-bold text-gray-800 shadow-xs">${f}</span>
                  `).join('')}
                </div>
              </div>
              ${p.sizes ? `
              <div class="pt-2 border-t border-amber-200/60 flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-amber-900/80 uppercase tracking-wider">Available sizes:</span>
                <div class="flex items-center gap-1.5">
                  ${p.sizes.map(sz => `
                    <span class="px-2 py-0.5 rounded-md bg-white border border-amber-200/70 text-[10px] font-bold text-gray-800 shadow-xs">${sz}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}
            </div>
            ` : ''}
          </div>
          
          <!-- Card Action Buttons -->
          <div class="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
            <button onclick="openProductModal(${p.id})" class="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
              Specs
            </button>
            ${isPutty || isCleaner || isTyreShield ? `
            <button onclick="navigateTo('contact')" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00A651] hover:bg-[#008F45] transition-colors shadow-sm flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <span>Request Quote</span>
            </button>
            ` : `
            <button onclick="quickCalculate('${p.name}')" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00A651] hover:bg-[#008F45] transition-colors shadow-sm flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              <span>Calculate Paint</span>
            </button>
            `}
          </div>
        `;
        grid.appendChild(card);
      });
    }

    // Interactive slider mover
    function updateBeforeAfter(id, val) {
      const beforeEl = document.getElementById(`ba-before-${id}`);
      const handleEl = document.getElementById(`ba-handle-${id}`);
      if (beforeEl && handleEl) {
        // clip from right: 100 - val
        const rightClip = 100 - val;
        beforeEl.style.clipPath = `inset(0 ${rightClip}% 0 0)`;
        handleEl.style.left = `${val}%`;
      }
    }

    function filterDivision(div) {
      currentDivision = div;
      document.querySelectorAll('.div-tab').forEach(b => {
        b.classList.remove('bg-white', 'text-[#00A651]', 'shadow-sm');
        b.classList.add('text-gray-600');
      });
      const activeId = div === 'all' ? 'tab-all' : (div === 'Domestic' ? 'tab-domestic' : 'tab-industrial');
      const activeBtn = document.getElementById(activeId);
      if (activeBtn) {
        activeBtn.classList.add('bg-white', 'text-[#00A651]', 'shadow-sm');
        activeBtn.classList.remove('text-gray-600');
      }
      renderProducts();
    }

    function handleSearch(val) {
      searchQuery = val;
      renderProducts();
    }

    // 4. COVERAGE CALCULATOR LOGIC
    function setCalcUnit(unit) {
      calcUnit = unit;
      const sqftBtn = document.getElementById('unit-sqft-btn');
      const sqmBtn = document.getElementById('unit-sqm-btn');
      const label = document.getElementById('unit-display-label');
      const areaInput = document.getElementById('calc-area');

      if (unit === 'sqft') {
        sqftBtn.className = "px-2.5 py-1 rounded bg-[#00A651] text-white";
        sqmBtn.className = "px-2.5 py-1 rounded text-gray-600";
        label.innerText = "sq.ft";
        areaInput.value = Math.round(Number(areaInput.value) * 10.764) || 500;
      } else {
        sqmBtn.className = "px-2.5 py-1 rounded bg-[#00A651] text-white";
        sqftBtn.className = "px-2.5 py-1 rounded text-gray-600";
        label.innerText = "sq.m";
        areaInput.value = Math.round(Number(areaInput.value) / 10.764) || 50;
      }
      runCalculator();
    }

    function runCalculator() {
      const areaInput = Number(document.getElementById('calc-area').value) || 0;
      const productSelect = document.getElementById('calc-product');
      const selectedOption = productSelect.options[productSelect.selectedIndex];
      const sqftRate = Number(selectedOption.getAttribute('data-sqft')) || 120;

      // Convert area to square feet
      const areaInSqFt = (calcUnit === 'sqm') ? (areaInput * 10.7639) : areaInput;
      
      // Liters = Area in Sq.Ft / Sq.Ft per Liter
      const totalLitersRaw = areaInSqFt > 0 ? (areaInSqFt / sqftRate) : 0;
      const totalLiters = Math.max(0.1, Math.round(totalLitersRaw * 10) / 10);

      const resEl = document.getElementById('res-liters');
      if (resEl) resEl.innerText = totalLiters.toFixed(1);
    }

    function quickCalculate(productName) {
      navigateTo('calculator');
      const select = document.getElementById('calc-product');
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase().includes(productName.toLowerCase())) {
          select.selectedIndex = i;
          break;
        }
      }
      runCalculator();
    }

    function transferToContact() {
      const select = document.getElementById('calc-product');
      const productName = select.options[select.selectedIndex].text.split('(')[0].trim();
      const area = document.getElementById('calc-area').value;
      const liters = document.getElementById('res-liters').innerText;

      navigateTo('contact');
      document.getElementById('form-subject').value = `Quotation for ${productName} (${liters} Liters)`;
      document.getElementById('form-message').value = `Hello JADE Coatings Team,\n\nI used the Coverage Calculator for:\n- Product: ${productName}\n- Project Area: ${area} ${calcUnit}\n- Required Coating Volume: ${liters} Liters\n\nPlease provide quotation and technical advice.`;
    }

    // 5. MODAL
    function openProductModal(id) {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return;

      document.getElementById('modal-title').innerText = p.name;
      document.getElementById('modal-brand-badge').innerText = p.brand;
      document.getElementById('modal-division-badge').innerText = p.division;
      document.getElementById('modal-desc').innerText = p.desc;

      const featureList = document.getElementById('modal-features');
      featureList.innerHTML = '';
      p.features.forEach(f => {
        const li = document.createElement('li');
        li.className = "flex items-center gap-2.5";
        li.innerHTML = `
          <svg class="w-4 h-4 text-[#00A651] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          <span class="text-[#231F20]">${f}</span>
        `;
        featureList.appendChild(li);
      });

      const shadesBox = document.getElementById('modal-shades-box');
      const shadesGrid = document.getElementById('modal-shades-grid');
      if (shadesBox && shadesGrid) {
        if (p.shades && p.shades.length > 0) {
          shadesBox.classList.remove('hidden');
          shadesGrid.innerHTML = p.shades.map(s => `
            <div class="flex items-center gap-2 p-2 rounded-xl bg-white border border-amber-200/80 shadow-xs">
              <span class="w-3.5 h-3.5 rounded-full shrink-0 border border-black/15 shadow-xs" style="background-color: ${s.color};"></span>
              <div class="min-w-0">
                <div class="text-xs font-bold text-gray-800 truncate">${s.name}</div>
                <div class="text-[9px] text-gray-500 truncate">${s.desc}</div>
              </div>
            </div>
          `).join('');
        } else {
          shadesBox.classList.add('hidden');
        }
      }

      const colorsBox = document.getElementById('modal-colors-box');
      const colorsGrid = document.getElementById('modal-colors-grid');
      const colorsBadge = document.getElementById('modal-colors-badge');
      if (colorsBox && colorsGrid) {
        if (p.colors && p.colors.length > 0) {
          colorsBox.classList.remove('hidden');
          if (colorsBadge) colorsBadge.innerText = p.colors.length === 1 ? `${typeof p.colors[0] === 'string' ? p.colors[0] : p.colors[0].name} Only` : `${p.colors.length} Colors`;
          const colorHexMap = {
            'Jak Wood': '#D38837',
            'Larch Teak': '#B7682C',
            'Burma Teak': '#8E4D1E',
            'Mahogony': '#732D24',
            'Dark Teak': '#5C361B',
            'Walnut': '#63442C',
            'Black': '#1E1E1E',
            'Dark Mahogony': '#4A1E17',
            'Dark Walnut': '#382115',
            'White': '#FFFFFF',
            'Clear': '#FFFFFF',
            'Grey': '#8B959E',
            'Titanium': '#7D848C',
            'Tile Red': '#B84A39',
            'Roof Red': '#8B2624',
            'Coffee Brown': '#4B3621',
            'Spruce': '#2C5E43',
            'Red': '#B83226',
            'Green': '#2C5E43',
            'Reddish Brown': '#7E3524',
            'Beige Light': '#EADBB6',
            'Beige Dark': '#C4A86C'
          };
          colorsGrid.innerHTML = p.colors.map(c => {
            const name = typeof c === 'string' ? c : c.name;
            const color = typeof c === 'object' && c.color ? c.color : (colorHexMap[name] || '#FFFFFF');
            const desc = typeof c === 'object' && c.desc ? c.desc : '';
            return `
              <div class="flex items-center gap-2 p-2 rounded-xl bg-white border border-amber-200/80 shadow-xs">
                <span class="w-3.5 h-3.5 rounded-full shrink-0 border border-black/15 shadow-xs" style="background-color: ${color};"></span>
                <div class="min-w-0">
                  <div class="text-xs font-bold text-gray-800 truncate">${name}</div>
                  ${desc ? `<div class="text-[9px] text-gray-500 truncate">${desc}</div>` : ''}
                </div>
              </div>
            `;
          }).join('');
          const noteEl = document.getElementById('modal-colors-note');
          if (noteEl) {
            if (p.colorNote) {
              noteEl.innerText = `* ${p.colorNote}`;
              noteEl.classList.remove('hidden');
            } else {
              noteEl.classList.add('hidden');
            }
          }
        } else {
          colorsBox.classList.add('hidden');
        }
      }

      const finishesBox = document.getElementById('modal-finishes-box');
      const finishesGrid = document.getElementById('modal-finishes-grid');
      const finishesBadge = document.getElementById('modal-finishes-badge');
      if (finishesBox && finishesGrid) {
        if (p.finishes && p.finishes.length > 0) {
          finishesBox.classList.remove('hidden');
          if (finishesBadge) finishesBadge.innerText = `${p.finishes.length} Finishes`;
          finishesGrid.innerHTML = p.finishes.map(f => `
            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-amber-950 border border-amber-300 shadow-xs flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
              ${f}
            </span>
          `).join('');
        } else {
          finishesBox.classList.add('hidden');
        }
      }

      const sizesBox = document.getElementById('modal-sizes-box');
      const sizesGrid = document.getElementById('modal-sizes-grid');
      const sizesBadge = document.getElementById('modal-sizes-badge');
      if (sizesBox && sizesGrid) {
        if (p.sizes && p.sizes.length > 0) {
          sizesBox.classList.remove('hidden');
          if (sizesBadge) sizesBadge.innerText = `${p.sizes.length} Sizes`;
          sizesGrid.innerHTML = p.sizes.map(s => `
            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-emerald-900 border border-emerald-300 shadow-xs flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              ${s}
            </span>
          `).join('');
        } else {
          sizesBox.classList.add('hidden');
        }
      }

      const isPutty = p.name.toLowerCase().includes('putty');
      const isCleaner = p.name.toLowerCase().includes('cleaner');
      const isTyreShield = p.brand === 'TYRESHIELD' || p.name.toLowerCase().includes('tyreshield');
      const calcBtn = document.getElementById('modal-calc-btn');
      const inqBtn = document.getElementById('modal-inquire-btn');
      if (isPutty || isCleaner || isTyreShield) {
        if (calcBtn) calcBtn.classList.add('hidden');
        if (inqBtn) inqBtn.classList.remove('hidden');
      } else {
        if (calcBtn) calcBtn.classList.remove('hidden');
        if (inqBtn) inqBtn.classList.add('hidden');
      }

      const tutorialBox = document.getElementById('modal-tutorial-box');
      const tutorialLink = document.getElementById('modal-tutorial-link');
      if (tutorialBox && tutorialLink) {
        if (p.tutorialUrl) {
          tutorialBox.classList.remove('hidden');
          tutorialLink.href = p.tutorialUrl;
        } else {
          tutorialBox.classList.add('hidden');
        }
      }

      const modal = document.getElementById('product-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeProductModal() {
      const modal = document.getElementById('product-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    document.getElementById('product-modal').addEventListener('click', function(e) {
      if (e.target === this) closeProductModal();
    });

    // 6. RENDER PROJECTS & CLIENTS
    function renderProjectsAndClients() {
      const pContainer = document.getElementById('projects-container');
      pContainer.innerHTML = '';
      PROJECTS.forEach(proj => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#00A651]/40 transition-all flex flex-col justify-between";
        card.innerHTML = `
          <div>
            ${proj.logo ? `
            <div class="h-24 w-full flex items-center justify-center p-3 rounded-2xl bg-gray-50/80 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 mb-4 group-hover:bg-[#EBF8F2]/50 transition-colors">
              <img src="${getAssetUrl(proj.logo)}" onerror="this.onerror=null; this.src='assests/' + encodeURIComponent('${proj.logo}')" alt="${proj.name} logo" class="max-h-20 max-w-[220px] w-auto object-contain transition-transform duration-300 hover:scale-105" />
            </div>
            ` : `
            <div class="h-11 w-11 rounded-2xl bg-[#EBF8F2] text-[#00A651] flex items-center justify-center font-bold mb-4 shadow-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            `}
            <span class="text-[11px] uppercase font-bold text-[#00A651] tracking-wider block mb-1">${proj.tag}</span>
            <h3 class="text-xl font-bold tracking-tight text-[#231F20] dark:text-white">${proj.name}</h3>
            <p class="text-xs text-gray-500 flex items-center gap-1 mt-1 mb-3 font-medium">
              <svg class="w-3.5 h-3.5 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              ${proj.location}
            </p>
            <p class="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">${proj.desc}</p>
          </div>
        `;
        pContainer.appendChild(card);
      });

      const cContainer = document.getElementById('clients-container');
      cContainer.innerHTML = '';
      CLIENTS.forEach(client => {
        const cCard = document.createElement('div');
        cCard.className = "group relative bg-white dark:bg-[#131B26] p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-[#00A651]/60 dark:hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden";
        
        // 100% Scaled up logo frame and dimensions
        const logoHtml = client.logo 
          ? `<div class="h-24 w-full flex items-center justify-center p-4 rounded-xl bg-gray-50/80 dark:bg-slate-900/60 border border-gray-100 dark:border-slate-800 group-hover:bg-[#EBF8F2]/50 dark:group-hover:bg-emerald-950/20 group-hover:border-[#00A651]/30 transition-colors mb-4">
               <img src="${getAssetUrl(client.logo)}" onerror="this.onerror=null; this.src='assests/' + encodeURIComponent('${client.logo}')" alt="${client.name} logo" class="max-h-20 max-w-[220px] w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
             </div>`
          : `<div class="h-24 w-full flex items-center justify-center mb-4">
               <div class="w-14 h-14 rounded-xl bg-[#EBF8F2] dark:bg-emerald-950/40 text-[#00A651] dark:text-emerald-400 flex items-center justify-center font-black tracking-tight text-2xl">
                 ${client.name.charAt(0)}
               </div>
             </div>`;

        cCard.innerHTML = `
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A651] to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div>
            ${logoHtml}
            <div class="mb-1.5">
              <h3 class="font-bold text-base text-[#231F20] dark:text-white group-hover:text-[#00A651] dark:group-hover:text-emerald-400 transition-colors line-clamp-1">${client.name}</h3>
            </div>
            <p class="text-xs text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2">${client.category}</p>
          </div>
        `;
        cContainer.appendChild(cCard);
      });

      // Populate Home Page sliding logos marquee with 100% larger size
      const homeSlider = document.getElementById('home-sliding-logos');
      if (homeSlider) {
        homeSlider.innerHTML = '';
        const repeatedClients = [...CLIENTS, ...CLIENTS, ...CLIENTS];
        repeatedClients.forEach(client => {
          const item = document.createElement('div');
          item.className = "group inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-[#131B26] border border-gray-100 dark:border-slate-800 hover:border-[#00A651]/40 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1";
          
          if (client.logo) {
            item.innerHTML = `
              <img src="${getAssetUrl(client.logo)}" onerror="this.onerror=null; this.src='assests/' + encodeURIComponent('${client.logo}')" alt="${client.name} logo" class="h-12 sm:h-14 max-w-[180px] w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <span class="font-bold text-sm sm:text-base text-[#231F20] dark:text-slate-200 group-hover:text-[#00A651] transition-colors">${client.name}</span>
            `;
          } else {
            item.innerHTML = `
              <div class="w-10 h-10 rounded-xl bg-[#EBF8F2] dark:bg-emerald-950/40 text-[#00A651] font-black flex items-center justify-center text-base">${client.name.charAt(0)}</div>
              <span class="font-bold text-sm sm:text-base text-[#231F20] dark:text-slate-200 group-hover:text-[#00A651] transition-colors">${client.name}</span>
            `;
          }
          homeSlider.appendChild(item);
        });
      }
    }

    // 7. CONTACT FORM (Instant WhatsApp Integration)
    function handleContactSubmit(e) {
      e.preventDefault();
      const name = (document.getElementById('form-name')?.value || '').trim();
      const contact = (document.getElementById('form-email')?.value || '').trim();
      const subject = (document.getElementById('form-subject')?.value || '').trim();
      const message = (document.getElementById('form-message')?.value || '').trim();

      const waText = 
        `*New Inquiry - JADE Coatings*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Contact:* ${contact || "Not specified"}\n` +
        `📋 *Subject:* ${subject || "General Inquiry"}\n` +
        `💬 *Message:*\n${message}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `_Sent from jadecoatings.lk_`;

      const waUrl = `https://wa.me/94773774340?text=${encodeURIComponent(waText)}`;
      
      // Open WhatsApp chat directly in new tab/app
      window.open(waUrl, '_blank');

      const btn = document.getElementById('submit-btn');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = `
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        <span>WhatsApp Opened!</span>
      `;
      btn.disabled = true;

      const successCard = document.getElementById('contact-success');
      if (successCard) {
        successCard.innerHTML = `
          <svg class="w-5 h-5 text-[#25D366] mt-0.5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <div>
            <span class="font-bold block">WhatsApp Chat Launched!</span>
            <span>You can now send your inquiry directly to our technical team on <strong>077 377 4340</strong>. If the window did not open, <a href="${waUrl}" target="_blank" class="underline font-bold text-[#25D366]">click here to open WhatsApp</a>.</span>
          </div>
        `;
        successCard.classList.remove('hidden');
      }

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }, 4000);
    }

    


    // Product Page Hero 3D Video & Mascot Switcher
    function switchProductHeroTab(mode) {
      const vidStage = document.getElementById('product-hero-video-stage');
      const masStage = document.getElementById('product-hero-mascot-stage');
      const tabVid = document.getElementById('hero-tab-video');
      const tabMas = document.getElementById('hero-tab-mascot');
      const video = document.getElementById('product-hero-video-elem');

      if (mode === 'video') {
        vidStage.classList.remove('hidden');
        vidStage.classList.add('flex');
        masStage.classList.add('hidden');
        masStage.classList.remove('flex');
        tabVid.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#00A651] text-white shadow-lg shadow-[#00A651]/30';
        tabMas.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 text-white/70 hover:text-white';
        if (video) video.play().catch(() => {});
      } else {
        vidStage.classList.add('hidden');
        vidStage.classList.remove('flex');
        masStage.classList.remove('hidden');
        masStage.classList.add('flex');
        tabMas.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#00A651] text-white shadow-lg shadow-[#00A651]/30';
        tabVid.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 text-white/70 hover:text-white';
      }
    }

    function toggleHeroVideoPlay() {
      const video = document.getElementById('product-hero-video-elem');
      const pauseIcon = document.getElementById('hero-pause-icon');
      const playIcon = document.getElementById('hero-play-icon');
      if (!video) return;

      if (video.paused) {
        video.play();
        pauseIcon.classList.remove('hidden');
        playIcon.classList.add('hidden');
      } else {
        video.pause();
        pauseIcon.classList.add('hidden');
        playIcon.classList.remove('hidden');
      }
    }

    function toggleHeroVideoMute() {
      const video = document.getElementById('product-hero-video-elem');
      const mutedIcon = document.getElementById('hero-muted-icon');
      const unmutedIcon = document.getElementById('hero-unmuted-icon');
      if (!video) return;

      video.muted = !video.muted;
      if (video.muted) {
        mutedIcon.classList.remove('hidden');
        unmutedIcon.classList.add('hidden');
      } else {
        mutedIcon.classList.add('hidden');
        unmutedIcon.classList.remove('hidden');
      }
    }

    // =========================================================================
    // 8. FIND A SHOP (DEALER LOCATOR & GOOGLE MAPS INTEGRATION)
    // =========================================================================
    const MAPBOX_ACCESS_TOKEN = atob('cGsuZXlKMUlqb2lkVzFsYzJneU4ycGhaR1VpTENKaElqb2lZMjExYlRsb1luQnJNREEwYURKNGN6bHdOMnBxZGpnM09TSjkuMVQwOUFER3FVWDltTWdQc0RCV0pVZw==');
    const DEFAULT_SHOPS_DATA = [];
    const SHOPS_STORAGE_KEY = 'jade_custom_shops_v2';
    const CLOUD_DB_ENDPOINT = 'https://api.npoint.io/249f9cb136e8d1c46893';

    // Broadcast channel for instant 0ms tab sync
    let shopsBroadcastChannel = null;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        shopsBroadcastChannel = new BroadcastChannel('jade_shops_sync_v2');
      }
    } catch(e) {}

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function getLocalShops() {
      try {
        const stored = localStorage.getItem(SHOPS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch(e) {}
      return [];
    }

    function saveLocalShops(shopsList) {
      try {
        localStorage.setItem(SHOPS_STORAGE_KEY, JSON.stringify(shopsList));
        if (shopsBroadcastChannel) {
          shopsBroadcastChannel.postMessage({ type: 'SHOPS_CHANGED', shops: shopsList, timestamp: Date.now() });
        }
      } catch(e) {}
    }

    let currentShopRadius = 10; // default 10 km (5, 10, 20 or null for All)
    let currentShopUserLocation = null; // { lat, lng, name }
    let currentSearchText = '';
    let selectedShopId = null;
    let shopMapInstance = null;
    let shopMarkersList = [];
    let userMapMarker = null;
    let currentFilteredShops = [];
    let lastKnownShopsSnapshot = '';

    // Calculate distance between two lat/lon points using Haversine formula
    function calculateDistanceKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }

    // Helper: Generate GeoJSON polygon circle for radius visualization on Mapbox
    function createGeoJSONCircle(centerLngLat, radiusInKm, points = 64) {
      const [lng, lat] = centerLngLat;
      const coords = { latitude: lat, longitude: lng };
      const ret = [];
      const distanceX = radiusInKm / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
      const distanceY = radiusInKm / 110.574;
      for (let i = 0; i < points; i++) {
        const theta = (i / points) * (2 * Math.PI);
        const x = distanceX * Math.cos(theta);
        const y = distanceY * Math.sin(theta);
        ret.push([coords.longitude + x, coords.latitude + y]);
      }
      ret.push(ret[0]);
      return {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [ret]
        }
      };
    }

    // Mapbox Initializer
    function initShopsMap() {
      const mapContainer = document.getElementById('mapbox-shops-map') || document.getElementById('google-shops-map');
      if (!mapContainer || !window.mapboxgl) return;

      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

      const defaultCenter = currentShopUserLocation
        ? [currentShopUserLocation.lng, currentShopUserLocation.lat]
        : [79.8612, 6.9271]; // [lng, lat]

      shopMapInstance = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: defaultCenter,
        zoom: currentShopUserLocation ? 12 : 8
      });

      shopMapInstance.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }), 'top-right');
      shopMapInstance.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      shopMapInstance.on('load', () => {
        updateShopMarkersOnMap();
      });
    }

    // RENDER SHOPS LIST & FILTER
    function renderShops() {
      const allShops = getLocalShops();
      lastKnownShopsSnapshot = JSON.stringify(allShops);
      const cardsList = document.getElementById('shops-cards-list');
      const countLabel = document.getElementById('shops-count-label');

      // 1. Calculate distances from active reference point
      let shopsWithDistance = allShops.map(shop => {
        let dist = null;
        if (currentShopUserLocation) {
          dist = calculateDistanceKm(
            currentShopUserLocation.lat,
            currentShopUserLocation.lng,
            shop.lat,
            shop.lng
          );
        }
        return { ...shop, distance: dist };
      });

      // 2. Filter by search text query
      let filtered = shopsWithDistance;
      if (currentSearchText.trim()) {
        const q = currentSearchText.toLowerCase().trim();
        filtered = filtered.filter(s =>
          (s.name || '').toLowerCase().includes(q) ||
          (s.city || '').toLowerCase().includes(q) ||
          (s.address || '').toLowerCase().includes(q)
        );
      }

      // 3. Filter by Radius (5km, 10km, 20km) when user location is active
      if (currentShopUserLocation && currentShopRadius !== null) {
        filtered = filtered.filter(s => s.distance !== null && s.distance <= currentShopRadius);
      }

      // 4. SORT: Strictly Minimum to Longest Distance
      filtered.sort((a, b) => {
        if (a.distance !== null && b.distance !== null) {
          return a.distance - b.distance;
        }
        if (a.distance !== null) return -1;
        if (b.distance !== null) return 1;
        return (a.name || '').localeCompare(b.name || '');
      });

      currentFilteredShops = filtered;

      // Update counter badge and mobile tab count
      if (countLabel) {
        if (filtered.length === 1) {
          countLabel.innerText = '1 authorized location';
        } else {
          countLabel.innerText = `${filtered.length} authorized locations`;
        }
      }
      const mobileTabCount = document.getElementById('mobile-tab-count');
      if (mobileTabCount) {
        mobileTabCount.innerText = filtered.length;
      }

      if (!cardsList) return;
      cardsList.innerHTML = '';

      if (filtered.length === 0) {
        cardsList.innerHTML = `
          <div class="p-8 text-center bg-white rounded-3xl border border-gray-100 shadow-xs">
            <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3 text-gray-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h3 class="text-base font-bold text-gray-800">No stores found</h3>
            <p class="text-xs text-gray-500 mt-1 max-w-xs mx-auto">No authorized dealer locations currently match this criteria. Please check back soon or contact our customer hotline.</p>
            <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
              <a href="tel:+94773774340" class="px-4 py-2 rounded-xl bg-[#00A651] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm hover:bg-[#008F45] transition-colors">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Hotline (077 377 4340)</span>
              </a>
              <button onclick="setShopRadius(null)" class="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#231F20] font-bold text-xs cursor-pointer">
                Clear Filters
              </button>
            </div>
          </div>
        `;
      } else {
        filtered.forEach(shop => {
          const isSelected = selectedShopId === shop.id;
          const card = document.createElement('div');
          card.className = `p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-200 cursor-pointer border ${
            isSelected 
              ? 'bg-[#EBF8F2] border-[#00A651] shadow-md ring-2 ring-[#00A651]/20'
              : 'bg-white hover:bg-gray-50/80 border-gray-100 shadow-xs hover:border-gray-200'
          }`;
          card.onclick = () => focusShopOnMap(shop, false);

          const distBadge = shop.distance !== null
            ? `<span class="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold">📍 ${shop.distance < 1 ? Math.round(shop.distance * 1000) + ' m' : shop.distance.toFixed(1) + ' km'} away</span>`
            : '';

          card.innerHTML = `
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1 flex-wrap">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#074626] text-[10px] font-extrabold uppercase tracking-wider">
                    <svg class="w-3 h-3 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Authorized Dealer
                  </span>
                  ${shop.isFlagship ? `<span class="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">Flagship</span>` : ''}
                  ${distBadge}
                </div>
                <h3 class="text-base font-extrabold text-[#231F20] tracking-tight group-hover:text-[#00A651]">${shop.name}</h3>
              </div>
            </div>

            <div class="mt-2.5 space-y-1.5 text-xs text-gray-600">
              <div class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>${shop.address}, <strong>${shop.city}</strong></span>
              </div>
              ${shop.openingHours ? `
              <div class="flex items-center gap-2 text-gray-500">
                <svg class="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>${shop.openingHours}</span>
              </div>` : ''}
            </div>

            <div class="mt-3.5 pt-3 border-t border-gray-100 grid grid-cols-2 sm:flex sm:items-center gap-2">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}"
                target="_blank"
                rel="noopener noreferrer"
                onclick="event.stopPropagation()"
                class="col-span-2 sm:flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white font-bold text-xs transition-colors shadow-xs active:scale-95"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                <span>Get Directions</span>
              </a>

              <a
                href="tel:${shop.phone || ''}"
                onclick="event.stopPropagation()"
                class="${shop.phone ? '' : 'pointer-events-none opacity-50'} inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#231F20] font-bold text-xs transition-colors active:scale-95"
              >
                <svg class="w-3.5 h-3.5 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>Call Shop</span>
              </a>

              <button
                type="button"
                onclick="event.stopPropagation(); focusShopOnMap(currentFilteredShops.find(s => s.id === '${shop.id}'), true)"
                class="lg:hidden inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#074626] font-bold text-xs transition-colors border border-emerald-200 active:scale-95"
              >
                <svg class="w-3.5 h-3.5 text-[#00A651]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                <span>View Map</span>
              </button>
            </div>
          `;
          cardsList.appendChild(card);
        });
      }

      // Update Map Markers
      updateShopMarkersOnMap();
    }

    function updateShopMarkersOnMap() {
      if (!shopMapInstance || !window.mapboxgl) return;

      // 1. Clear existing shop markers
      if (shopMarkersList && shopMarkersList.length > 0) {
        shopMarkersList.forEach(item => {
          if (item && item.marker) item.marker.remove();
        });
      }
      shopMarkersList = [];

      // 2. Clear user location marker
      if (userMapMarker) {
        userMapMarker.remove();
        userMapMarker = null;
      }

      const legendUserDot = document.getElementById('legend-user-dot');
      if (legendUserDot) {
        if (currentShopUserLocation) {
          legendUserDot.classList.remove('hidden');
          legendUserDot.classList.add('flex');
        } else {
          legendUserDot.classList.add('hidden');
          legendUserDot.classList.remove('flex');
        }
      }

      // 3. User location marker and radius circle
      if (currentShopUserLocation) {
        // Custom pulsing blue user marker
        const el = document.createElement('div');
        el.className = 'w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center animate-pulse';
        el.innerHTML = '<span class="w-2.5 h-2.5 rounded-full bg-white"></span>';

        userMapMarker = new mapboxgl.Marker({ element: el })
          .setLngLat([currentShopUserLocation.lng, currentShopUserLocation.lat])
          .setPopup(new mapboxgl.Popup({ offset: 15 }).setHTML(`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; color: #1E40AF; padding: 2px;">
              📍 ${escapeHtml(currentShopUserLocation.name || 'Your Location')}
            </div>
          `))
          .addTo(shopMapInstance);

        // Update radius circle layer
        if (shopMapInstance.isStyleLoaded()) {
          updateRadiusCircleOnMap();
        } else {
          shopMapInstance.once('load', updateRadiusCircleOnMap);
        }
      } else {
        if (legendUserDot) legendUserDot.classList.add('hidden');
        removeRadiusCircleFromMap();
      }

      if (currentFilteredShops.length === 0) {
        if (!currentShopUserLocation) {
          shopMapInstance.flyTo({ center: [79.8612, 6.9271], zoom: 8 });
        }
        return;
      }

      const bounds = new mapboxgl.LngLatBounds();
      if (currentShopUserLocation) {
        bounds.extend([currentShopUserLocation.lng, currentShopUserLocation.lat]);
      }

      // 4. Render dealer pins
      currentFilteredShops.forEach(shop => {
        bounds.extend([shop.lng, shop.lat]);

        const popupHtml = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 250px;">
            <div style="font-size: 10px; font-weight: 800; color: #00A651; text-transform: uppercase; margin-bottom: 2px;">
              ${shop.isFlagship ? '★ Flagship Store' : 'Authorized Store'}
            </div>
            <div style="font-size: 14px; font-weight: 800; color: #111827; margin-bottom: 4px;">${escapeHtml(shop.name)}</div>
            <div style="font-size: 12px; color: #4B5563; margin-bottom: 4px;">📍 ${escapeHtml(shop.address || shop.city)}</div>
            ${shop.phone ? `<div style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 8px;">📞 ${escapeHtml(shop.phone)}</div>` : ''}
            <div style="display:flex; gap:6px; margin-top:8px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}" target="_blank" rel="noopener noreferrer" style="flex:1; text-align:center; background:#00A651; color:#ffffff; padding:6px 10px; border-radius:8px; font-size:11px; font-weight:700; text-decoration:none;">
                Directions ↗
              </a>
              ${shop.phone ? `<a href="tel:${shop.phone}" style="text-align:center; background:#F3F4F6; color:#111827; padding:6px 10px; border-radius:8px; font-size:11px; font-weight:700; text-decoration:none;">Call</a>` : ''}
            </div>
          </div>
        `;
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml);

        const pinColor = shop.isFlagship ? '#EAB308' : '#00A651';
        const pinEl = document.createElement('div');
        pinEl.className = 'cursor-pointer transform hover:scale-125 transition-transform duration-200';
        pinEl.innerHTML = `
          <div class="relative flex items-center justify-center">
            <svg class="w-9 h-9 drop-shadow-md" viewBox="0 0 24 24" fill="${pinColor}">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span class="absolute top-2 w-2 h-2 rounded-full bg-white"></span>
          </div>
        `;

        const marker = new mapboxgl.Marker({ element: pinEl })
          .setLngLat([shop.lng, shop.lat])
          .setPopup(popup)
          .addTo(shopMapInstance);

        pinEl.addEventListener('click', () => {
          focusShopOnMap(shop);
        });

        shopMarkersList.push({ id: shop.id, marker, popup });
      });

      if (!bounds.isEmpty()) {
        if (currentFilteredShops.length === 1 && !currentShopUserLocation) {
          shopMapInstance.flyTo({ center: [currentFilteredShops[0].lng, currentFilteredShops[0].lat], zoom: 14 });
        } else {
          shopMapInstance.fitBounds(bounds, { padding: 60, maxZoom: 14, duration: 1000 });
        }
      }
    }

    function updateRadiusCircleOnMap() {
      if (!shopMapInstance || !shopMapInstance.isStyleLoaded()) return;
      if (!currentShopUserLocation || currentShopRadius === null) {
        removeRadiusCircleFromMap();
        return;
      }

      const circleData = createGeoJSONCircle([currentShopUserLocation.lng, currentShopUserLocation.lat], currentShopRadius);
      const source = shopMapInstance.getSource('user-radius-source');
      if (source) {
        source.setData(circleData);
      } else {
        shopMapInstance.addSource('user-radius-source', {
          type: 'geojson',
          data: circleData
        });
        shopMapInstance.addLayer({
          id: 'user-radius-fill',
          type: 'fill',
          source: 'user-radius-source',
          paint: {
            'fill-color': '#00A651',
            'fill-opacity': 0.08
          }
        });
        shopMapInstance.addLayer({
          id: 'user-radius-line',
          type: 'line',
          source: 'user-radius-source',
          paint: {
            'line-color': '#00A651',
            'line-width': 2,
            'line-dasharray': [2, 2]
          }
        });
      }
    }

    function removeRadiusCircleFromMap() {
      if (!shopMapInstance || !shopMapInstance.isStyleLoaded()) return;
      if (shopMapInstance.getLayer('user-radius-line')) shopMapInstance.removeLayer('user-radius-line');
      if (shopMapInstance.getLayer('user-radius-fill')) shopMapInstance.removeLayer('user-radius-fill');
      if (shopMapInstance.getSource('user-radius-source')) shopMapInstance.removeSource('user-radius-source');
    }

    let currentMobileShopsView = 'list';
    function setMobileShopsView(view) {
      currentMobileShopsView = view;
      const listCol = document.getElementById('shops-list-column');
      const mapCol = document.getElementById('shops-map-column');
      const listBtn = document.getElementById('mobile-tab-list-btn');
      const mapBtn = document.getElementById('mobile-tab-map-btn');

      if (view === 'map') {
        if (listCol) {
          listCol.classList.add('hidden');
          listCol.classList.remove('block');
        }
        if (mapCol) {
          mapCol.classList.remove('hidden');
          mapCol.classList.add('block');
        }
        if (listBtn) {
          listBtn.className = 'flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-gray-600 hover:text-gray-900';
        }
        if (mapBtn) {
          mapBtn.className = 'flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all bg-[#00A651] text-white shadow-sm';
        }
        setTimeout(() => {
          if (shopMapInstance) {
            shopMapInstance.resize();
          }
        }, 120);
      } else {
        if (listCol) {
          listCol.classList.remove('hidden');
          listCol.classList.add('block');
        }
        if (mapCol) {
          mapCol.classList.add('hidden');
          mapCol.classList.remove('block');
        }
        if (listBtn) {
          listBtn.className = 'flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all bg-[#00A651] text-white shadow-sm';
        }
        if (mapBtn) {
          mapBtn.className = 'flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-gray-600 hover:text-gray-900';
        }
      }
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        const listCol = document.getElementById('shops-list-column');
        const mapCol = document.getElementById('shops-map-column');
        if (listCol) {
          listCol.classList.remove('hidden');
          listCol.classList.add('block');
        }
        if (mapCol) {
          mapCol.classList.remove('hidden');
          mapCol.classList.add('block');
        }
        if (shopMapInstance) shopMapInstance.resize();
      } else {
        setMobileShopsView(currentMobileShopsView);
      }
    });

    function focusShopOnMap(shop, shouldSwitchToMap = false) {
      if (!shop) return;
      selectedShopId = shop.id;

      if (shouldSwitchToMap && window.innerWidth < 1024) {
        setMobileShopsView('map');
      }

      if (shopMapInstance) {
        shopMapInstance.flyTo({
          center: [shop.lng, shop.lat],
          zoom: 15,
          essential: true
        });

        const target = shopMarkersList.find(m => m.id === shop.id);
        if (target && target.popup) {
          target.popup.addTo(shopMapInstance);
        }
      }
      renderShops();
    }

    // Set Radius Filter (5, 10, 20 or null for All)
    function setShopRadius(radiusKm) {
      currentShopRadius = radiusKm;
      document.querySelectorAll('#radius-buttons-container .radius-btn').forEach(btn => {
        const r = btn.getAttribute('data-radius');
        const matches = (radiusKm === null && r === 'null') || (Number(r) === radiusKm);
        if (matches) {
          btn.className = 'radius-btn px-3 py-1.5 rounded-xl font-bold transition-all text-xs bg-[#00A651] text-white shadow-sm';
        } else {
          btn.className = 'radius-btn px-3 py-1.5 rounded-xl font-bold transition-all text-xs bg-gray-100 text-gray-600 hover:bg-gray-200';
        }
      });
      renderShops();
    }

    // ROBUST "LOCATE ME" FUNCTION (Mobile GPS + Desktop Wi-Fi + IP Geolocation Fallback)
    function locateUserPosition() {
      const locateBtn = document.getElementById('btn-locate-me');
      const locateText = document.getElementById('locate-text');
      const statusEl = document.getElementById('shop-location-status');
      const errorEl = document.getElementById('shop-location-error');

      if (locateText) locateText.innerText = 'Locating...';
      if (statusEl) statusEl.classList.add('hidden');
      if (errorEl) errorEl.classList.add('hidden');

      function applyLocation(lat, lng, label) {
        if (locateText) locateText.innerText = 'Located!';
        setTimeout(() => { if (locateText) locateText.innerText = 'Locate Me'; }, 2500);

        currentShopUserLocation = { lat, lng, name: label };

        if (statusEl) {
          statusEl.innerHTML = `📍 <strong>Active Reference:</strong> ${label} (${lat.toFixed(4)}, ${lng.toFixed(4)}) • Sorted by shortest distance first.`;
          statusEl.classList.remove('hidden');
        }

        if (shopMapInstance) {
          shopMapInstance.flyTo({ center: [lng, lat], zoom: 13, essential: true });
        }

        renderShops();
      }

      // 1. Try Browser Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            applyLocation(pos.coords.latitude, pos.coords.longitude, 'Current Location');
          },
          (err) => {
            console.warn('High-accuracy GPS failed on this device, attempting standard accuracy / IP fallback...', err);
            // 2. Try Standard Accuracy
            navigator.geolocation.getCurrentPosition(
              (pos2) => {
                applyLocation(pos2.coords.latitude, pos2.coords.longitude, 'Current Location');
              },
              (err2) => {
                // 3. Fallback to IP-based Geolocation (100% works on desktops and laptops)
                fetch('https://ipapi.co/json/')
                  .then(res => res.json())
                  .then(data => {
                    if (data && data.latitude && data.longitude) {
                      applyLocation(data.latitude, data.longitude, data.city ? `${data.city}, Sri Lanka` : 'Sri Lanka');
                    } else {
                      throw new Error('No IP coords');
                    }
                  })
                  .catch(() => {
                    if (locateText) locateText.innerText = 'Locate Me';
                    if (errorEl) {
                      errorEl.innerHTML = '⚠️ Location detection unavailable on this device. Please type your city in the search bar.';
                      errorEl.classList.remove('hidden');
                    }
                  });
              },
              { timeout: 7000, enableHighAccuracy: false, maximumAge: 300000 }
            );
          },
          { timeout: 6000, enableHighAccuracy: true, maximumAge: 60000 }
        );
      } else {
        // Fallback for older browsers
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            if (data && data.latitude && data.longitude) {
              applyLocation(data.latitude, data.longitude, data.city ? `${data.city}, Sri Lanka` : 'Sri Lanka');
            }
          })
          .catch(() => {
            if (locateText) locateText.innerText = 'Locate Me';
            if (errorEl) {
              errorEl.innerText = 'Please type your city or address in the search box.';
              errorEl.classList.remove('hidden');
            }
          });
      }
    }

    // City Coordinates Map for Instant Search Matching
    const SEARCH_CITY_COORDS = {
      colombo: { lat: 6.9271, lng: 79.8612, name: 'Colombo' },
      nugegoda: { lat: 6.8649, lng: 79.8997, name: 'Nugegoda' },
      dehiwala: { lat: 6.8415, lng: 79.8680, name: 'Dehiwala' },
      kandy: { lat: 7.2936, lng: 80.6382, name: 'Kandy' },
      galle: { lat: 6.0367, lng: 80.2170, name: 'Galle' },
      matara: { lat: 5.9496, lng: 80.5469, name: 'Matara' },
      kurunegala: { lat: 7.4863, lng: 80.3647, name: 'Kurunegala' },
      negombo: { lat: 7.2083, lng: 79.8358, name: 'Negombo' },
      gampaha: { lat: 7.0840, lng: 79.9939, name: 'Gampaha' },
      kadawatha: { lat: 7.0016, lng: 79.9535, name: 'Kadawatha' },
      battaramulla: { lat: 6.9012, lng: 79.9180, name: 'Battaramulla' },
      jaffna: { lat: 9.6615, lng: 80.0255, name: 'Jaffna' },
      anuradhapura: { lat: 8.3114, lng: 80.4037, name: 'Anuradhapura' },
      badulla: { lat: 6.9934, lng: 81.0550, name: 'Badulla' },
      ratnapura: { lat: 6.6828, lng: 80.4005, name: 'Ratnapura' }
    };

    function handleShopSearch(e) {
      if (e) e.preventDefault();
      const input = document.getElementById('shop-search-input');
      const statusEl = document.getElementById('shop-location-status');
      const errorEl = document.getElementById('shop-location-error');
      if (!input) return;

      const q = input.value.trim().toLowerCase();
      currentSearchText = q;

      if (errorEl) errorEl.classList.add('hidden');

      let matchedCity = null;
      for (const [key, coords] of Object.entries(SEARCH_CITY_COORDS)) {
        if (q.includes(key)) {
          matchedCity = coords;
          break;
        }
      }

      if (matchedCity) {
        currentShopUserLocation = {
          lat: matchedCity.lat,
          lng: matchedCity.lng,
          name: matchedCity.name
        };
        if (statusEl) {
          statusEl.innerHTML = `📍 Searching near <strong>${matchedCity.name}</strong> • Nearest shops first.`;
          statusEl.classList.remove('hidden');
        }
        if (shopMapInstance) {
          shopMapInstance.flyTo({ center: [matchedCity.lng, matchedCity.lat], zoom: 12, essential: true });
        }
      } else {
        const allShops = getLocalShops();
        const found = allShops.find(s => 
          (s.city || '').toLowerCase().includes(q) ||
          (s.name || '').toLowerCase().includes(q)
        );
        if (found) {
          currentShopUserLocation = { lat: found.lat, lng: found.lng, name: found.city };
          if (statusEl) {
            statusEl.innerHTML = `📍 Showing results matching "<strong>${escapeHtml(input.value.trim())}</strong>"`;
            statusEl.classList.remove('hidden');
          }
          if (shopMapInstance) {
            shopMapInstance.flyTo({ center: [found.lng, found.lat], zoom: 12, essential: true });
          }
        }
      }

      renderShops();
    }

    // REAL-TIME SYNCHRONIZATION (CROSS-DEVICE CLOUD DB + LOCAL STORAGE)
    let isCloudSyncing = false;
    async function syncFromCloudDatabase() {
      if (isCloudSyncing) return;
      isCloudSyncing = true;
      try {
        const res = await fetch(CLOUD_DB_ENDPOINT + '?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json && Array.isArray(json.shops)) {
            const cloudShops = json.shops;
            const currentJson = JSON.stringify(cloudShops);
            if (currentJson !== lastKnownShopsSnapshot) {
              lastKnownShopsSnapshot = currentJson;
              localStorage.setItem(SHOPS_STORAGE_KEY, currentJson);
              renderShops();
            }
            isCloudSyncing = false;
            return;
          }
        }
      } catch (e) {
        console.warn('Cloud sync error, attempting local fallback:', e);
      }

      // Fallback: check local shops.json
      try {
        const localRes = await fetch('./shops.json?t=' + Date.now(), { cache: 'no-store' });
        if (localRes.ok) {
          const localJson = await localRes.json();
          if (localJson && Array.isArray(localJson.shops) && localJson.shops.length > 0) {
            const currentJson = JSON.stringify(localJson.shops);
            if (currentJson !== lastKnownShopsSnapshot) {
              lastKnownShopsSnapshot = currentJson;
              localStorage.setItem(SHOPS_STORAGE_KEY, currentJson);
              renderShops();
            }
          }
        }
      } catch (err) {}

      isCloudSyncing = false;
    }

    // 1. Same-device instant tab sync
    if (shopsBroadcastChannel) {
      shopsBroadcastChannel.onmessage = (event) => {
        if (event.data && event.data.type === 'SHOPS_CHANGED') {
          syncFromCloudDatabase();
        }
      };
    }
    window.addEventListener('storage', (event) => {
      if (event.key === SHOPS_STORAGE_KEY) {
        renderShops();
      }
    });

    // 2. Cross-device cloud poll every 4 seconds
    setInterval(() => {
      syncFromCloudDatabase();
    }, 4000);

    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.hash === '#admin') {
        window.location.href = 'admin.html';
        return;
      }
      renderProducts();
      renderProjectsAndClients();
      runCalculator();
      renderShops();
      initShopsMap();
      syncFromCloudDatabase();
    });
  </script>
  <!-- Floating WhatsApp Quick Action Button -->
  <a 
    href="https://wa.me/94773774340?text=Hello%20JADE%20Coatings%2C%20I%20would%20like%20to%20inquire%20about%20your%20products." 
    target="_blank" 
    rel="noopener noreferrer" 
    class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl shadow-[#25D366]/40 hover:scale-105 active:scale-95 transition-all duration-300 group"
    title="Text JADE Coatings on WhatsApp right away (077 377 4340)"
  >
    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    <span class="text-xs sm:text-sm font-bold tracking-tight pr-1">Text on WhatsApp</span>
  </a>
<?php wp_footer(); ?>
</body>
</html>
