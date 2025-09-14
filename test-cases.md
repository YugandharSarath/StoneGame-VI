# Stone Game VI - Test Cases

## Basic Test Cases

### Test Case 1: Example 1 - Alice Wins
- **Input**: `aliceValues = [1,3]`, `bobValues = [2,1]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: Alice picks stone 1 (value 3), Bob picks stone 0 (value 2). Alice: 3, Bob: 2.
- **Combined Values**: Stone 0: 3, Stone 1: 4 → Optimal order: [1, 0]
- **Category**: Basic winning case

### Test Case 2: Example 2 - Draw
- **Input**: `aliceValues = [1,2]`, `bobValues = [3,1]`
- **Expected Output**: `0` (Draw)
- **Explanation**: Alice picks stone 0 (value 1), Bob picks stone 1 (value 1). Both score 1.
- **Combined Values**: Stone 0: 4, Stone 1: 3 → Optimal order: [0, 1]
- **Category**: Draw case

### Test Case 3: Example 3 - Bob Wins
- **Input**: `aliceValues = [2,4,3]`, `bobValues = [1,6,7]`
- **Expected Output**: `-1` (Bob wins)
- **Explanation**: Combined values lead to Bob having advantage.
- **Combined Values**: Stone 0: 3, Stone 1: 10, Stone 2: 10 → Alice: 6, Bob: 7
- **Category**: Basic losing case

### Test Case 4: Single Stone
- **Input**: `aliceValues = [5]`, `bobValues = [3]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: Only one stone available, Alice picks it and wins automatically.
- **Category**: Edge case, minimum input size

### Test Case 5: Equal Values
- **Input**: `aliceValues = [3,3,3]`, `bobValues = [3,3,3]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: All stones equal, Alice picks 2 stones (turns 0,2), Bob picks 1 (turn 1).
- **Category**: Equal values case

## Advanced Test Cases

### Test Case 6: Large Values
- **Input**: `aliceValues = [100,1,1]`, `bobValues = [1,100,1]`
- **Expected Output**: `0` (Draw)
- **Explanation**: Combined values: [101, 101, 2]. Alice gets stone 0 (100) and stone 2 (1), Bob gets stone 1 (100).
- **Category**: High values, strategic picking

### Test Case 7: Bob Strongly Favored
- **Input**: `aliceValues = [1,1,1,1]`, `bobValues = [10,10,10,10]`
- **Expected Output**: `-1` (Bob wins)
- **Explanation**: All combined values equal (11), but Bob's individual values much higher.
- **Category**: Opponent advantage case

### Test Case 8: Alice Strongly Favored
- **Input**: `aliceValues = [10,10,10]`, `bobValues = [1,1,1]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: Alice picks 2 stones (turns 0,2), gets 20 points vs Bob's 1 point.
- **Category**: Player advantage case

### Test Case 9: Mixed Strategy
- **Input**: `aliceValues = [5,2,8,1]`, `bobValues = [3,7,2,6]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: Combined values: [8,9,10,7] → Order: [2,1,0,3] → Alice: 8+5=13, Bob: 7+1=8
- **Category**: Complex mixed values

### Test Case 10: Close Competition
- **Input**: `aliceValues = [4,3,2,1]`, `bobValues = [1,2,3,4]`
- **Expected Output**: `0` (Draw)
- **Explanation**: Symmetric values lead to equal final scores.
- **Category**: Symmetric competition

## Edge Cases

### Test Case 11: Maximum Size Array (Performance)
- **Input**: Large arrays with `n = 10000`
- **Expected**: Should complete within reasonable time (<1 second)
- **Category**: Performance test, large input

### Test Case 12: All Minimum Values  
- **Input**: `aliceValues = [1,1,1,1,1]`, `bobValues = [1,1,1,1,1]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: Alice picks 3 stones, Bob picks 2 stones.
- **Category**: Minimum constraint values

### Test Case 13: All Maximum Values
- **Input**: `aliceValues = [100,100]`, `bobValues = [100,100]`
- **Expected Output**: `1` (Alice wins)  
- **Explanation**: Alice picks first stone, Bob picks second. Both get 100, but Alice goes first in case of ties.
- **Category**: Maximum constraint values

### Test Case 14: Alternating High Values
- **Input**: `aliceValues = [100,1,100,1]`, `bobValues = [1,100,1,100]`
- **Expected Output**: `0` (Draw)
- **Explanation**: Combined values all 101, alternating picks lead to equal scores.
- **Category**: Alternating pattern

## Complex Strategic Cases

