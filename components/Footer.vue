<template>
  <footer class="footer">
    <div class="top-section">
      <div class="footer-left">
        <div class="footer-content">
          <h4>Reach out and let's discuss your new project</h4>
        </div>
      </div>

      <div class="footer-right">
        <div class="footer-content">
          <p>Let's connect! We're excited to hear about your project, whether it's a fresh concept, a website rebranding, or a collaborative venture. Share your vision, and let's start a conversation. We're passionate about helping you succeed.</p>
          <p>
            <a href="mailto:morrowlabstudio@gmail.com" class="animated-link">morrowlabstudio@gmail.com</a>
          </p>
        </div>
      </div>
    </div>

    <div class="middle-section">
      <h2>morrowlab</h2>
    </div>

    <div class="bottom-section">
      <div class="footer-links">
        <span>©Morrowlab 2026</span>
        <NuxtLink to="/privacy-policy" class="footer-link">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms-and-conditions" class="footer-link">Terms and Conditions</NuxtLink>
      </div>
      <div class="footer-social">
        <a href="https://www.instagram.com/morrowlab.studio" target="_blank" class="social-link" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.facebook.com/morrowlab.studio" target="_blank" class="social-link" rel="noopener noreferrer">Facebook</a>
        <span>Manila, Philippines</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  background-color: black;
  margin: 0;
  padding: 0;
}

.top-section {
  display: flex;
  height: 30dvh;
  flex-direction: row;
}

.footer-left,
.footer-right {
  flex: 1;
  display: flex;
  justify-content: start;
  align-items: top;
  text-align: left;
  padding-top: 50px;
  padding-left: 50px;
  background-color: black;
}

.footer-content {
  max-width: 80%;
}

.middle-section {
  display: flex;
  align-items: center;
  padding-left: 50px;
  height: 60dvh;
  background-color: black;
  overflow: hidden;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  height: 10dvh;
  background-color: black;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-social {
  display: flex;
  gap: 15px;
  align-items: center;
}

h2 {
  font-size: 20rem;
  font-family: 'Bauhaus Std', sans-serif;
  letter-spacing: -0.03em;
  color: white;
  margin: 0;
}

h4 {
  font-weight: 700;
  font-size: 3rem;
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.03em;
  padding: 0;
  margin: 0;
  color: white;
}

p {
  font-weight: 700;
  font-size: 1rem;
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.03em;
  color: white;
}

span {
  font-weight: 400;
  font-size: 0.75rem;
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.03em;
  color: white;
}

.social-link {
  font-size: 0.75rem;
  font-weight: 400;
  font-family: 'Geist', sans-serif;
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #ff6347;
}

.footer-link {
  font-size: 0.75rem;
  font-weight: 400;
  font-family: 'Geist', sans-serif;
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ff6347;
}

/* Underline animation */
.animated-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  position: relative;
}

.animated-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: white;
  transition: width 0.8s ease;
}

.animated-link:hover::after {
  width: 100%;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    height: auto;
    padding-bottom: 2rem;
  }

  .footer-left,
  .footer-right {
    padding: 2rem 1.5rem 0 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .footer-content {
    max-width: 100%;
  }

  h4 {
    font-size: 2rem;
  }

  .middle-section {
    padding-left: 1.5rem;
    height: auto;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  h2 {
    font-size: 4rem;
  }

  .bottom-section {
    flex-direction: column;
    height: auto;
    padding: 1.5rem;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .footer-links,
  .footer-social {
    flex-wrap: wrap;
    width: 100%;
  }

  .footer-social {
    justify-content: flex-start;
  }
}

/* For very small screens */
@media (max-width: 480px) {
  h4 {
    font-size: 1.5rem;
  }

  p {
    font-size: 0.875rem;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>