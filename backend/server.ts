import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Balance Sheet API! Use /api/balance-sheet to get data.');
});

// Balance Sheet API route
app.get('/api.xro/2.0/Reports/BalanceSheet', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('http://xero-mock-api:3000/api.xro/2.0/Reports/BalanceSheet');
        res.json(response.data);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching balance sheet:', error.message);
            res.status(error.response?.status || 500).json({ message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ message: 'Failed to fetch balance sheet' });
        }
    }
});

// Start the server only if this module is the main module
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for testing
export default app;
