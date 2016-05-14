@builtin "number.ne"
@builtin "string.ne"

@{% function nuller() { return null } %}
@{% function joiner(d) { return d.join(''); } %}

_ ->
  [\s\n\t]:* {% nuller %}

csscolor ->
  "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit {% joiner %}
| "#" hexdigit hexdigit hexdigit {% joiner %}

hexdigit ->
  [a-fA-F0-9]

textdecoration ->
  null
| [BUI]:* {% joiner %}

decimalornull ->
  null
| decimal

stringornull ->
  null
| dqstring