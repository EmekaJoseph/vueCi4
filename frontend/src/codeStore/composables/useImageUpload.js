import { ref, watch } from 'vue'

export function useImageUpload() {
    const imageFile = ref('')
    const imageURL = ref('')

    function handleFileUpload(event) {
        if (event.target.files.length === 0) {
            imageFile.value = ''
            imageURL.value = ''
            return
        }
        imageFile.value = event.target.files[0]
        console.log(imageFile.value, 'here');

    }

    watch(imageFile, (imageFile) => {
        if (!(imageFile instanceof File)) {
            return;
        }
        let fileReader = new FileReader
        fileReader.readAsDataURL(imageFile)
        fileReader.addEventListener('load', () => {
            imageURL.value = fileReader.result
        })
    })

    return { handleFileUpload, imageURL, imageFile }
}