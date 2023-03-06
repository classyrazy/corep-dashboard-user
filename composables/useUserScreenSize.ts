export default function useUserScreenSize() {
  let screenSize = ref<number>(0);
  let deviceType = ref<null | "mobile"| "tablet"| "desktop">(null);
  function getUserScreenSize() {
    if (process.client) {
      screenSize.value = window.innerWidth;
      window.addEventListener("resize", () => {
        screenSize.value = window.innerWidth;
      });
    }
    console.log(screenSize.value);
  }
  let computedScreenSize = computed<number>(() => {
    return screenSize.value;
  });
  let computedDeviceType = computed(() => {
    if (computedScreenSize.value <= 768) {
      deviceType.value = "mobile";
    } else if (
      computedScreenSize.value > 768 &&
      computedScreenSize.value <= 1024
    ) {
      deviceType.value = "tablet";
    } else {
      deviceType.value = "desktop";
    }
    return deviceType.value;
  });

  return {
    screenSize,
    getUserScreenSize,
    deviceType,
    computedScreenSize,
    computedDeviceType,
  };
}
