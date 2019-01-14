
cardbackground -> 
  "cardbackground" _ "=" _ CssColor
  {%
    function(d) {
      return {
        call: d[0],
        color: d[4]
      }
    }
  %}
| "cardbackground" _ "=" _ PositiveIntegerVariable _ "," _ CssColor
  {%
    function(d) {
      return {
        call: d[0],
        index: d[4],
        color: d[8]
      }
    }
  %}