<template>
  <div class="wrapper">
    <!-- Page Transition -->
    <PageTransition v-if="showLoadingScreen" @finished="handleLoadingFinished" />

    <!-- Main Content (Hidden until transition finishes) -->
    <div v-show="!showLoadingScreen" class="content-container">
      <main class="main">
        <div class="cal-container">
          <div class="cal" id="my-cal-inline"></div>
        </div>
      </main>

      <!-- Availability Component -->
      <Availability />

      <!-- Footer (Hidden until transition finishes) -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PageTransition from "@/components/PageTransition.vue";
import Footer from "@/components/Footer.vue";
import Availability from "@/components/Availability.vue";

const showLoadingScreen = ref(true);
let calScript = null;

const handleLoadingFinished = () => {
  showLoadingScreen.value = false;
};

onMounted(() => {
  // Detect mobile device for layout adjustment
  const isMobile = window.innerWidth <= 768;

  calScript = document.createElement("script");
  calScript.type = "text/javascript";
  calScript.innerHTML = `
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    Cal("init", "book-a-meeting", { origin: "https://cal.com" });

    Cal.ns["book-a-meeting"]("inline", {
      elementOrSelector: "#my-cal-inline",
      config: { 
        layout: "${isMobile ? 'month_view' : 'month_view'}",
        hideEventTypeDetails: ${isMobile},
        borderRadius: '8px',
        padding: ${isMobile ? 12 : 16}
      },
      calLink: "morrowlab/book-a-meeting",
    });

    Cal.ns["book-a-meeting"]("ui", { 
      hideEventTypeDetails: ${isMobile}, 
      layout: "${isMobile ? 'month_view' : 'month_view'}" 
    });
  `;
  document.head.appendChild(calScript);

  // Add event listener for resize to handle orientation changes
  window.addEventListener('resize', handleResize);
});

// Clean up when component is destroyed
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (calScript && calScript.parentNode) {
    calScript.parentNode.removeChild(calScript);
  }
});

// Handle resize events (useful for orientation changes)
const handleResize = () => {
  const isMobile = window.innerWidth <= 768;

  // Dynamically update Cal widget settings on resize
  if (window.Cal && window.Cal.ns && window.Cal.ns["book-a-meeting"]) {
    try {
      window.Cal.ns["book-a-meeting"]("ui", { 
        hideEventTypeDetails: isMobile, 
        layout: isMobile ? "month_view" : "month_view",
      });
    } catch (e) {
      console.error("Error updating Cal widget: ", e);
    }
  }
};

// SEO
useHead({
  title: 'Contact | Get in Touch',
  meta: [
    { name: 'description', 
      content: 'Connect with MorrowLab top web developers in Manila and Makati. Ready to transform your digital vision with high-end web design, 3D animations, and innovative front-end solutions for your premium brand.' }
  ]
})
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main {
  width: 100%;
  min-height: 90dvh;
  padding-top: 100px;
  padding-bottom: 100px;
  flex: 1;
}

.cal-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.cal {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (max-width: 768px) {
  .main {
    padding-top: 60px;
    padding-bottom: 60px;
    min-height: 80dvh;
  }
  
  .cal-container {
    padding: 0 16px;
  }
  
  .cal {
    height: auto;
    min-height: 500px;
  }
}

@media (max-width: 480px) {
  .main {
    padding-top: 60px;
    padding-bottom: 40px;
  }
  
  .cal-container {
    padding: 0 12px;
  }
}

@supports (padding: max(0px)) {
  .cal-container {
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
  }
}
</style>