(lambda
  parameter: (ident) @local.definition.variable.parameter) @local.scope
(override
  etc: (ident) @local.definition.special) @local.scope
(override_parameter
  name: (ident) @local.definition.variable.parameter)
(let
  name: (ident) @local.definition.variable)
(var) @local.reference
