
pagemargins -> "pagemargins" _ "=" _ CssMargin # either specified as "all" or "left, right, top, bottom"
{%
  function(d) {
    return {
      call: d[0],
      top: d[4].top,
      left: d[4].left,
      right: d[4].right,
      bottom: d[4].bottom,
    }
  }
%}