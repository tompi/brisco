var Card = {
    suit: null,
    denomination: null,
    equals: function(other) {
        return other.instanceof(other) 
            && this.suit === other.suit 
            && this.denomination === other.suit;
    }
};
