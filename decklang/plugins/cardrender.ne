
cardrender -> "cardrender" _ "=" _ CardRender
{%
  function(d) {
    return {
      call: d[0],
      render: d[4]
    }
  }
%}