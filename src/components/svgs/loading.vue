<template>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 50 50"
    >
      <g class="circular">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
          stroke-miterlimit="10"
          stroke="currentColor"
        />
      </g>
    </svg>
</template>

<script></script>

<style scoped>
.circular {
  animation: Circular-_-rotate 2s linear infinite;
  height: 50px;
  transform-origin: center center;
  width: 50px;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: Circular-_-dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes Circular-_-rotate {
  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

@keyframes Circular-_-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
