<template>
  <div>
    <label v-if="label" class="font-ibimplex mb-2">{{ label }}</label>
    <div class="relative">
      <input
        v-bind="$attrs"
        :class="__class"
        :type="type"
        v-model="value.value"
        class="inline-block"
      />
      <component
        v-if="_icon"
        @click="iconClicked"
        :is="_icon"
        :size="22"
        class="absolute -top-0 bottom-0 my-auto left-40"
        :class="[
          full ? 'right-2 left-auto' : '',
          styleType == 'grey-pry' ? 'bg-[#DCDCDC]' : '',
          iconClick ? 'cursor-pointer' : '',
        ]"
      ></component>
    </div>
    <p v-if="value.error" class="font-ibimplex mt-2 text-xs text-red-600">
      {{ value.error }}
    </p>
  </div>
</template>

<script lang="ts">
import EyeClosed from "../svgs/eye-closed.vue";
import EyeOpen from "../svgs/eye-open.vue";
// import EyeCloseIcon from "../icons/eye-close-icon.vue";
// import EyeOpenIcon from "../icons/eye-open-icon.vue";
import { computed, ref, watchEffect } from "vue";

export default {
  inheritAttrs: false,
  components: {
    EyeOpen,
    EyeClosed,
  },
  props: {
    value: {
      type: String,
      default: () => ({
        error: null,
        value: null,
      }),
    },
    icon: {
      type: Object,
    },
    label: {
      type: String,
    },
    size: {
      type: String,
      default: "medium",
    },
    full: {
      type: Boolean,
      default: false,
    },
    styleType: {
      type: String,
    },
    iconClick: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let styleTypes = {
      "grey-pry":
        "bg-[#DCDCDC] rounded-2xl text-black focus:border-pry border-2 border-[#DCDCDC] rounded-lg",
      white:
        "bg-[#fff] rounded-2xl text-black focus:border-pry border-2 border-[#DCDCDC] rounded-lg",
    };
    let base = "";
    let sizes = {
      small: "py-2 px-2",
      medium: "p-3",
      big: "py-6 px-8",
      large: "py-6 px-10 txt-s-6 ",
    };

    let __class = computed(() => {
      let __base =
        base +
        (sizes[props.size] ?? sizes["medium"]) +
        " " +
        (styleTypes[props.styleType] ?? styleTypes["grey-pry"]);
      if (props.full) {
        __base += " w-full";
      }

      return __base;
    });

    let { attrs } = context;

    let type = ref(attrs.type);
    let hidden = ref(false);

    let _icon = ref(null);
    if (type.value != "password") {
      _icon.value = props.icon;
    } else {
      _icon.value = EyeClosed;
    }
    function iconClicked() {
      hidden.value = !hidden.value;
      if (hidden.value) {
        _icon.value = EyeOpen;
        type.value = "text";
      } else {
        _icon.value = EyeClosed;
        type.value = "password";
      }
    }
    return {
      type,
      __class,
      _icon,
      iconClicked,
    };
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>
