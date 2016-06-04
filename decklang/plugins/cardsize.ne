
cardsize -> "cardsize" _ "="
          _ PositiveCssValue                 # width of cards
          _ "," _ PositiveCssValue           # height of cards
{%
  function(d) {
    return {
      call: d[0],
      width: d[4],
      height: d[8]
    }
  }
%}
  |         "cardsize" _ "=" _ CardSize
{%
  function(d) {
    return {
      call: d[0],
      width: d[4].width,
      height: d[4].height
    }
  }
%}