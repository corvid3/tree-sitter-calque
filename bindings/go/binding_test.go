package tree_sitter_calque_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_calque "github.com/corvid3/tree-sitter-calque.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_calque.Language())
	if language == nil {
		t.Errorf("Error loading Calque grammar")
	}
}
