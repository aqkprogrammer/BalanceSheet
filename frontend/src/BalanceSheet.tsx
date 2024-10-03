import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

interface Cell {
    Value: string;
    Attributes?: { Value: string; Id: string }[];
}

interface Row {
    RowType: string;
    Cells?: Cell[];
    Title?: string;
    Rows?: Row[];
}

interface Report {
    ReportID: string;
    ReportName: string;
    ReportDate: string;
    Rows: Row[];
}

interface BalanceSheetData {
    Reports: Report[];
}

const BalanceSheet: React.FC = () => {
    const [data, setData] = useState<BalanceSheetData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/api.xro/2.0/Reports/BalanceSheet');
                console.log('Fetched data:', response.data); // Log the fetched data
                setData(response.data);
            } catch (error) {
                console.error('Error fetching balance sheet data', error);
            }
        };

        fetchData();
    }, []);

    const renderRows = (rows: Row[]) => {
        return rows.map((row, index) => {
            if (row.RowType === 'Header') {
                return (
                    <TableRow key={index} style={{ backgroundColor: '#f0f0f0' }}>
                        {row.Cells?.map((cell, cellIndex) => (
                            <TableCell key={cellIndex} style={{ fontWeight: 'bold' }}>{cell.Value}</TableCell>
                        ))}
                    </TableRow>
                );
            } else if (row.RowType === 'SummaryRow') {
                return (
                    <TableRow key={index} style={{ backgroundColor: '#e0e0e0' }}>
                        {row.Cells?.map((cell, cellIndex) => (
                            <TableCell key={cellIndex} style={{ fontWeight: 'bold' }}>{cell.Value}</TableCell>
                        ))}
                    </TableRow>
                );
            } else if (row.RowType === 'Section' && row.Rows) {
                return (
                    <React.Fragment key={index}>
                        <TableRow>
                            <TableCell colSpan={3} style={{ fontWeight: 'bold' }}>
                                {row.Title}
                            </TableCell>
                        </TableRow>
                        {renderRows(row.Rows)}
                    </React.Fragment>
                );
            } else if (row.RowType === 'Row') {
                return (
                    <TableRow key={index}>
                        {row.Cells?.map((cell, cellIndex) => (
                            <TableCell key={cellIndex}>{cell.Value}</TableCell>
                        ))}
                    </TableRow>
                );
            } else if (row.Rows) {
                return (
                    <React.Fragment key={index}>
                        <TableRow>
                            <TableCell colSpan={3} style={{ fontWeight: 'bold' }}>
                                {row.Title}
                            </TableCell>
                        </TableRow>
                        {renderRows(row.Rows)}
                    </React.Fragment>
                );
            }
            return null;
        });
    };

    return (
        <Container>
            {data ? (
                data.Reports.map((report) => (
                    <Paper elevation={3} key={report.ReportID} style={{ marginBottom: '20px', padding: '20px' }}>
                        <Typography variant="h5">{report.ReportName}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {report.ReportDate}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        {report.Rows[0]?.Cells?.slice(1).map((cell, cellIndex) => (
                                            <TableCell key={cellIndex}>{cell.Value}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderRows(report.Rows)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ))
            ) : (
                <Typography variant="h6">Loading...</Typography>
            )}
        </Container>
    );
};

export default BalanceSheet;
