<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/" class="logo">morrowlab</NuxtLink>


        <ul class="nav-links">
          <li><NuxtLink to="/services" class="services">services</NuxtLink></li>
          <li><NuxtLink to="/contact" class="contact">book meeting</NuxtLink></li>
        </ul>
      </nav>
    </header>


    <main>
      <slot />
    </main>
  </div>
</template>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}


header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  z-index: 1000;
  box-sizing: border-box;
}


nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px; /* Adjust as needed */
}


.logo {
  color: black;
  text-decoration: none;
  font-size: 0.875rem;
  font-family: "Bauhaus Std";
  transform: translateY(2px); /* Adjust this value as needed */
}


.nav-links {
  display: flex;
  gap: 10px;
  align-items: center;
}


.nav-links li a {
  color: black;
  text-decoration: none;
  font-size: 0.800rem; /* Matched to logo size */
  transition: color 0.3s ease;
}


.nav-links li a:hover {
  color: #ff6347;
}


.services,
.contact {
  font-family: 'Geist', sans-serif;
  font-weight: 500;
}


/* Media queries to ensure font size consistency */
@media (max-width: 768px) {
  .logo,
  .nav-links li a {
    font-size: 0.785rem; /* Consistent font size on mobile */
  }
}


footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  position: relative;
  bottom: 0;
}
</style>