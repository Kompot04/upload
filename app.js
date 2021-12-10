import firebase from 'firebase/app'
import 'firebase/storage'
import { upload } from './upload.js'


const firebaseConfig = {
    apiKey: "AIzaSyB4toN7v4J7I-jHMKzmCtdCvr9-ews0TOI",
    authDomain: "fe-upload-9b53b.firebaseapp.com",
    projectId: "fe-upload-9b53b",
    storageBucket: "fe-upload-9b53b.appspot.com",
    messagingSenderId: "925159759561",
    appId: "1:925159759561:web:ad2f8324071dedec103718"
}


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log('Download URL', url)
                })
            })
        })
    }
})