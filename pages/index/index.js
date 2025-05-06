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
    this.setData({iterate: this.data.iterate + 1})
    // console.log(this.data.iterate)
    if (this.data.iterate >= 10){
      this.setData({iterate: 0})
    }
    if (this.data.prevImage[this.data.iterate] != undefined) {     
      this.setData({doggos_pic: this.data.prevImage[this.data.iterate]});
      
    } else if ((this.data.prevImage).length <= 10){
      this.setData({
        isLoading: true
      });

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
    }
  },

  previousImage(){    
    this.setData({iterate: this.data.iterate - 1})
    if (this.data.iterate <= 0){
      if ((this.data.prevImage).length >= 3) {
        this.setData({iterate: (this.data.prevImage).length - 1})        
      }else{      
      this.setData({iterate: 0})
    }
  }
    this.setData({doggos_pic: this.data.prevImage[this.data.iterate]});
    // console.log(this.data.iterate)
    // console.log(this.data.prevImage[this.data.iterate])
  },
  showLoader(){
    setTimeout(()=>{
      this.setData({
        isLoading: false
      });
    },2000)
  }
});
