[
  "let"
  "in"
  "new"
] @keyword

[
  "requires"
  "module"
  "pub"
] @keyword.control.import

[
  "method"
  "override"
  "type"
] @keyword.storage.type

[
  "if"
  "then"
  "else"
  "case"
  "of"
] @keyword.control.conditional

["=" "$" "?" "set!" ] @operator
["\\" "," ";" ":" "->"] @punctuation.delimiter

["{" "}" "(" ")"] @punctuation.bracket

(comment) @comment.line.documentation
(doctag) @comment

(number) @constant.numeric
(string) @string
(symbol) @constant

(var
  namespace: (ident) @namespace
  name: (ident) @variable)

(method
  name: (ident) @function) 
(override
  name: (ident) @function
  etc: (ident) @special)
(override_parameter
  name: (ident) @variable.parameter
  type: (name name: (ident) @type))

(application
  function: ((name name: (ident) @function)))
(lambda
  parameter: (ident) @variable.parameter) 

(operators) @operator
