
VariableIdentifier -> [a-zA-Z] [a-zA-Z0-9]:* {% id %}

Loop -> LoopStart LoopBody {% function(d) { return { loopStart: d[0], ops: _.compact(_.flatten(d[1])) }; } %}

LoopStart ->
  "loop" _ "=" _ "<" _ Assignment _ ">" __ "to" __ LoopGoal _
  {%
  function(d) {
    return {
      start: d[6],
      end: d[12][0]
    };
  }
  %}

LoopEnd -> "endloop" {% nuller %}

LoopBody ->
  _ LoopEnd               {% joiner %}
| LineOfCode _ LoopBody   {% function(d) { return d[0].concat(d[2]) } %}

LoopGoal ->
  PositiveInteger
| LoopVariable

Operand ->
  "*"
| "+"
| "-"
| "/"

Assignment ->
  VariableIdentifier _ "=" _ Integer
  {%
  function(d) {
    return {
      varName: d[0],
      varStart: d[4]
    };
  }
  %}

RecursiveLoopVariableExpression ->
  Operand _ Integer                                               {% joiner %}
| Operand _ VariableIdentifier                                    {% joiner %}
| Operand _ Integer _ RecursiveLoopVariableExpression             {% joiner %}
| Operand _ VariableIdentifier _ RecursiveLoopVariableExpression  {% joiner %}

LoopVariableExpression ->
  VariableIdentifier                                    {% evalid %}
| VariableIdentifier _ RecursiveLoopVariableExpression  {% evaljoiner %}
| Integer _ RecursiveLoopVariableExpression             {% evaljoiner %}

LoopVariable -> "<" _ LoopVariableExpression _ ">" {% function(d) { return d[2]; } %}