export default function useUserScreenSize() {
  let screenSize = ref<number>(window.innerWidth);
  let deviceType = ref<null | "mobile" | "tablet" | "desktop">(null);
  function getUserScreenSize() {
    if (process.client) {
      screenSize.value = window.innerWidth;
    }
  }
  let computedScreenSize = computed<number>(() => {
    return screenSize.value;
  });
  // let computedDeviceType = computed(() => {
  //   if (screenSize.value <= 768) {
  //     deviceType.value = "mobile";
  //   } else if (
  //     screenSize.value > 768 &&
  //     screenSize.value <= 1024
  //   ) {
  //     deviceType.value = "tablet";
  //   } else {
  //     deviceType.value = "desktop";
  //   }
  //   return deviceType.value;
  // });
  watchEffect(() => {
    if (screenSize.value <= 768) {
      deviceType.value = "mobile";
    } else if (
      screenSize.value > 768 &&
      screenSize.value <= 1024
    ) {
      deviceType.value = "tablet";
    } else {
      deviceType.value = "desktop";
    }
  })
  const computedDeviceType = computed(() => {
    return deviceType.value
  })
  window.addEventListener("resize", getUserScreenSize);
  return {
    screenSize,
    getUserScreenSize,
    deviceType,
    computedScreenSize,
    computedDeviceType,
  };
}
