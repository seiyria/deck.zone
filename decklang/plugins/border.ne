
border -> "border" _ "="
        _ BorderStyle                 # the border style
        _ "," ( _ CssColor):?         # border color (optional, defaults to #000)
      ( _ "," _ PositiveDecimal):?    # the width of the border (optional, defaults to 1)
{%
  function(d) {
    return {
      call: d[0],
      style: d[4],
      color: d[7] ? d[7][1] : '#000',
      width: d[8] ? d[8][3] : 1
    }
  }
%}