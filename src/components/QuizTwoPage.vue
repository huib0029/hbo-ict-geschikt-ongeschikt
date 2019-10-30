<template id="main">
  <div id="app">
    <canvas ref="canvas" id="emo_canvas" width="400" height="400"></canvas>
    <div>
      <video ref="video" id="video" width="400" height="400" playsinline muted autoplay></video>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Axios from 'axios';
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, Axios)

// export default ({
//   template: '#main',
//   data() {
//     return {
//       video: {},
//       canvas: {},
//       captures: [],
//       testTimer: '',
//     };
//   },
//   mounted() {
//   //Start the PC front camera and display real-time video on the video tag
//     this.video = this.$refs.video
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices.getUserMedia({audio: false, video: true})
//       .then(stream => {
//         this.video.srcObject = stream
//         this.video.play()
//       })
//     }

//     console.log(this.$refs.canvas)
//     // console.log(this.$refs.canvas)

//     this.canvas = this.$refs.canvas 
//     this.testTimer = setInterval(() => {
//       // console.log(this.$refs.canvas)
//       let context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 240)
//       this.captures.push(this.canvas.toDataURL("image/png")) //Store the captured image in the "captures" array
//       let subscriptionKey = "Please input the key that has been sent to you";
//       let uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
//       let params = {
//         "returnFaceId": "true",
//         "returnFaceLandmarks": "false",
//         "returnFaceAttributes":
//           "emotion"
//       };
//       //Convert the format of the image added at the end of the array and assign it to the imgURL format
//       const imgURL = this.makeblob(this.captures[this.captures.length - 1])
//       //Send imgURL image to Face API
//       Axios.post(
//         uriBase + "?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,emotion",
//         imgURL,
//         {
//           headers: {
//             "Content-Type": "application/octet-stream",
//             "Ocp-Apim-Subscription-Key": subscriptionKey,
//           }
//         },
//       )
//       .then(response => {
//         console.log(response.data[0].faceAttributes.emotion)

//       })
//       .catch(error => {
//         // console.log(error.response)
//       });
//     }, 5000);
//   },
//   methods: {     
//     makeblob: function (dataURL) {
//       let BASE64_MARKER = ';base64,';
//       if (dataURL.indexOf(BASE64_MARKER) == -1) {
//         let parts = dataURL.split(',');
//         let contentType = parts[0].split(':')[1];
//         let raw = decodeURIComponent(parts[1]);
//         return new Blob([raw], {type: contentType});
//       }
//       let parts = dataURL.split(BASE64_MARKER);
//       let contentType = parts[0].split(':')[1];
//       let raw = window.atob(parts[1]);
//       let rawLength = raw.length;
//       let uInt8Array = new Uint8Array(rawLength);
//       for (let i = 0; i < rawLength; ++i) {
//         uInt8Array[i] = raw.charCodeAt(i);
//       }
//       return new Blob([uInt8Array], {type: contentType})
//     }
//   }
// });