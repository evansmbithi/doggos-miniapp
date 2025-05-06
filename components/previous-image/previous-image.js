Component({
  props: {
    text: 'Button',
    fetchPreviousImage: () => {},
  },

  methods: {
    fetchPreviousImage() {
      this.props.fetchPreviousImage();
    },
  },
});
