App({
  data:{
    doggos_pic: ''
  },
  onLaunch(options) {
    // Page opens for the first time
    console.info('App onLaunch');
  },
  onShow(options) {
    // Reopened by scheme from the background
  },
  fetchDoggo(){
    return new Promise((resolve, reject) => {
      my.request({
        url: `https://dog.ceo/api/breeds/image/random`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: (res) => {
          const doggo = res.data.message
          this.data.doggos_pic = doggo
          resolve(doggo)
          console.log('Fetch Successful', this.data.doggos_pic);
        },
        fail: (error) => {
          reject(error)
          console.log('error:', error)
        }
      })
    })
  }
});
