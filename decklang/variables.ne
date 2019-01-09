
Operand ->
  "*" {% id %}
| "+" {% id %}
| "-" {% id %}
| "/" {% id %}

VariableIdentifier -> [a-zA-Z] [\w]:*
  {%
  function(d) {
    return d[0] + (d[1].length ? d[1].join('') : '');
  }
  %}

PVar -> "(" _ VariableExpression _ ")"

VariableAssignment ->
  VariableIdentifier _ "=" _ Integer
  {%
  function(d) {
    return {
      varName: d[0],
      varStart: d[4]
    };
  }
  %}

RecursiveVariableExpression ->
  Operand _ Integer _ (")"):? _ (RecursiveVariableExpression):? _             {% joiner %}
| Operand _ VariableIdentifier _ (")"):? _ (RecursiveVariableExpression):? _  {% joiner %}
| Operand _ ("("):? _ Integer _ RecursiveVariableExpression                   {% joiner %}
| Operand _ ("("):? _ VariableIdentifier _ RecursiveVariableExpression        {% joiner %}

VariableExpression ->
  VariableIdentifier                                {% evalid %}
| VariableIdentifier _ RecursiveVariableExpression  {% evaljoiner %}
| Integer _ RecursiveVariableExpression             {% evaljoiner %}

Variable -> "<" _ VariableExpression _ ">" {% function(d) { return d[2]; } %}

NonExpressiveVariable ->
  String {% id %}
| "<" _ VariableIdentifier _ ">" {% function(d) { return { eval: d[2] }; } %}

NonExpressiveResource -> "<<" _ VariableIdentifier _ ">>" {% function(d) { return d[2]; } %}