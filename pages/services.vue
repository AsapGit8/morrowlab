<template>
  <div>
    <PageTransition v-if="showLoadingScreen" @finished="handleLoadingFinished" />

    <div v-show="!showLoadingScreen" class="main-container">
      <div class="main">
        <div class="left-box">
          <client-only>
            <spline-viewer
              v-if="isSplineLoaded"
              url="https://prod.spline.design/9Iyv-ENrpxDILmsu/scene.splinecode"
            ></spline-viewer>
          </client-only>
        </div>
        <div class="right-box" data-lenis-prevent>
          <div class="section section-1">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">creative web development studio</span>
              </h1>
              <p class="reveal-text">
                <span class="text-line">Your website should do more than just exist. It should turn</span>
                <span class="text-line">visitors into customers. MorrowLab builds high-performing</span>
                <span class="text-line">websites with fluid animations, immersive 3D elements,</span>
                <span class="text-line">and impactful branding. Designed to captivate and built to</span>
                <span class="text-line">last for years.</span>
              </p>
             
              <div class="scroll-down-indicator" id="scroll-indicator">
                <!-- Characters will be inserted via JS -->
              </div>
            </div>
          </div>

          <div class="section section-2">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">cloud-based web application</span>
              </h1>
              <p class="reveal-text">
                <span class="text-line">Develop powerful and scalable web applications with our</span>
                <span class="text-line">cloud-first approach. We create modern, secure, and reliable</span>
                <span class="text-line">digital solutions that integrate effortlessly into your business.</span>
                <span class="text-line">Partner with us to transform your ideas into exceptional user </span>
                <span class="text-line">experiences, from concept to launch.</span>
              </p>
            </div>
          </div>

          <div class="section section-3">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">front-end development services</span>
              </h1>
              <div class="services-list">
                <h3 class="reveal-text hover-animate"><span class="text-line">Art Direction</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Intuitive UI/UX Design</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Brand Identity & Strategy</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">User-Centric Mobile Design</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">2D/3D Animations & Motion Graphics</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Modern Website Design & Development</span></h3>
                <h3 class="reveal-text app hover-animate"><span class="text-line">App UI Development - Available Soon</span></h3>
              </div>
            </div>
          </div>

          <div class="section section-4">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">back-end development services</span>
              </h1>
              <div class="services-list">
                <h3 class="reveal-text hover-animate"><span class="text-line">API Development</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">User Authentication Systems</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Real-time Database Solutions</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Cloud Storage Implementation</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Serverless Function Deployment</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Database Design & Management</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Webhooks & Third-party Integrations</span></h3>
                <h3 class="reveal-text app hover-animate"><span class="text-line">App Development - Available Soon</span></h3>
              </div>
            </div>
          </div>
          
          <div class="section section-5">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">pricing | project rates</span>
              </h1>
              <p class="reveal-text">
                <span class="text-line">To initiate your project,</span>
              </p>
              <p class="reveal-text">
                <span class="text-line">our base packages start at 300,000 PHP</span>
              </p>
              <p class="reveal-text">
                <span class="text-line">software development starts at 1.2 Million</span>
              </p>
              <p class="reveal-text">
                <span class="text-line email-container">
                  <NuxtLink to="/contact" class="modern-button">Book a 20 min meeting today</NuxtLink>
                </span>
              </p>
            </div>
          </div>
         
          <div class="mobile-footer">
            <Footer />
          </div>
        </div>
      </div>

      <div class="desktop-footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import PageTransition from "@/components/PageTransition.vue";
import Footer from "@/components/Footer.vue";
import gsap from "gsap";

const showLoadingScreen = ref(true);
const isSplineLoaded = ref(false);
const splineViewer = ref(null);

const handleLoadingFinished = () => {
  showLoadingScreen.value = false;
};

// Clean up Spline viewer - CORRECTED FUNCTION
const cleanupSplineViewer = () => {
  if (splineViewer.value) {
    const element = splineViewer.value.$el || splineViewer.value;
    if (element) {
      try {
        // Reset the viewer's content
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
        
        // Clear any WebGL contexts
        const canvas = element.querySelector('canvas');
        if (canvas) {
          const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
          if (gl) {
            gl.getExtension('WEBGL_lose_context')?.loseContext();
          }
        }
      } catch (error) {
        console.warn('Error cleaning up spline viewer:', error);
      }
    }
  }
};

