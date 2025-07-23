import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const StatsTable = () => {
  const dummy = [
    {
      short: 'http://localhost:3000/abc12',
      original: 'https://example.com',
      hits: 5,
      expiry: new Date().toLocaleString(),
    }
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Short URL</TableCell>
          <TableCell>Original URL</TableCell>
          <TableCell>Hits</TableCell>
          <TableCell>Expiry</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dummy.map((row, i) => (
          <TableRow key={i}>
            <TableCell><a href={row.short}>{row.short}</a></TableCell>
            <TableCell>{row.original}</TableCell>
            <TableCell>{row.hits}</TableCell>
            <TableCell>{row.expiry}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;
