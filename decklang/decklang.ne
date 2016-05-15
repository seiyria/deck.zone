@builtin "string.ne"
@builtin "number.ne"
@builtin "whitespace.ne"

Program -> Expressions | null
Expressions -> Expression Expressions
Expression -> Loop | VariableDeclaration | Directive | Comment | NewLine

Comment -> "`" btstring
Directive -> "text" _ "=" _ ArgumentList | "font" _ "=" _ ArgumentList
VariableDeclaration -> Variable _ "=" _ ArgumentList
Loop -> LoopStart LoopBody

LoopStart -> "loop" _ "=" _ "<" _ Assignment _ "> to " LoopGoal
LoopGoal -> Integer | Variable | LoopVariable
LoopBody -> LoopEnd | Expression LoopBody
LoopEnd -> "endloop"

ArgumentList -> Argument | Argument _ "," _ ArgumentList
Argument -> Identifier | String | Integer | HexString | Variable | LoopVariable
Assignment -> Identifier _ "=" _ Argument

Variable -> "[" _ Identifier _ "]"
LoopVariable -> "<" _ LoopVariableExpression _ ">"

LoopVariableExpression -> Identifier 
  | Identifier _ Operand _ Integer
  | Integer _ Operand _ Identifier
Operand -> "*" | "+" | "-" | "/"
Identifier -> "_" [a-zA-Z0-9]:* | [a-zA-Z] [a-zA-Z0-9]:*
String -> dqstring #builtIn
Integer -> int #builtIn
HexString -> "#" Hex Hex Hex Hex Hex Hex | "#" Hex Hex Hex
Hex -> [a-fA-F0-9]
NewLine -> "\r\n" | "\n"