onMounted(() => {
  if (process.client) {
    import('@splinetool/viewer')
      .then(() => {
        isSplineLoaded.value = true;
        console.log('Spline Viewer loaded successfully');
      })
      .catch((err) => {
        console.error('Error loading Spline Viewer:', err);
      });
  }

  // Set up letter-by-letter scroll down indicator animation
  const scrollIndicator = document.getElementById('scroll-indicator');
  const scrollText = "Scroll Down";
 
  if (scrollIndicator) {
    scrollIndicator.innerHTML = '';
    for (let i = 0; i < scrollText.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('scroll-char');
      charSpan.textContent = scrollText[i];
      scrollIndicator.appendChild(charSpan);
    }
   
    const characters = scrollIndicator.querySelectorAll('.scroll-char');
   
    gsap.fromTo(characters,
      { opacity: 0.3 },
      {
        opacity: 1,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true
        },
        duration: 0.8,
        ease: "power1.inOut"
      }
    );
   
    const rightBox = document.querySelector('.right-box');
    if (rightBox) {
      rightBox.addEventListener('scroll', () => {
        if (rightBox.scrollTop > 50) {
          gsap.to(scrollIndicator, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          gsap.to(scrollIndicator, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in"
          });
        }
      });
    }
  }

  // Set up hover animations for h3 elements only
  const h3Elements = document.querySelectorAll('.hover-animate');
 
  h3Elements.forEach(el => {
    const textLine = el.querySelector('.text-line');
   
    el.addEventListener('mouseenter', () => {
      gsap.fromTo(textLine,
        {
          y: "0%",
          opacity: 1,
        },
        {
          y: "100%",
          opacity: 0,
          rotationX: -20,
          transformOrigin: "0% 50% -50",
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.fromTo(textLine,
              {
                y: "100%",
                opacity: 0,
                rotationX: -20,
                transformOrigin: "0% 50% -50",
              },
              {
                y: "0%",
                opacity: 1,
                rotationX: 0,
                duration: 0.5,
                ease: "power3.out"
              }
            );
          }
        }
      );
    });
  });

  // Set up GSAP animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const textLines = entry.target.querySelectorAll('.text-line');
       
        gsap.killTweensOf(textLines);
       
        gsap.fromTo(textLines,
          {
            y: "100%",
            opacity: 0,
            rotationX: -20,
            transformOrigin: "0% 50% -50",
          },
          {
            y: "0%",
            opacity: 1,
            rotationX: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: "power3.out",
            onComplete: () => observer.unobserve(entry.target)
          }
        );
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-text').forEach(el => {
    observer.observe(el);
  });
});

// Clean up on component unmount
onBeforeUnmount(() => {
  cleanupSplineViewer();
});

useHead({
  title: 'Services | Web Development Philippines',
  meta: [
    { name: 'description',
      content: 'MorrowLab offers premium web design and development, alongside custom cloud-based web application development for premium brands in the Philippines and beyond. We specialize in immersive 3D websites and scalable solutions for innovative digital transformation.' }
  ]
})
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  display: flex;
  height: 100dvh;
  flex: 1;
}

h1,
h2,
h3,
p {
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.03em;
  margin: 0;
  padding: 0;
}

h1,
h2 {
  font-weight: 400;
  font-size: 1rem;
  padding-bottom: 20px;
}

h3 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0.5em;
  cursor: pointer;
}

p {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5em;
}

.app {
  opacity: 0.3;
}

