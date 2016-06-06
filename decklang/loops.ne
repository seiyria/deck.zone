
VariableIdentifier -> [a-zA-Z] [\w:]:*
  {%
  function(d) {
    return d[0] + (d[1].length ? d[1].join('') : '');
  }
  %}

Loop -> LoopStart LoopBody {% function(d) { return { loopStart: d[0], ops: _.compact(_.flatten(d[1])) }; } %}

LoopStart ->
  "loop" _ "=" _ "<" _ VariableAssignment _ ">" __ "to" __ LoopToGoal _
  {%
  function(d) {
    return {
      start: d[6],
      end: d[12][0]
    };
  }
  %}
| "loop" _ "=" _ "<" _ VariableIdentifier _ ">" __ "in" __ LoopInGoal _
  {%
  function(d) {
    return {
      start: { varName: d[6] },
      iterations: d[12]
    };
  }
  %}

LoopEnd -> "endloop" {% nuller %}

LoopBody ->
  _ LoopEnd               {% joiner %}
| LineOfCode _ LoopBody   {% function(d) { return d[0].concat(d[2]) } %}

LoopInGoalVariableSet ->
  LoopInGoalVariable                                {% id %}
| LoopInGoalVariableSet _ "," _ LoopInGoalVariable  {% function(d) { return _.compact(_.flatten([d[0], d[4]])); } %}

LoopInGoalVariableHash ->
  Integer {% id %}
| String  {% id %}

LoopInGoalVariable ->
  Integer ( _ ":" _ LoopInGoalVariableHash ):? {% function(d) { return { key: d[0], val: d[1] ? d[1][3] : null }; } %}
| String  ( _ ":" _ LoopInGoalVariableHash ):? {% function(d) { return { key: d[0], val: d[1] ? d[1][3] : null }; } %}

LoopInGoal ->
  "{" _ LoopInGoalVariableSet _ "}" {% function(d) { return d[2]; } %}

LoopToGoal ->
  PositiveInteger
| LoopVariable

Operand ->
  "*"
| "+"
| "-"
| "/"

PVar -> "(" _ LoopVariableExpression _ ")"

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

RecursiveLoopVariableExpression ->
  Operand _ Integer _ (")"):? _ (RecursiveLoopVariableExpression):? _             {% joiner %}
| Operand _ VariableIdentifier _ (")"):? _ (RecursiveLoopVariableExpression):? _  {% joiner %}
| Operand _ ("("):? _ Integer _ RecursiveLoopVariableExpression                   {% joiner %}
| Operand _ ("("):? _ VariableIdentifier _ RecursiveLoopVariableExpression        {% joiner %}

LoopVariableExpression ->
  VariableIdentifier                                    {% evalid %}
| VariableIdentifier _ RecursiveLoopVariableExpression  {% evaljoiner %}
| Integer _ RecursiveLoopVariableExpression             {% evaljoiner %}

LoopVariable -> "<" _ LoopVariableExpression _ ">" {% function(d) { return d[2]; } %}