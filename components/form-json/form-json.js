Component({
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
}

})