import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const testCasesPLNToUSD = [
  { amount: '100', output: 'PLN 100.00 = $28.57'},
  { amount: '20' , output: 'PLN 20.00 = $5.71'},
  { amount: '200', output: 'PLN 200.00 = $57.14' },
  { amount: '543', output: 'PLN 543.00 = $155.14'},
];

const testCasesUSDToPLN = [
  { amount: '100', output: '$100.00 = PLN 350.00'},
  { amount: '20' , output: '$20.00 = PLN 70.00'},
  { amount: '200', output: '$200.00 = PLN 700.00' },
  { amount: '543', output: '$543.00 = PLN 1,900.50'},
];

const testCasesFromEqualTo = [
  { amount: '100', from: 'PLN', to: 'PLN' , output: 'PLN 100.00 = PLN 100.00'},
  { amount: '20' , from: 'USD', to: 'USD' , output: '$20.00 = $20.00'},
  { amount: '200', from: 'PLN', to: 'PLN' , output: 'PLN 200.00 = PLN 200.00' },
  { amount: '543', from: 'USD', to: 'USD' , output: '$543.00 = $543.00'},
];

const testCasesAmountLessZero = [
  { amount: '-100', from: 'PLN', to: 'PLN' , output: 'Wrong value…'},
  { amount: '-20' , from: 'USD', to: 'USD' , output: 'Wrong value…'},
  { amount: '-200', from: 'PLN', to: 'PLN' , output: 'Wrong value…' },
  { amount: '-543', from: 'USD', to: 'USD' , output: 'Wrong value…'},
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    for(const testObj of testCasesPLNToUSD) {
      render(<ResultBox from='PLN' to='USD' amount={parseInt(testObj.amount)} />);
      // find fields elems
      const output = screen.getByTestId('resultBox');
      // check if output was correct value
      expect(output).toHaveTextContent(testObj.output);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    for(const testObj of testCasesUSDToPLN) {
      render(<ResultBox from='USD' to='PLN' amount={parseInt(testObj.amount)} />);
      // find fields elems
      const output = screen.getByTestId('resultBox');
      // check if output was correct value
      expect(output).toHaveTextContent(testObj.output);
      cleanup();
    }
  });

  it('should render proper info about conversion when from == to', () => {
    for(const testObj of testCasesFromEqualTo) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      // find fields elems
      const output = screen.getByTestId('resultBox');
      // check if output was correct value
      expect(output).toHaveTextContent(testObj.output);
      cleanup();
    }
  });

  it('should render "Wrong value…" when amount less than zero', () => {
    for(const testObj of testCasesAmountLessZero) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      // find fields elems
      const output = screen.getByTestId('resultBox');
      // check if output was correct value
      expect(output).toHaveTextContent(testObj.output);
      cleanup();
    }
  });

});