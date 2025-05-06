const app = getApp();

Page({
  data:{
    doggos_pic: '',
    isLoading: true,
    prevImage: [],
    iterate: 0
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
      this.setData({doggos_pic: doggo});
      this.setData({
        prevImage: [...this.data.prevImage, doggo] //apppend new image
      });
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

    if ((this.data.prevImage).length <= 3){
      app.fetchDoggo()
      .then((doggo) => {
        this.setData({doggos_pic: doggo});
        this.setData({
          prevImage: [...this.data.prevImage, doggo] //apppend new image
        });
      })
      .then(()=>{
        this.setData({
          isLoading: false
        });
      })
    }else{
      this.setData({doggos_pic: this.data.prevImage[this.data.iterate]});
      this.setData({iterate: this.data.iterate + 1})
      if (this.data.iterate > 3){
        this.setData({iterate: 0})
      }
      this.setData({
        isLoading: false
      });

    }
    
    // console.log(this.data.iterate)
  },
  previousImage(){
    this.setData({doggos_pic: this.data.prevImage[this.data.iterate]});
    this.setData({iterate: this.data.iterate - 1})
    if (this.data.iterate < 0){
      this.setData({iterate: 3})
    }
    // console.log(this.data.iterate)
  },
  showLoader(){
    setTimeout(()=>{
      this.setData({
        isLoading: false
      });
    },2000)
  }
});
