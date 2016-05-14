
text -> "text" _ "=" _ posint _ "," _ dqstring _ "," _ int _ "," _ int _ "," _  int _ "," _ int {%
  function(d) {
    return {
      call: d[0],
      index: d[4],
      string: d[8],
      x: d[12],
      y: d[16],
      w: d[20],
      h: d[24]
    }
  }
%}