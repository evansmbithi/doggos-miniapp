const app = getApp();

Page({
  data:{
    doggos_pic: '',
    isLoading: true,
    prevImage: []
  },
  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.showLoader()
  },
  onReady() {
    // Page loading is complete
  },
  onShow() {
    // Page display    
    app.fetchDoggo().then((doggo) => {
      this.setData({doggos_pic: doggo})
    })
  },
  onHide() {
    // Page hidden
  },
  onUnload() {
    // Page is closed
  },
  onTitleClick() {
    // Title clicked
  },
  onPullDownRefresh() {
    // Page is pulled down
  },
  onReachBottom() {
    // Page is pulled to the bottom
  },
  onShareAppMessage() {
    // Back to custom sharing information
    return {
      title: 'Doggos',
      desc: 'Save a Doggo!',
      path: 'pages/index/index',
    };
  },
  nextImage(){
    this.setData({
      isLoading: true
    });

    app.fetchDoggo()
    .then((doggo) => {
      this.setData({doggos_pic: doggo})
    })
    .then(()=>{
      this.setData({
        isLoading: false
      });
    })
  },
  showLoader(){
    setTimeout(()=>{
      this.setData({
        isLoading: false
      });
    },2000)
  }
});
