
cardsperpage -> "cardsperpage" _ "="
              _ PositiveInteger                 # number of cards in a row
              _ "," _ PositiveInteger           # number of rows per page
{%
  function(d) {
    return {
      call: d[0],
      cardsPerRow: d[4],
      rowsPerPage: d[8]
    }
  }
%}