
@include "plugins/border.ne"
@include "plugins/cardsize.ne"
@include "plugins/font.ne"
@include "plugins/text.ne"
@include "plugins/unit.ne"

@include "loops.ne"

@include "primitives_advanced.ne"
@include "primitives.ne"

main -> Program

Program -> _ (LineOfCode _):*

LineOfCode ->
  Loop
| Directive

Directive ->
  border
| cardsize
| font
| text
| unit