export default defineNuxtPlugin({
  name: 'spline-viewer',
  parallel: true,
  async setup() {
    if (process.client) {
      try {
        await import('@splinetool/viewer');
        console.log('Spline Viewer loaded successfully');
      } catch (error) {
        console.error('Failed to load Spline Viewer:', error);
      }
    }
  },
});