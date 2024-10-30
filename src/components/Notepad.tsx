// src/Notepad.tsx
import React, { useState, useRef, ChangeEvent } from 'react';
import { evaluate } from 'mathjs';
import './Notepad.css';

interface LineResult {
  line: string;
  result: string;
}

const Notepad: React.FC = () => {
  const [text, setText] = useState<string>('');
  const scopeRef = useRef<Record<string, any>>({}); // Type for scope storage

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const calculateResult = (expression: string): string => {
    try {
      if (expression.includes('=')) {
        const [variable, valueExpr] = expression.split('=').map(part => part.trim());

        if (!variable || !valueExpr) {
          return 'Error: Invalid assignment';
        }

        // Evaluate right side with scope
        const evaluatedValue = evaluate(valueExpr, scopeRef.current);
        scopeRef.current[variable] = evaluatedValue;
        return `${evaluatedValue}`;
      } else {
        return evaluateExpression(expression);
      }
    } catch {
      return 'Error: Invalid expression';
    }
  };

  const evaluateExpression = (expr: string): string => {
    try {
      return evaluate(expr, scopeRef.current).toString();
    } catch {
      return 'Error';
    }
  };

  const lines = text.split('\n');
  const linesWithResults: LineResult[] = lines.map((line) => ({
    line,
    result: line.trim() ? calculateResult(line) : ''
  }));

  return (
    <div className="notepad-app">
      <h1 className="title">Notepad Calculator</h1>
      <div className="notepad-container">
        <textarea
          className="notepad-textarea"
          value={text}
          onChange={handleChange}
          placeholder="Type expressions here (e.g., a = 5, a + 3)..."
        />
        <div className="overlay">
          {linesWithResults.map((item, index) => (
            <div key={index} className="overlay-line">
              <span className="line-text">{item.line}</span>
              {item.result && (
                <span className="line-result"> = {item.result}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notepad;

