import {ref, computed, watch } from "vue"
import axios from 'axios'

export default function useFormRequest(form){
    let refedForm = ref(form)
    let serverForm = computed(() => {
        let form = {}
        for(let key in refedForm.value){
            form[key] = refedForm.value[key].value
        }
        return form
    })


    let data = ref(null)
    let loading = ref(false)
    let err = null
    let error = ref(null)


    function clearError(){
        err = null
        for(let key in refedForm.value){
            refedForm.value[key].error = null
        }
    }

    async function submitForm(){
        let errorsForm = {}
        for(let key in refedForm.value){
            errorsForm[key] = refedForm.value[key].error
        }
        console.log(refedForm.value)
        console.log(errorsForm)
        console.log(serverForm.value)
        // clearError()

        // if(loading.value)
        //     return
        // loading.value = true

        // try {
        //     axios.post(URL, serverForm.value).then(res => {
        //     data.value = await res.data
        // })
        // } catch (e) {
        //     console.log(e)
            
        // }
        // loading.value = false
    }
    return{
        serverForm,
        submitForm,
        loading
    }
}