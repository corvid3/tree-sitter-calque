import XCTest
import SwiftTreeSitter
import TreeSitterCalque

final class TreeSitterCalqueTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_calque())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Calque grammar")
    }
}
