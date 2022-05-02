<template>
  <div>
    <div class=" col">
      <label><slot name="label"></slot>{{ value.value }}</label>
      <div class="relative">
        <textarea
          v-bind="$attrs"
          :class="[resizeable ? '' : 'resize-none', __class]"
          class="outline-none inline-block max-scroll-height"
          @input="resizeTextarea($event)"
          v-model="value.value"
        ></textarea>
        <component
          v-if="icon"
          @click="iconClicked"
          :is="icon"
          size="40"
          class="absolute -top-2 bottom-0 right- my-auto"
          :class="[
            styleType == 'grey-pry' ? 'bg-[#DCDCDC]' : '',
          ]"
          
        ></component>
        <!-- :class="[
            full ? 'right-0 left-auto' : '',
            styleType == 'grey-pry' ? 'bg-[#DCDCDC]' : '',
          ]" -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: () => ({
        error: null,
        value: null,
      }),
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Object,
    },
    size: {
      type: String,
      default: "medium",
    },
    full: {
      type: Boolean,
      default: false,
    },
    resizeable: {
      type: Boolean,
      default: false,
    },
    styleType: {
      type: String,
    },
  },
  setup(props) {
    let styleTypes = {
      "grey-pry":
        "bg-[#DCDCDC] rounded-2xl text-black focus:border-pry border-2 border-[#DCDCDC] rounded-lg",
    };
    let base = "";
    let sizes = {
      small: "py-2 px-4",
      medium: "p-2 ",
      big: "py-6 px-8",
      large: "py-6 px-10 txt-s-6 ",
    };
    let __class = computed(() => {
      let __base =
        base +
        (sizes[props.size] ?? sizes["medium"] + " ") +
        (styleTypes[props.styleType] ?? styleTypes["grey-pry"]);
      if (props.full) {
        __base += " w-full";
      }
      if (props.bordered) {
        __base += " bd-px bd-c-light-li-grey-200";
      }

      return __base;
    });
    const resizeTextarea = (e) => {
      let area = e.target;
      area.style.height = "auto";
      area.style.overflow = "auto";
      area.style.height = area.scrollHeight + "px";
    };
    return {
      __class,
      resizeTextarea,
    };
  },
};
</script>

<style scoped>
.outline-none {
  outline: none;
}
.resize-none {
  resize: none;
}
::-webkit-scrollbar {
  width: 8px;
}
.max-scroll-height {
  max-height: 100px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f181;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>