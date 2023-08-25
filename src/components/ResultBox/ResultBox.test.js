import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

const testCasesPLNtoUSD = [
  { amount: 100, from: 'PLN', to: 'USD' },
  { amount: 20, from: 'PLN', to: 'USD' },
  { amount: 200, from: 'PLN', to: 'USD' },
  { amount: 345, from: 'PLN', to: 'USD' },
];

const testCasesUSDtoPLN = [
  { amount: 100, from: 'USD', to: 'PLN' },
  { amount: 20, from: 'USD', to: 'PLN' },
  { amount: 200, from: 'USD', to: 'PLN' },
  { amount: 345, from: 'USD', to: 'PLN' },
];


describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />)
  });
  for (const testCase of testCasesPLNtoUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {

      // render component
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);

      // find results div
      const resultsField = screen.getByTestId('results');

      expect(resultsField).toHaveTextContent(convertPLNToUSD(testCase.amount));
    });
    cleanup();
  };

  for (const testCase of testCasesUSDtoPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {

      // render component
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);

      // find results div
      const resultsField = screen.getByTestId('results');

      expect(resultsField).toHaveTextContent(convertUSDToPLN(testCase.amount));
    })
    cleanup();
  };
  it('should render proper info when from and to values are USD', () => {

    // render component
    render(<ResultBox from='USD' to='USD' amount={100} />);

    // find results div
    const resultsField = screen.getByTestId('results');

    expect(resultsField).toHaveTextContent('$100.00 = $100.00');
  });
  it('should render proper info when from and to values are PLN', () => {

    // render component
    render(<ResultBox from='PLN' to='PLN' amount={100} />);

    // find results div
    const resultsField = screen.getByTestId('results');

    expect(resultsField).toHaveTextContent('PLN 100.00 = PLN 100.00');
  });
  it('should render "Wrong value…” if given amount is less than 0', () => {
    // render component
    render(<ResultBox from='USD' to='PLN' amount={-5} />);

    // find results div
    const resultsField = screen.getByTestId('results');

    expect(resultsField).toHaveTextContent('Wrong value...');
  })
});

