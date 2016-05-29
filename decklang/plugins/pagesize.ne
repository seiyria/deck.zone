
pagesize -> "pagesize" _ "="
          _ PositiveCssValue                 # width of page
          _ "," _ PositiveCssValue           # height of page
{%
  function(d) {
    return {
      call: d[0],
      width: d[4],
      height: d[8]
    }
  }
%}