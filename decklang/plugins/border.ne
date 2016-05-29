
border -> "border" _ "="
        _ BorderStyle                 # the border style
      ( _ "," _ (CssColor):?):?       # border color (optional, defaults to #000)
      ( _ "," _ PositiveCssValue):?   # the width of the border (optional, defaults to 1px)
{%
  function(d) {
    return {
      call: d[0],
      style: d[4],
      color: d[5] && d[5][3] ? d[5][3][0] : '#000',
      width: d[6] ? d[6][3] : { val: 1, unit: 'px' }
    }
  }
%}