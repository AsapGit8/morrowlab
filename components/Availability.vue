<template>
  <div class="availability-container">
    <div class="availability-content">
      <div class="glow-dot"></div>
      <span class="availability-text">Inquiries Open for February 2026</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.availability-container {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 1000;
  pointer-events: none;
}

.availability-content {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 50px;
  pointer-events: auto;
}

.glow-dot {
  width: 10px;
  height: 10px;
  background-color: #00ff88;
  border-radius: 50%;
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

.glow-dot::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background-color: #00ff88;
  border-radius: 50%;
  opacity: 0.3;
  animation: glow 2s ease-in-out infinite;
}

.availability-text {
  font-family: 'Geist', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes glow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@media screen and (max-width: 768px) {
  .availability-container {
    bottom: 20px;
    left: 20px;
  }

  .availability-content {
    padding: 10px 16px;
    gap: 10px;
  }

  .glow-dot {
    width: 8px;
    height: 8px;
  }

  .glow-dot::before {
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
  }

  .availability-text {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 480px) {
  .availability-container {
    bottom: 15px;
    left: 15px;
  }

  .availability-content {
    padding: 8px 14px;
    gap: 8px;
  }

  .glow-dot {
    width: 7px;
    height: 7px;
  }

  .availability-text {
    font-size: 0.7rem;
  }
}
</style>