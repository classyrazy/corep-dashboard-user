<template>
  <button :class="__class" class="flex justify-center" style="white-space: nowrap" :disabled="disabled">
    <component
        v-if="icon || loading"
        :class="`${!iconOnly ? 'mr-2':''} my-auto`"
        size="17"
        :color="types[type] && types[type].text"
               :is="loading ? Spinner : icon"></component>
    <span class="my-auto" :class="!icon && !loading ? (round ? ' mt-1 ml-1':'m-auto'):''">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>

// import Spinner from '../icons/loader-icon.vue';

import { computed } from "@vue/reactivity"

let props = defineProps({
  size: {
    type: String,
    default: 'medium'
  },
  type: {
    type: String,
    default: 'pry'
  },
  round: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object
  },
  iconOnly: {
    type: Boolean,
    defult: false
  },
  full: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

let base = 'rounded-xl'
let sizes = {
  small: 'py-2 px-4 ',
  medium: 'py-3 px-6',
  big: 'py-4 px-8 txt-s-4'
}
let types = {
  white: {
    __class: 'bd-px bd-c-white bg-white txt-c-pry-400',
    text: '#ffffff'
  },
  'pry': {
    __class: ' text-white bg-pry-dark font-bold btn-pry button01',
    text: '#03053D'
  },
  'pry-reverse': {
    __class: ' text-white bg-pry font-bold btn-pry-reverse button03',
    text: '#03053D'
  },
  black: {
    __class: 'bd-px bd-c-black bg-black txt-c-white',
    text: ''
  },
  bordered: {
    __class: 'bd-px bd-c-white bg-transparent txt-c-white',
    text: ''
  },
  bordered_black: {
    __class: 'bd-px bd-c-black-10 bg-white txt-c-black',
    text: ''
  },
  sec: {
    __class: ' border-pry bg-sec text-pry-dark font-bold btn-sec button02',
    text: '#fff'
  },
}
// hover:bg-pry-dark hover:text-white transition-colors duration-500

let __class = computed(() => {
  let __base = ((types[props.type] && types[props.type].__class) || types['pry'].__class) + ' ' + (sizes[props.size] || sizes['medium']);
  if (props.round)
    __base += ' rounded-full h-12 w-12 max-w-12 center'
  else
    __base += ' ' + base;

  if (props.full)
    __base += ' w-full'
  if (props.disabled)
    __base += ' fade-40'

  return __base
})

</script>

<style scoped>
button{
  cursor: pointer;
}
button.btn-pry {
  position: relative;
  color: #fff;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: .3s;
  z-index: 5;

}
button.btn-pry::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  content: '';
  background: #4471E3;
  transition: transform .3s;
  border-radius: 0.75rem;
  color: #fff;
}
button.btn-sec {
  position: relative;
  display: inline-block;
  /* color: #fff; */
  z-index: 5;
  transition: .3s;
}
button.btn-sec::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  content: '';
  background: #fcc947;
  transition: transform .3s;
  border-radius: 0.75rem;
  /* color: #fff; */
}


.btn-pry.button01::before {
  transform-origin: right top;
  transform: scale(0, 1);

}
.btn-pry.button01:hover::before {
  transform-origin: left top;
  transform: scale(1, 1);
  color: #fff;

}

.button02::before,
.button02::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  content: '';
  transform: scale(0, 1);
}
.button02::before {
  background: #fcc94709;
  transform-origin: right top;
  transition: none;
  border-radius: 0.85rem;
}
.button02::after {
  background: #9b7108;
  opacity: 0;
  transform-origin: left top;
  transition: transform 0s .3s, opacity .3s;
  border-radius: 0.85rem;
  color: 
}
.button02:hover::before {
  transform-origin: left top;
  transform: scale(1, 1);
  transition: transform .3s;
}
.button02:hover::after {
  opacity: 1;
  transform-origin: right top;
  transform: scale(1, 1);
  transition: transform .3s .3s, opacity .3s;
  border-radius: 0.65rem;
  color: white;
}

/* button.btn-sec {
  position: relative;
  display: inline-block;
  z-index: 5;
  transition: .3s;
} */
button.btn-pry-reverse {
  position: relative;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  transition: .3s;
  z-index: 5;

}
button.btn-pry-reverse::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  content: '';
  background: #0C1825;
  transition: transform .3s;
  border-radius: 0.75rem;
  color: #fff;
}


.btn-pry-reverse.button03::before {
  transform-origin: right top;
  transform: scale(0, 1);

}
.btn-pry-reverse.button03:hover::before {
  transform-origin: left top;
  transform: scale(1, 1);
  color: #fff;

}
</style>