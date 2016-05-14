
font -> "font" _ "=" _ dqstring _ "," _ posint _ "," _ textdecoration _ "," _ csscolor {%
  function(d) {
    return {
      call: d[0],
      font: d[4],
      fontSize: d[8],
      fontDecoration: d[12] || '',
      fontColor: d[16]
    }
  }
%}