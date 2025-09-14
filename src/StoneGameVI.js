import React, { useState } from 'react';
import './StoneGameVI.css';

function StoneGameVI() {
    const [aliceValues, setAliceValues] = useState('');
    const [bobValues, setBobValues] = useState('');
    const [result, setResult] = useState(null);
    const [gameAnalysis, setGameAnalysis] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const stoneGameVI = (aliceValues, bobValues) => {
        const n = aliceValues.length;

        const stones = aliceValues.map((aliceVal, i) => ({
            index: i,
            aliceValue: aliceVal,
            bobValue: bobValues[i],
            combinedValue: aliceVal + bobValues[i] 
        }));

        stones.sort((a, b) => b.combinedValue - a.combinedValue);

        let aliceScore = 0;
        let bobScore = 0;
        const pickOrder = [];

        for (let turn = 0; turn < n; turn++) {
            const stone = stones[turn];
            if (turn % 2 === 0) {

                aliceScore += stone.aliceValue;
                pickOrder.push({
                    turn: turn + 1,
                    player: 'Alice',
                    stone: stone,
                    scoreGained: stone.aliceValue
                });
            } else {

                bobScore += stone.bobValue;
                pickOrder.push({
                    turn: turn + 1,
                    player: 'Bob',
                    stone: stone,
                    scoreGained: stone.bobValue
                });
            }
        }

        let gameResult;
        if (aliceScore > bobScore) gameResult = 1;
        else if (bobScore > aliceScore) gameResult = -1;
        else gameResult = 0;

        return {
            result: gameResult,
            aliceScore,
            bobScore,
            stones,
            pickOrder,
            sortedStones: stones
        };
    };

    const parseArray = (str) => {
        try {

            let cleaned = str.trim();
            if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
                cleaned = cleaned.slice(1, -1);
            }

            const numbers = cleaned.split(',').map(s => {
                const num = parseInt(s.trim());
                if (isNaN(num)) throw new Error('Invalid number');
                return num;
            });

            return numbers;
        } catch (e) {
            throw new Error('Invalid array format');
        }
    };

    const handleCalculate = () => {
        setError('');
        setResult(null);
        setGameAnalysis(null);

        try {

            const aliceArr = parseArray(aliceValues);
            const bobArr = parseArray(bobValues);

            if (aliceArr.length === 0 || bobArr.length === 0) {
                setError('Arrays cannot be empty');
                return;
            }

            if (aliceArr.length !== bobArr.length) {
                setError('Alice and Bob arrays must have the same length');
                return;
            }

            if (aliceArr.length > 100000) {
                setError('Array length cannot exceed 100,000');
                return;
            }

            const hasInvalidValue = [...aliceArr, ...bobArr].some(val => val < 1 || val > 100);
            if (hasInvalidValue) {
                setError('All values must be between 1 and 100');
                return;
            }

            setIsLoading(true);

            setTimeout(() => {
                try {
                    const analysis = stoneGameVI(aliceArr, bobArr);
                    setResult(analysis.result);
                    setGameAnalysis(analysis);
                    setIsLoading(false);
                } catch (err) {
                    setError('An error occurred during calculation');
                    setIsLoading(false);
                }
            }, 100);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleReset = () => {
        setAliceValues('');
        setBobValues('');
        setResult(null);
        setGameAnalysis(null);
        setError('');
    };

    const loadExample = (exampleNum) => {
        const examples = [
            { alice: '[1,3]', bob: '[2,1]' },
            { alice: '[1,2]', bob: '[3,1]' },
            { alice: '[2,4,3]', bob: '[1,6,7]' }
        ];

        if (examples[exampleNum]) {
            setAliceValues(examples[exampleNum].alice);
            setBobValues(examples[exampleNum].bob);
            setError('');
        }
    };

    const getResultText = () => {
        if (result === 1) return 'Alice Wins!';
        if (result === -1) return 'Bob Wins!';
        return "It's a Draw!";
    };

    const getResultClass = () => {
        if (result === 1) return 'alice-wins';
        if (result === -1) return 'bob-wins';
        return 'draw';
    };

    return (
        <div className="stone-game-container">
            {}
            <div className="header">
                <h1>Stone Game VI</h1>
                <p className="description">
                    Alice and Bob take turns picking stones with different values. Both play optimally. Who wins?
                </p>
            </div>

            {}
            <div className="input-section">
                <div className="input-group">
                    <label htmlFor="alice-input">Alice's Values:</label>
                    <input
                        id="alice-input"
                        data-testid="alice-values-input"
                        type="text"
                        className="array-input"
                        value={aliceValues}
                        onChange={(e) => setAliceValues(e.target.value)}
                        placeholder="Enter array like: 1,3,5 or [1,3,5]"
                    />
                    <div className="input-help">
                        Enter comma-separated values (1-100 each)
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="bob-input">Bob's Values:</label>
                    <input
                        id="bob-input"
                        data-testid="bob-values-input"
                        type="text"
                        className="array-input"
                        value={bobValues}
                        onChange={(e) => setBobValues(e.target.value)}
                        placeholder="Enter array like: 2,1,4 or [2,1,4]"
                    />
                    <div className="input-help">
                        Must have same length as Alice's values
                    </div>
                </div>
                <div className="button-group">
                    <button
                        data-testid="calculate-button"
                        onClick={handleCalculate}
                        disabled={isLoading || !aliceValues || !bobValues}
                        className="calculate-btn"
                    >
                        {isLoading ? 'Calculating...' : 'Calculate Winner'}
                    </button>
                    <button
                        data-testid="reset-button"
                        onClick={handleReset}
                        className="reset-btn"
                    >
                        Reset
                    </button>
                    <button
                        onClick={() => loadExample(0)}
                        className="example-btn"
                    >
                        Example 1
                    </button>
                </div>
            </div>

            {}
            {error && (
                <div className="error" data-testid="error-message">
                    {error}
                </div>
            )}

            {}
            {result !== null && gameAnalysis && (
                <div className="result-section">
                    <div className={`result ${getResultClass()}`} data-testid="result-display">
                        <h2>{getResultText()}</h2>
                        <p>
                            Final Score - Alice: {gameAnalysis.aliceScore}, Bob: {gameAnalysis.bobScore}
                        </p>
                    </div>

                    {}
                    <div className="score-display">
                        <div className="player-score">
                            <h3>Alice</h3>
                            <div className="score alice-score">{gameAnalysis.aliceScore}</div>
                        </div>
                        <div className="player-score">
                            <h3>Bob</h3>
                            <div className="score bob-score">{gameAnalysis.bobScore}</div>
                        </div>
                    </div>

                    {}
                    <div className="stones-visualization">
                        <h3>Stones (sorted by optimal picking order):</h3>
                        <div className="stones-grid" data-testid="stones-visualization">
                            {gameAnalysis.sortedStones.map((stone, pickIndex) => {
                                const isPicked = pickIndex < gameAnalysis.pickOrder.length;
                                const pickedBy = isPicked ? gameAnalysis.pickOrder[pickIndex].player : null;

                                return (
                                    <div 
                                        key={stone.index} 
                                        className={`stone-card ${pickedBy === 'Alice' ? 'alice-picked' : pickedBy === 'Bob' ? 'bob-picked' : ''}`}
                                    >
                                        <div className="stone-index">Stone {stone.index}</div>
                                        <div className="stone-values">
                                            <span className="alice-value">A: {stone.aliceValue}</span>
                                            <span className="bob-value">B: {stone.bobValue}</span>
                                        </div>
                                        <div className="combined-value">
                                            Combined: {stone.combinedValue}
                                        </div>
                                        {isPicked && (
                                            <div className="pick-order">
                                                {pickedBy} picks (turn {pickIndex + 1})
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {}
            {gameAnalysis && (
                <div className="strategy-section">
                    <h3>Optimal Strategy Analysis</h3>
                    <div className="strategy-explanation">
                        <p>
                            🧠 Key Insight: Sort stones by their combined value (Alice's value + Bob's value) in descending order.
                        </p>
                        <p>
                            Why? Taking a stone gives you points AND denies your opponent points!
                        </p>
                        <div>
                            <strong>Picking Order:</strong>
                            <div className="optimal-order">
                                {gameAnalysis.pickOrder.map((pick, i) => (
                                    <div key={i} className="order-item">
                                        {pick.turn}. {pick.player} takes Stone {pick.stone.index} (+{pick.scoreGained})
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {}
            <div className="explanation-section">
                <h3>How it works</h3>
                <div className="explanation">
                    <p>
                        1. 🎯 The key insight: When you pick a stone, you gain points AND prevent your opponent from gaining their points from that stone.
                    </p>
                    <p>
                        2. 🧮 Calculate the "combined value" for each stone: Alice's value + Bob's value.
                    </p>
                    <p>
                        3. 📊 Sort all stones by combined value in descending order.
                    </p>
                    <p>
                        4. 🎲 Simulate optimal play: Alice picks 1st, 3rd, 5th... Bob picks 2nd, 4th, 6th...
                    </p>
                    <p>
                        5. ⚡ Time Complexity: O(n log n) for sorting, Space Complexity: O(n)
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StoneGameVI;