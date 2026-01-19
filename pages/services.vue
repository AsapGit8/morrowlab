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
                <span class="text-line">full-stack software development studio</span>
              </h1>
              <p class="reveal-text">
                <span class="text-line">From early-stage MVPs to income-generating platforms, we</span>
                <span class="text-line">transform ideas into market-ready software. MorrowLab builds</span>
                <span class="text-line">problem-solving systems using the same modern tech stacks</span>
                <span class="text-line">used in Silicon Valley, integrated with secure infrastructure and</span>
                <span class="text-line">maintainable architectures designed for long-term growth.</span>
              </p>
             
              <div class="scroll-down-indicator" id="scroll-indicator">
              </div>
            </div>
          </div>

          <div class="section section-2">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">mobile app development iOS & Android</span>
              </h1>
              <p class="reveal-text">
                <span class="text-line">Build the next industry giant. We create mobile apps capable of</span>
                <span class="text-line">reaching unicorn-level scale like Grab, Gcash, or Airbnb. With</span>
                <span class="text-line">registered Google Play and Apple Organization Developer</span>
                <span class="text-line">accounts, we launch applications built for speed, reliability,</span>
                <span class="text-line">and real-world success.</span>
              </p>
            </div>
          </div>

          <div class="section section-3">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">creative web design & motion</span>
              </h1>
              <p class="reveal-text">
                <span class="text-line">Whether you need a brand-focused marketing site or a full-scale</span>
                <span class="text-line">SaaS ecosystem, we bridge the gap between stunning design</span>
                <span class="text-line">and technical precision. We pair fluid animations with logic</span>
                <span class="text-line">to ensure your digital presence is as fast as it is captivating.</span>
              </p>
            </div>
          </div>

          <div class="section section-4">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">front-end development services</span>
              </h1>
              <div class="services-list">
                <h3 class="reveal-text hover-animate"><span class="text-line">Art Direction</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">App UI Development</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Intuitive UI/UX Design</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Brand Identity & Strategy</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">User-Centric Mobile Design</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">2D/3D Animations & Motion Graphics</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Modern Website Design & Development</span></h3>
              </div>
            </div>
          </div>

          <div class="section section-5">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">back-end development services</span>
              </h1>
              <div class="services-list">
                <h3 class="reveal-text hover-animate"><span class="text-line">API Development</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">User Authentication Systems</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Cloud Storage Implementation</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Database Design & Management</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Real-time Broadcast Solutions</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">App Edge Function Development</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Serverless Function Deployment</span></h3>
                <h3 class="reveal-text hover-animate"><span class="text-line">Webhooks & Third-party Integrations</span></h3>
              </div>
            </div>
          </div>

          <div class="section section-6">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">maintenance & support</span>
              </h1>
              
              <div class="maintenance-table reveal-text">
                <div class="maintenance-row">
                  <span class="maintenance-service">Free Maintenance Period</span>
                  <span class="maintenance-detail">2 Years</span>
                </div>
                <div class="maintenance-row">
                  <span class="maintenance-service">Bug Fixes & Security Patches</span>
                  <span class="maintenance-detail">Included</span>
                </div>
                <div class="maintenance-row">
                  <span class="maintenance-service">Limited Minor Tweaks</span>
                  <span class="maintenance-detail">Included</span>
                </div>
                <div class="maintenance-row">
                  <span class="maintenance-service">Quarterly Software Updates</span>
                  <span class="maintenance-detail">Included</span>
                </div>
                <div class="maintenance-row">
                  <span class="maintenance-service">Payment Model</span>
                  <span class="maintenance-detail">One-Time Fee</span>
                </div>
                <div class="maintenance-row">
                  <span class="maintenance-service">Monthly/Yearly Fees</span>
                  <span class="maintenance-detail">None - charges apply as users grow</span>
                </div>
                <div class="maintenance-row">
                  <span class="maintenance-service">Infrastructure Scaling</span>
                  <span class="maintenance-detail">As Needed</span>
                </div>
              </div>

              <p class="maintenance-note reveal-text">
                <span class="text-line">Major feature additions or significant modifications are billed separately. Additional charges apply only when increased user traffic requires scaling your infrastructure beyond the initial scope.</span>
              </p>
            </div>
          </div>
          
          <div class="section section-7">
            <div class="content">
              <h1 class="reveal-text">
                <span class="text-line">pricing | base project rates</span>
              </h1>
              
              <div class="pricing-table reveal-text">
                <div class="pricing-row">
                  <span class="pricing-amount">₱90k+ <span class="dollar-amount">| $1.5k</span></span>
                  <span class="pricing-service">Web essentials</span>
                </div>
                <div class="pricing-row">
                  <span class="pricing-amount">₱300k+ <span class="dollar-amount">| $5k</span></span>
                  <span class="pricing-service">Advanced web</span>
                </div>
                <div class="pricing-row">
                  <span class="pricing-amount">₱800K+ <span class="dollar-amount">| $14k</span></span>
                  <span class="pricing-service">Mobile apps</span>
                </div>
                <div class="pricing-row">
                  <span class="pricing-amount">₱3M+ <span class="dollar-amount">| $50k</span></span>
                  <span class="pricing-service">SaaS & Platforms</span>
                </div>
                <div class="pricing-row">
                  <span class="pricing-amount">Custom Price</span>
                  <span class="pricing-service">Government</span>
                </div>
              </div>

              <p class="pricing-note reveal-text">
                <span class="text-line">Our project fees vary depending on scope, complexity, and timeline. Base pricing is tailored to your project's requirements, with a maximum budget ceiling of ₱100M+.</span>
              </p>

              <p class="pricing-note reveal-text">
                <span class="text-line">Simple projects can be delivered in a few months, while more complex applications may take up to a year or more to design, develop, test, and launch.</span>
              </p>

              <p class="pricing-note reveal-text">
                <span class="text-line">From a simple business website to an industry-leading application, MorrowLab is your partner, managing every step so your project succeeds.</span>
              </p>

              <p class="reveal-text contact-note">
                <span class="text-line email-container">
                  <NuxtLink to="/contact" class="modern-button">Let's Meet</NuxtLink>
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
import { ref, onMounted } from "vue";
import PageTransition from "@/components/PageTransition.vue";
import Footer from "@/components/Footer.vue";
import Availability from "@/components/Availability.vue";
import gsap from "gsap";