### Test Case 15: Sacrifice Strategy
- **Input**: `aliceValues = [1,10,1]`, `bobValues = [10,1,10]`
- **Expected Output**: `-1` (Bob wins)
- **Explanation**: Combined values: [11,11,11]. Alice gets 1+1=2, Bob gets 10.
- **Category**: Strategic sacrifice

### Test Case 16: Two vs Many
- **Input**: `aliceValues = [50,50,1,1,1]`, `bobValues = [1,1,10,10,10]`
- **Expected Output**: `1` (Alice wins)
- **Explanation**: Alice secures the two high-value stones for herself.
- **Category**: Distribution strategy

### Test Case 17: Equal Combined, Different Distribution
- **Input**: `aliceValues = [6,4,2]`, `bobValues = [2,4,6]`
- **Expected Output**: `0` (Draw)
- **Explanation**: All combined values = 8. Alice gets 6+2=8, Bob gets 4+4=8.
- **Category**: Equal sums, different paths

## Pattern Testing Cases

### Test Case 18: Fibonacci-like Values
- **Input**: `aliceValues = [1,1,2,3,5]`, `bobValues = [5,3,2,1,1]`
- **Expected Output**: `0` (Draw)
- **Explanation**: Symmetric Fibonacci pattern leads to equal final scores.
- **Category**: Mathematical pattern

### Test Case 19: Geometric Progression
- **Input**: `aliceValues = [1,2,4,8]`, `bobValues = [8,4,2,1]`
- **Expected Output**: `0` (Draw)  
- **Explanation**: Combined values all equal 9, symmetric distribution.
- **Category**: Geometric pattern

### Test Case 20: Prime Numbers
- **Input**: `aliceValues = [2,3,5,7]`, `bobValues = [7,5,3,2]`
- **Expected Output**: `0` (Draw)
- **Explanation**: Symmetric prime distribution.
- **Category**: Prime number pattern

## Error Handling Test Cases

### Test Case 21: Empty Arrays
- **Input**: `aliceValues = []`, `bobValues = []`
- **Expected Behavior**: Show "Arrays cannot be empty" error
- **Category**: Input validation

### Test Case 22: Mismatched Array Lengths
- **Input**: `aliceValues = [1,2,3]`, `bobValues = [1,2]`
- **Expected Behavior**: Show "Arrays must have same length" error
- **Category**: Input validation

### Test Case 23: Invalid Values - Too High
- **Input**: `aliceValues = [101,2]`, `bobValues = [1,2]`
- **Expected Behavior**: Show "Values must be between 1 and 100" error
- **Category**: Constraint validation

### Test Case 24: Invalid Values - Too Low  
- **Input**: `aliceValues = [0,2]`, `bobValues = [1,2]`
- **Expected Behavior**: Show "Values must be between 1 and 100" error
- **Category**: Constraint validation

### Test Case 25: Non-numeric Input
- **Input**: `aliceValues = "abc"`, `bobValues = [1,2,3]`
- **Expected Behavior**: Show "Invalid array format" error
- **Category**: Input format validation

## UI-Specific Test Cases

### Test Case 26: Input Parsing
- **Scenario**: Test different input formats like "[1,2,3]" vs "1,2,3"
- **Expected**: Both formats should be parsed correctly
- **Category**: UI input handling

### Test Case 27: Visual Updates
- **Scenario**: Calculate result and verify all UI components update
- **Expected**: Result display, scores, and stone visualization all update
- **Category**: UI state management

### Test Case 28: Loading State
- **Scenario**: Test loading state during calculation
- **Expected**: Button shows "Calculating..." and is disabled
- **Category**: UI interaction feedback

## Performance Benchmarks

### Test Case 29: Large Input Performance
- **Input**: Arrays of size 50,000 with random values
- **Expected**: Complete within 2 seconds
- **Category**: Performance benchmark

### Test Case 30: Memory Usage
- **Input**: Maximum size arrays (100,000 elements)  
- **Expected**: No memory overflow, reasonable memory usage
- **Category**: Memory stress test

## Summary

- **Total Test Cases**: 30
- **Basic Cases**: 5
- **Advanced Cases**: 5  
- **Edge Cases**: 4
- **Complex Strategic**: 3
- **Pattern Cases**: 3
- **Error Handling**: 5
- **UI Cases**: 3
- **Performance**: 2

These test cases cover:
- ✅ Algorithm correctness for all scenarios
- ✅ Edge cases and constraint validation
- ✅ Performance with large inputs
- ✅ Input validation and error handling  
- ✅ UI behavior and user experience
- ✅ Strategic game theory scenarios
- ✅ Mathematical patterns and symmetries