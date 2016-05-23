
cardsize -> "cardsize" _ "="
          _ CssValue                 # width of cards
          _ "," _ CssValue           # height of cards
{%
  function(d) {
    return {
      call: d[0],
      width: d[4],
      height: d[8]
    }
  }
%}