const config = useRuntimeConfig();

useSeoMeta({
  title: 'Services',
  description: 'Full-stack software development, mobile app development for iOS and Android, creative web design, front-end and back-end development services. Modern tech stacks used in Silicon Valley.',
  ogTitle: 'Services | MorrowLab Studio',
  ogDescription: 'Professional software development services including mobile apps, web development, UI/UX design, and full-stack solutions.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/services'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/services#webpage`,
        url: `${config.public.siteUrl}/services`,
        name: 'Services - MorrowLab Studio',
        description: 'Full-stack software development, mobile app development, web design, and back-end development services.',
        isPartOf: {
          '@id': `${config.public.siteUrl}/#website`
        },
        about: {
          '@id': config.public.organizationId
        },
        datePublished: '2026-01-17',
        dateModified: '2026-01-17',
        inLanguage: 'en-US'
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Software Development',
        provider: {
          '@id': config.public.organizationId
        },
        areaServed: {
          '@type': 'Country',
          name: 'Philippines'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Software Development Services',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'Mobile App Development',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'iOS & Android Development',
                    description: 'Native mobile app development for iOS and Android platforms'
                  }
                }
              ]
            },
            {
              '@type': 'OfferCatalog',
              name: 'Web Development',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Web Essentials',
                    description: 'Essential web development services',
                    offers: {
                      '@type': 'Offer',
                      price: '90000',
                      priceCurrency: 'PHP'
                    }
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Advanced Web',
                    description: 'Advanced web applications and platforms',
                    offers: {
                      '@type': 'Offer',
                      price: '300000',
                      priceCurrency: 'PHP'
                    }
                  }
                }
              ]
            },
            {
              '@type': 'OfferCatalog',
              name: 'Front-end Development',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'UI/UX Design',
                    description: 'Intuitive user interface and experience design'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Brand Identity & Strategy',
                    description: 'Brand development and strategic planning'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '2D/3D Animations & Motion Graphics',
                    description: 'Advanced animation and motion design'
                  }
                }
              ]
            },
            {
              '@type': 'OfferCatalog',
              name: 'Back-end Development',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'API Development',
                    description: 'RESTful and GraphQL API development'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Database Design & Management',
                    description: 'Scalable database architecture and management'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Cloud Storage Implementation',
                    description: 'Cloud-based storage solutions'
                  }
                }
              ]
            }
          ]
        }
      })
    }
  ]
});

