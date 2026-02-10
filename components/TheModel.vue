<template>
  <primitive
    v-if="scene"
    :object="scene"
    :scale="scaleValue"
    :position="position"
    :rotation="rotationValue"
  />
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import * as THREE from 'three'

interface Props {
  modelPath: string
  scale?: number | [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
}

const props = withDefaults(defineProps<Props>(), {
  scale: 1,
  position: () => [0, 0, 0],
  rotation: () => [0, 0, 0]
})

const emit = defineEmits<{
  load: []
  error: [error: Error]
}>()

const scaleValue = computed(() => {
  if (typeof props.scale === 'number') {
    return [props.scale, props.scale, props.scale]
  }
  return props.scale
})

const rotationValue = computed(() => {
  return props.rotation.map(r => THREE.MathUtils.degToRad(r))
})

try {
  const { scene } = await useGLTF(props.modelPath, { draco: true })
  
  onMounted(() => {
    emit('load')
  })
} catch (err) {
  emit('error', err instanceof Error ? err : new Error('Failed to load model'))
}
</script>