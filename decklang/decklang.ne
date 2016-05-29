
@include "_directives.ne"

@include "loops.ne"

@include "primitives_advanced.ne"
@include "primitives.ne"

main -> Program

Program -> _ (LineOfCode _):*

LineOfCode ->
  Loop
| Directive