const showLoadingScreen = ref(true);
const isSplineLoaded = ref(false);

const handleLoadingFinished = () => {
  showLoadingScreen.value = false;
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
  padding-left: 40px;
  padding-right: 40px;
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
  padding-right: 40px;
  padding-left: 40px;
}

.section-5 .content {
  margin-left: auto;
  text-align: right;
}

.section-6 {
  background-color: white;
  padding-left: 40px;
  padding-right: 40px;
}

.section-7 {
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

.maintenance-table {
  margin-top: 30px;
  margin-bottom: 30px;
}

.maintenance-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.maintenance-row:last-child {
  border-bottom: none;
}

.maintenance-service {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: black;
}

.maintenance-detail {
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: black;
  text-align: right;
  min-width: 150px;
}

.maintenance-note {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 10px;
}

.maintenance-note .text-line {
  font-weight: 400;
}

.pricing-table {
  margin-top: 30px;
  margin-bottom: 30px;
}

.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pricing-row:last-child {
  border-bottom: none;
}

.pricing-amount {
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: black;
  min-width: 150px;
}

.dollar-amount {
  opacity: 0.3;
  font-weight: 400;
}

.pricing-service {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: black;
  text-align: right;
}

.pricing-note {
  font-family: 'Geist', sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 10px;
  margin-bottom: 10px;
}

.pricing-note .text-line {
  font-weight: 400;
}

.contact-note {
  margin-top: 20px;
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

  .maintenance-service {
    font-size: 0.9rem;
  }

  .maintenance-detail {
    font-size: 1rem;
    min-width: 130px;
  }

  .maintenance-note {
    font-size: 0.85rem;
  }

  .pricing-amount {
    font-size: 1rem;
    min-width: 130px;
  }

  .pricing-service {
    font-size: 0.9rem;
  }

  .pricing-note {
    font-size: 0.85rem;
  }
}

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
  .section-3,
  .section-6,
  .section-7 {
    padding-left: 20px;
    padding-right: 0px;
  }

  .maintenance-service {
    font-size: 0.8rem;
  }

  .maintenance-detail {
    font-size: 0.9rem;
    min-width: 110px;
  }

  .maintenance-note {
    font-size: 0.8rem;
  }

  .pricing-amount {
    font-size: 0.9rem;
    min-width: 110px;
  }

  .pricing-service {
    font-size: 0.8rem;
  }

  .pricing-note {
    font-size: 0.8rem;
  }
}

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
 
  .section-1, .section-2, .section-3, .section-4, .section-5, .section-6, .section-7 {
    padding: 30px 20px;
  }
 
  .section-4 .content, .section-5 .content {
    text-align: right;
    margin-left: auto;
  }

  .section-6 .content, .section-7 .content {
    text-align: left;
    margin-left: 0;
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

  .maintenance-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .maintenance-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0;
    gap: 4px;
  }

  .maintenance-service {
    font-size: 0.85rem;
  }

  .maintenance-detail {
    font-size: 1.1rem;
    min-width: auto;
    text-align: left;
  }

  .maintenance-note {
    font-size: 0.85rem;
  }

  .pricing-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .pricing-row {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0;
    gap: 4px;
  }

  .pricing-amount {
    font-size: 1.1rem;
    min-width: auto;
  }

  .pricing-service {
    font-size: 0.85rem;
    text-align: left;
  }

  .pricing-note {
    font-size: 0.85rem;
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
 
  .section-1, .section-2, .section-3, .section-4, .section-5, .section-6, .section-7 {
    padding: 20px 15px;
  }
 
  .section .content {
    max-width: 100%;
  }
 
  p .text-line {
    display: inline;
    padding-right: 0.2em;
  }

  .maintenance-service {
    font-size: 0.8rem;
  }

  .maintenance-detail {
    font-size: 1rem;
  }

  .maintenance-note {
    font-size: 0.8rem;
  }

  .pricing-amount {
    font-size: 1rem;
  }

  .pricing-service {
    font-size: 0.8rem;
  }

  .pricing-note {
    font-size: 0.8rem;
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