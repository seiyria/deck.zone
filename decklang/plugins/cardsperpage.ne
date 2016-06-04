
cardsperpage -> "cardsperpage" _ "="
              _ PositiveInteger                 # number of cards
{%
  function(d) {
    return {
      call: d[0],
      cardCount: d[4]
    }
  }
%}