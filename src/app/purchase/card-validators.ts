import { FormControl } from '@angular/forms';
import { card, cvc, expiration } from 'creditcards'
var CardValidators = {
  number: function(cc: FormControl) {
    if (card.isValid(cc.value)) {
      return null;
    }
    return {number: 'Card number is not valid'};
  },
  // below for debugging; TODO: remove
  card: card,
  cvc: cvc,
  expiration: expiration
};

export { CardValidators };
