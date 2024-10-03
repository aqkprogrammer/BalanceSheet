import { render, screen } from '@testing-library/react';
import BalanceSheet from './BalanceSheet';
import axios from 'axios';

jest.mock('axios');

const mockData = {
    Reports: [
        {
            ReportID: 'BalanceSheet',
            ReportName: 'Balance Sheet',
            ReportDate: '23 February 2018',
            Rows: [
                {
                    RowType: 'Header',
                    Cells: [
                        { Value: '' },
                        { Value: '28 Feb 2018' },
                        { Value: '28 Feb 2017' }
                    ]
                },
                {
                    RowType: 'Section',
                    Title: 'Assets'
                },
                {
                    RowType: 'Row',
                    Cells: [
                        { Value: 'Business Bank Account' },
                        { Value: '-2894.08' },
                        { Value: '0.00' }
                    ]
                },
                {
                    RowType: 'SummaryRow',
                    Cells: [
                        { Value: 'Total Bank' },
                        { Value: '3984.20' },
                        { Value: '0.00' }
                    ]
                }
            ]
        }
    ]
};

describe('BalanceSheet Component', () => {
    it('renders loading state initially', () => {
        render(<BalanceSheet />);
        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });

    it('displays the balance sheet data', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

        render(<BalanceSheet />);
        
        // Wait for the loading state to resolve
        const titleElement = await screen.findByText(/Balance Sheet/i);
        expect(titleElement).toBeInTheDocument();

        const reportDate = screen.getByText(/23 February 2018/i);
        expect(reportDate).toBeInTheDocument();

        const assetSection = screen.getByText(/Assets/i);
        expect(assetSection).toBeInTheDocument();

        const totalBank = screen.getByText(/Total Bank/i);
        expect(totalBank).toBeInTheDocument();
    });
});
