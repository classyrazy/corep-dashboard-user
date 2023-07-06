import { useUpdates, formReactive } from "../updates/useUpdates"

export const useVueQuill = () => {
    function handleTextChange(event: any) {
        console.log('handleEditorChange')
        handleTextToLink(event)
    }
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    function handleTextToLink(e: any) {
        let htmlText = e
        if (htmlText) {
            htmlText = htmlText.replace(urlRegex, function (url: any) {
                // if (url.includes('youtube.com')) {
                //     return '<iframe width="100%" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
                // }
                // if (url.includes('<a href=')) {
                //     url  = url.replace(
                //         /<a href="([^"]*)" target="_blank">([^<]*)<\/a>/g,
                //         '$1'
                //       )
                // }

                // use this template 
                // <div class="ql-editor"><p><a href="http://localhost:3000/updates" rel="noopener noreferrer" target="_blank">http://localhost:3000/updates</a></p></div>
                // return `
                // <div class="ql-editor">
                //     <p>
                //         <a href="${url}" rel="noopener noreferrer" target="_blank">${url}</a>
                //     </p>
                // </div>
                // `;
            });
            formReactive.updateContent.value = htmlText
        }
        console.log('handleTextToLink', formReactive.updateContent.value)
    }
    return {
        handleTextChange,
        handleTextToLink
    }
}