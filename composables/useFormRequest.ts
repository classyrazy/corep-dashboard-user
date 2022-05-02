import Graph from "../libs/avanda";
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
  if (form) {
    serverForm = computed(() => {
      let form = {};
      for (let key in refedForm.value) {
        form[key] = refedForm.value[key].value;
      }
      return form;
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
    console.log(form ?? postData);

    console.log(serverForm.value);
    try {
      console.log(serverForm.value);
      let req = new Graph().service(service);
      data.value = (await req.post(serverForm.value)).getData();
      console.log(data.value);
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
    console.log(postData);
    let toServerData = ref(postData);
    try {
      console.log(toServerData.value);
      let req = new Graph().service(service);
      data.value = (await req.post(toServerData.value)).getData();
      console.log(data.value);
      clearError();
    } catch (error) {
      if (typeof errorFunc == "function") await errorFunc(error);
    }
    loading.value = false;

    if (typeof done == "function") await done(data.value);
  }
  return {
    submitForm,
    submitData,
    loading,
    data,
  };
}
