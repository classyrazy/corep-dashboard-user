export default function useUserScreenSize() {
  let screenSize = ref(null);
  let deviceType = ref(null);
  function getUserScreenSize() {
    screenSize.value = window.innerWidth;
    window.addEventListener("resize", () => {
      screenSize.value = window.innerWidth;
    });
    console.log(screenSize.value);
  }
  let computedScreenSize = computed(() => {
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
