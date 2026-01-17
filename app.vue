<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | MorrowLab Studio` : 'MorrowLab Studio - Software Development Studio in Manila'
  }
});
</script>