<template>
  <div class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-slate-900 text-white perspective-1000">
    
    <!-- Background Animated Elements -->
    <div class="absolute inset-0 z-0 opacity-20">
      <div class="absolute top-10 left-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div class="absolute top-0 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute -bottom-8 left-40 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 text-center max-w-3xl px-4 transform transition-transform duration-700 hover:scale-105 hover:rotate-x-2 hover:-rotate-y-2">
      <h1 class="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-emerald-400 to-purple-400 drop-shadow-lg">
        ECA SHOP
      </h1>
      <p class="text-lg md:text-2xl text-slate-300 mb-10 font-light drop-shadow-md">
        The Next Generation Cloud Retail Experience
      </p>
      
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
        <router-link to="/login" class="group relative px-8 py-4 bg-indigo-600 rounded-full font-bold text-lg overflow-hidden shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all duration-300 transform hover:-translate-y-1">
          <span class="relative z-10">Get Started</span>
          <div class="absolute inset-0 h-full w-0 bg-emerald-500 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 3D and floating animations */
.perspective-1000 { perspective: 1000px; }
.rotate-x-2 { transform: rotateX(2deg); }
.-rotate-y-2 { transform: rotateY(-2deg); }

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>