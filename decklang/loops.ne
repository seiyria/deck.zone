
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
| "loop" _ "=" _ "<" _ VariableIdentifier _ ">" __ "in" __ NonExpressiveResource _ ":" _ NonExpressiveVariable _
  {%
  function(d) {
    return {
      start: { varName: d[6], resourceId: d[12], sheet: d[16] }
    };
  }
  %}

LoopEnd -> "endloop" {% nuller %}

LoopBody ->
  LoopEnd                 {% joiner %}
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
| Variable