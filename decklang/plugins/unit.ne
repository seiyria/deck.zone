
unit -> "unit" _ "="
        _ CssUnit                 # the css unit to use by default
{%
  function(d) {
    return {
      call: d[0],
      unit: d[4]
    }
  }
%}