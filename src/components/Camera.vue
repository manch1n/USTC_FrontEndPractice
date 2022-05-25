<template>
  <div>
    <a-button type="primary" @click="showModal">人脸识别</a-button>
    <a-modal
      v-model:visible="visible"
      title="人脸识别"
      @ok="handleOk"
      width="900px"
      @cancel="cancelModal"
    >
      <video ref="video" width="400" height="300" style="float: left"></video>
      <canvas
        style="display: none"
        id="canvasCamera"
        ref="image"
        width="400"
        height="300"
      ></canvas>
      <div>
        <img :src="imgSrc" width="400" height="300" />
      </div>
      <a-button @click="OpenCamera">打开摄像头</a-button>
      <a-button @click="CloseCamera">关闭摄像头</a-button>
      <a-button @click="setImage">拍照</a-button>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaStreamTrack: {},
      video_stream: "", // 视频stream
      imgSrc: "", // 拍照图片
      canvas: null,
      context: null,
      visible: false,
    };
  },
  emits: ["get-image"],
  mounted() {
    // 进入页面 自动调用摄像头
    //this.getCamera();
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    cancelModal() {
      this.CloseCamera();
    },
    handleOk() {
      if (this.imgSrc == null) {
        alert("请先拍照");
        return;
      }
      this.visible = false;
      let image = this.imgSrc.substring(this.imgSrc.indexOf(",") + 1);
      this.$emit("get-image", image);
      this.CloseCamera();
    },
    // 调用打开摄像头功能
    getCamera() {
      // 获取 canvas 画布
      this.canvas = document.getElementById("canvasCamera");
      this.context = this.canvas.getContext("2d");
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 正常支持版本
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 400, height: 300 },
        })
        .then((stream) => {
          // 摄像头开启成功
          this.mediaStreamTrack =
            typeof stream.stop === "function" ? stream : stream.getTracks()[0];
          this.video_stream = stream;
          this.$refs.video.srcObject = stream;
          this.$refs.video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 拍照 绘制图片
    setImage() {
      console.log("拍照");
      // 点击canvas画图
      this.context.drawImage(this.$refs.video, 0, 0, 400, 300);
      // 获取图片base64链接
      let image = this.$refs.image.toDataURL("image/png");
      this.imgSrc = image;
      console.log(this.imgSrc);
    },
    // 打开摄像头
    OpenCamera() {
      console.log("打开摄像头");
      this.getCamera();
    },
    // 关闭摄像头
    CloseCamera() {
      console.log("关闭摄像头");
      this.$refs.video.srcObject.getTracks()[0].stop();
    },
  },
};
</script>


