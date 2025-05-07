import { Form } from 'antd-mini/es/Form/form';

const app = getApp();

const validateMessages = {
  required: 'Please enter amount',
  string: {
      max: 'Amount cannot be more than 10,000,000',
  },
  pattern: {
      mismatch: 'Please enter valid amount',
  },
};

Page({
  data:{
    targetAmount: 20000,
    contributed: 0,
    percentage: 0,
    doggos_pic: '',
    isSplash: true,
    isLoading: false,
    prevImage: [],
    iterate: 0
  },
  onLoad(query) {
    // Page load
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.showSplash()
    this.handleIncrease(0)

    this.form = new Form({
      validateMessages,
      rules: {
        amount: [
            {                
                required: true, 
                // pattern to match positive whole numbers only, excluding decimals
                pattern: /^[1-9]\d*$/
                ,
                max: 3,
            },
        ],
    },
  });

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

  handleIncrease(amount) {
    const newContribution = this.data.contributed + Number(amount)
    const newPercent = (newContribution / this.data.targetAmount) * 100;
    this.setData({
        percentage: Math.max(Math.min(100, newPercent), 0),
        contributed: newContribution
    });
},
  
  reset() {
    this.form.reset();
  },

  handleRef(ref) {
    this.form.addItem(ref);
},
  
async submit() {
    const values = await this.form.submit();
    my.alert({
        title: 'test',
        content: JSON.stringify(values, null, 2),
    });

    this.handleIncrease(values.amount);
    this.reset();
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
  showSplash(){
    setTimeout(()=>{
      this.setData({
        isSplash: false
      });
    },4000)
  }
});
