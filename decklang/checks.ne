
CheckOperand ->
  Variable  {% id %}
| Integer   {% id %}
| String    {% id %}

CheckOperator ->
  ">"   {% id %}
| ">="  {% id %}
| "=="  {% id %}
| "!="  {% id %}
| "<="  {% id %}
| "<"   {% id %}

Check -> CheckStart CheckBody {% function(d) { return { checkStart: d[0], ops: _.compact(_.flatten(d[1])) }; } %}

CheckStart ->
  "check" _ "=" _ CheckOperand __ CheckOperator __ CheckOperand _
  {%
  function(d) {
    return {
      left: d[4],
      operator: d[6],
      right: d[8]
    };
  }
  %}

CheckEnd -> "endcheck" {% nuller %}

CheckBody ->
  _ CheckEnd               {% joiner %}
| LineOfCode _ CheckBody   {% function(d) { return d[0].concat(d[2]) } %}