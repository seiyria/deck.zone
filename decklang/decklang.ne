
@include "plugins/border.ne"
@include "plugins/font.ne"
@include "plugins/text.ne"
@include "plugins/unit.ne"

@include "primitives_advanced.ne"
@include "primitives.ne"

main -> _ (line_of_code _):*

line_of_code ->
  border
| font
| text
| unit