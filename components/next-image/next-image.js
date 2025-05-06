Component({
  props: {
    text: 'Button',
    fetchNextImage: () => {},
  },

  methods: {
    fetchNextImage() {
      this.props.fetchNextImage();
    },
  },
});