.left-box {
  flex: 1;
  background-color: #fdfdfd;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.right-box {
  flex: 1;
  margin-left: 50%;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.section {
  height: 100vh;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
}

.content {
  max-width: 600px;
}

.section-1 {
  background-color: white;
  padding-left: 40px;
  padding-right: 40px;
  position: relative;
}

.section-2 {
  background-color: white;
  padding-left: 40px;
  padding-right: 40px;
}

.section-3 {
  background-color: white;
  padding-right: 40px;
  padding-left: 40px;
}

.section-3 .content {
  margin-left: auto;
  text-align: right;
}

.section-4 {
  background-color: white;
  padding-right: 40px;
  padding-left: 40px;
}

.section-4 .content {
  margin-left: auto;
  text-align: right;
}

.section-5 {
  background-color: white;
  padding-left: 40px;
  padding-right: 40px;
}

.reveal-text {
  overflow: hidden;
  display: block;
  margin-bottom: 0.2em;
}

.text-line {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  padding-right: 0.1em;
}

.services-list .reveal-text {
  margin-bottom: 0.2em;
}

.modern-button {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: -0.01em;
  transition: all 0.3s ease;
  border: 1px solid #000;
}

.modern-button:hover {
  background-color: #fff;
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.email-container {
  display: block;
  margin-top: 30px;
}

.mobile-footer {
  display: none;
}

.desktop-footer {
  width: 100%;
  position: relative;
  z-index: 2;
}

.scroll-down-indicator {
  position: absolute;
  bottom: 40px;
  right: 40px;
  font-family: 'Geist', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.scroll-char {
  display: inline-block;
  opacity: 0.3;
}

/* Medium Desktop Screens (like MacBook 14") */
@media screen and (max-width: 1440px) and (min-width: 1024px) {
  p {
    font-size: 1rem;
  }
  
  h1 {
    font-size: 0.875rem;
  }

  h3 {
    font-size: 1.5rem;
  }
  .content {
    max-width: 500px;
  }

}

/* Tablet and Smaller Desktop */
@media screen and (max-width: 1024px) {
  p {
    font-size: 0.875rem;
  }

  h1 {
    font-size: 0.750rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
  .content {
    max-width: 400px;
  }
  .section-1,
  .section-2,
  .section-5 {
    padding-left: 20px;
    padding-right: 0px;
  }
}

/* Mobile Optimization */
@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
  }
 
  .left-box {
    position: fixed;
    width: 100%;
    height: 50dvh;
    top: 0;
    left: 0;
    z-index: 10;
  }
 
  .right-box {
    position: absolute;
    top: 50dvh;
    left: 0;
    margin-left: 0;
    width: 100%;
    height: 50dvh;
    overflow-y: auto;
    padding-bottom: 0;
  }
 
  .section {
    min-height: 50dvh;
    height: auto;
    padding: 30px 20px;
    box-sizing: border-box;
    scroll-snap-align: start;
  }
 
  .section-1, .section-2, .section-3, .section-4, .section-5 {
    padding: 30px 20px;
  }
 
  .section-3 .content, .section-4 .content {
    text-align: right;
    margin-left: auto;
  }
 
  h1, h2 {
    font-size: 0.9rem;
    padding-bottom: 15px;
  }
 
  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.4em;
  }
 
  p {
    font-size: 1rem;
    line-height: 1.4;
  }
 
  p .text-line {
    display: inline;
    width: 100%;
  }
 
  .scroll-down-indicator {
    bottom: 15px;
    right: 15px;
  }
 
  .section .content {
    max-width: 100%;
    width: 100%;
  }
 
  .desktop-footer {
    display: none;
  }
 
  .mobile-footer {
    display: block;
    width: 100%;
    min-height: 100px;
    scroll-snap-align: start;
    position: relative;
    z-index: 5;
  }
 
  .modern-button {
    padding: 10px 20px;
    font-size: 0.9rem;
    margin-top: 20px;
    border-radius: 10px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  h3 {
    font-size: 1rem;
  }
 
  p {
    font-size: 0.9rem;
  }
 
  h1, h2 {
    font-size: 0.8rem;
  }
 
  .section {
    padding: 20px 15px;
  }
 
  .section-1, .section-2, .section-3, .section-4, .section-5 {
    padding: 20px 15px;
  }
 
  .section .content {
    max-width: 100%;
  }
 
  p .text-line {
    display: inline;
    padding-right: 0.2em;
  }
 
  .modern-button {
    display: block;
    padding: 8px 16px;
    font-size: 0.8rem;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    border-radius: 10px;
    max-width: fit-content;
  }
}
</style>