
cardside -> "cardside" _ "=" _ CardSide
{%
  function(d) {
    return {
      call: d[0],
      side: d[4]
    }
  }
%}