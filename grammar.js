/**
 * @file syntax highlighting tree-sitter for calque
 * @author crow
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

let ident_regex = /[-+*/!?_a-zA-Z][-+*/!?_\w]*/;

module.exports = grammar({
  name: "calque",
  extras: ($) => [$.comment, $.doctag, /\s/, $.operators],

  rules: {
    source_file: $ => repeat($.toplevel),
    toplevel: $ => choice(
      $.requires, $.module, $.method, $.override, $.tagdefn, $.decl, $.statement
    ),

    method: $ => seq(
      'method',
      field('name', $.ident),
      'in',
    ),

    override: $ => seq(
      'override',
      field('name', $.ident),
      repeat1($.override_parameter),
      field('etc', $.ident),
      '->',
      $.statement,
      'in'
    ),
    override_parameter: $ => seq(
      token('('),
      field('name', $.ident),
      field('type', $.name),
      token(')')
    ),

    decl: $ => prec(0, seq('let', optional('pub'), $.ident, '=', $.statement, 'in')),

    module: $ => seq('module', $.ident),
    requires: $ => seq('requires', $.name),

    tagdefn_list: $ => seq('->', repeat1(field('type', $.ident))),
    tagdefn: $ => seq('type', field('type', $.ident), optional($.tagdefn_list), 'in'),

    statement: $ => prec.right(1, choice($.let, $.if, $.expression, $.case)),
    let: $ => seq('let', field('name', $.ident), '=', $.expression, 'in', $.statement),
    if: $ => seq('if', $.expression, 'then', $.statement, 'else', $.statement),

    expression: $ => choice($.tuple,
      $.application, $.concatenation, $.sequencing,
      $.access, $.lambda, $.new,
      alias($.name, $.var), $.number, $.string, $.symbol),

    name: $ => seq(
      repeat(seq(field('namespace', $.ident), alias('::', $.operators))),
      field('name', $.ident),
    ),

    sequencing: $ => prec.left(seq($.expression, ';', $.expression)),

    case: $ => prec.left(seq('case', $.expression, repeat1($.caseof), optional(seq('else', '->', $.statement)))),
    caseof: $ => seq('of', $.expression, '->', $.statement),

    lambda: $ => prec.left(1, seq('\\', repeat(field("parameter", $.ident)), '->', $.statement, optional('.'))),
    tuple: $ => seq('{', optional($.statement), '}'),
    access: $ => prec.right(2, choice(
      seq($.ident, ':', $.ident),
      seq($.ident, ':', $.access),
    )),
    application: $ => prec.right(3, choice(
      seq($.expression, field("function", $.name)),
      seq($.expression, $.expression),
    )),

    concatenation: $ => prec.right(4, 
      seq($.expression, ',', $.expression),
    ),

    new_pair: $ => seq($.ident, ':', $.expression),
    new: $ => seq('new', $.ident, '(', repeat(seq($.new_pair, '|')), optional($.new_pair), ')'),

    number: ($) => seq(/[+-]?[0-9]+/, token.immediate(optional(/\.[0-9]+/))),
    ident: ($) => ident_regex,
    string: ($) => /\".*\"/,
    symbol: ($) => seq('\'', token.immediate(ident_regex)),

    doctag: ($) => prec(2, token(/#\?.*/)),
    comment: ($) => prec(1, token(/#.*/)),
    operators: ($) => choice('$', '?', 'set!', '::'),
  }
});
