
newcard -> "newcard" _ "="
           _ String                 # the name of the index of the new card
{%
  function(d) {
    return {
      call: d[0],
      name: d[4]
    }
  }
%}