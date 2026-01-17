<template>
  <div class="policy-container">
    <h1>Privacy Policy</h1>
    <p>
      At MorrowLab, we are committed to protecting your privacy in compliance with the <strong>Data Privacy Act of 2012 (Republic Act No. 10173)</strong> of the Philippines. This Privacy Policy explains how we collect, use, and safeguard your personal information.
    </p>
    <h2>Information We Collect</h2>
    <p>
      We may collect the following personal information:
    </p>
    <ul>
      <li>Your name, email address, and contact details when you voluntarily provide them to us.</li>
      <li>Technical information such as your IP address, browser type, and device information when you visit our website.</li>
    </ul>
    <h2>How We Use Your Information</h2>
    <p>
      We use your personal information for the following purposes:
    </p>
    <ul>
      <li>To respond to your inquiries and provide customer support.</li>
      <li>To improve our website and services.</li>
      <li>To communicate with you about our offerings, promotions, and updates (with your consent).</li>
    </ul>
    <h2>Data Sharing and Disclosure</h2>
    <p>
      We do not share your personal information with third parties unless:
    </p>
    <ul>
      <li>You have given your explicit consent.</li>
      <li>It is required by law or legal process.</li>
      <li>It is necessary to protect our rights, property, or safety, or that of others.</li>
    </ul>
    <h2>Data Security</h2>
    <p>
      We implement reasonable organizational, technical, and physical security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
    </p>
    <h2>Your Rights Under the Data Privacy Act</h2>
    <p>
      As a data subject, you have the following rights:
    </p>
    <ul>
      <li><strong>Right to Access:</strong> You may request access to your personal information.</li>
      <li><strong>Right to Correction:</strong> You may request corrections to any inaccurate or incomplete data.</li>
      <li><strong>Right to Erasure:</strong> You may request the deletion of your personal information under certain conditions.</li>
      <li><strong>Right to Object:</strong> You may object to the processing of your personal information.</li>
      <li><strong>Right to Data Portability:</strong> You may request a copy of your data in a structured, commonly used format.</li>
    </ul>
    <p>
      To exercise these rights, please contact us at <a href="mailto:morrowlabstudio@gmail.com">morrowlabstudio@gmail.com</a>.
    </p>
    <h2>Changes to This Policy</h2>
    <p>
      We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will notify you of significant changes through email (if applicable).
    </p>
    <h2>Contact Us</h2>
    <p>
      If you have any questions or concerns about this Privacy Policy or your personal data, please contact our Data Protection Officer at <a href="mailto:morrowlabstudio@gmail.com">morrowlabstudio@gmail.com</a>.
    </p>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Privacy Policy',
  description: 'MorrowLab Studio Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with the Data Privacy Act of 2012 of the Philippines.',
  ogTitle: 'Privacy Policy | MorrowLab Studio',
  ogDescription: 'Our commitment to protecting your privacy and personal data in accordance with Philippine data privacy laws.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/privacy-policy',
  robots: 'index, follow'
});
</script>

<style scoped>
.policy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Geist', sans-serif;
  color: black;
  line-height: 1.6;
}

h1 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 20px;
}

ul {
  margin-bottom: 20px;
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

a {
  color: black;
  text-decoration: underline;
}

a:hover {
  opacity: 0.8;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.9rem;
  }
}
</style>