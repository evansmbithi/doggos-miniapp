Component({
  props: {
    text: {
      type: String,
      value: 'Button'
    },
    onClickMe: {
      type: Function,
      value: () => {}
    },
    isDisabled:{
      type:Boolean,
      value:false
    }
  },
  

  methods: {
    onClickMe() {
      if (!this.data.isDisabled) {
        this.props.onClickMe();
        // this.triggerEvent('onClickMe'); // Trigger event instead of calling directly
      }
    },
  },
});


/* Resolved issues
 * Incorrect binding for disabled attribute – Instead of disabled={{isDisabled}}, you should use disabled="{{isDisabled}}" in AXML syntax.
 * Component Definition Error – isDisabled should be inside properties, not at the same level as props.
 * 
 */