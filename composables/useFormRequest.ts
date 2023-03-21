import Graph from "../libs/avanda";
import { ref, computed } from "vue";
import { useAlert } from '~~/composables/core/useToast';
import { isNull } from "lodash";

interface formObj {
  value: null | string;
  error: null | string;
}
export default function useFormRequest(
  service: string,
  form?: object[] | null,
  postData?: object | null,
  done?: Function,
  errorFunc?: Function
) {
  let refedForm = ref(form);
  let serverForm = null;
  function convertForm(formPassed, key=null) {
    let form = {};
    if (formPassed.length && formPassed.length > 0) {
      let arr =[];
      for(let i = 0; i < formPassed.length; i++) {
        arr.push(convertForm(formPassed[i]));
      }
      return arr;
    } else {
      for (let key in formPassed) {
        form[key] = formPassed[key].value;
        if (formPassed[key] instanceof Array)
          form[key] = convertForm(formPassed[key], key);

      }
    }
    return form;
  }
  if (form) {
    serverForm = computed(() => {
      return convertForm(refedForm.value);
    });
  }

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
    if (postData) return;
    if (loading.value) return;
    loading.value = true;
    console.log(form || postData);

    try {
      let req = new Graph().service(service).post(serverForm.value);
      data.value = (await req).getData();
      useAlert().openAlert({ type: 'SUCCESS', msg: (await req).getMsg() })

      clearError();
    } catch (error) {
      if (typeof errorFunc == "function") await errorFunc(error);
    }
    loading.value = false;

    if (typeof done == "function") await done(data.value);
  }
  async function submitData() {
    if (!postData) return;
    if (loading.value) return;
    loading.value = true;
    let toServerData = ref(postData);
    let reqMsg = ''
    try {
      let req = new Graph().service(service).post(toServerData.value);
      data.value = (await req).getData();
      // useAlert().openAlert({ type: 'SUCCESS', msg: (await req).getMsg() })
      reqMsg = (await req).getMsg()
      console.log(data.value);
      clearError();
    } catch (error) {
      if (typeof errorFunc == "function") await errorFunc(error);
    }
    loading.value = false;

    if (typeof done == "function") await done(data.value, reqMsg);
  }
  return {
    submitForm,
    submitData,
    loading,
    data,
  };
}
