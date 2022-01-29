import { ref, computed, watch } from "vue";

import axios from "axios"; 
export default function useFormRequest(form, URI, done) {
  let refedForm = ref(form);
  let serverForm = computed(() => {
    let form = {};
    for (let key in refedForm.value) {
      form[key] = refedForm.value[key].value;
    }
    return form;
  });
  

  let data = ref(null);
  let loading = ref(false);
  let err = null;
  let error = ref(null);

  function clearError() {
    err = null;
    for (let key in refedForm.value) {
      refedForm.value[key].error = null;
    }
  }
  async function submitForm() {

    // let errors = computed(() => {
    //   let errorObj = {};
    //   for (let key in refedForm.value) {
    //     errorObj[key] = refedForm.value[key].error;
    //   }
    //   return errorObj;
    // });
    // clearError()
    // if (typeof beforeSubmit == "function") 
    //   beforeSubmit();

    if (loading.value) return;
    loading.value = true;
    // if(errorsForm) {
    //   loading.value = false;
    //   console.log(errorsForm)
    //   return;
    // }
      console.log(form)

    console.log(serverForm.value)
    try {
      console.log(serverForm.value)
      let res = await axios.post(URI, serverForm.value);
      data.value = await res.data;
      console.log(data.value)
      clearError();
    } catch (error) {
      console.log(error);
    }
    loading.value = false;

    if (typeof done == "function") 
      await done(data.value);
  }
  return {
    submitForm,
    loading,
    data,
  };
}
