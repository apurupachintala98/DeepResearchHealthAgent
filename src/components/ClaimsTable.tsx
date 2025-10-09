// // // src/components/ClaimsTable.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Tooltip, InputBase
} from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

interface ClaimsTableProps {
    title: string;
    data: any[];
    message: string;
    columnDefinitions: Record<string, string>;
}

const ClaimsTable: React.FC<ClaimsTableProps> = ({ title, data, message, columnDefinitions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(() =>
        Object.keys(columnDefinitions).reduce((acc: Record<string, boolean>, key) => {
            acc[key] = true;
            return acc;
        }, {})
    );

    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const columnMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsFullscreen(false);
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    // Close column menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                columnMenuRef.current &&
                !columnMenuRef.current.contains(event.target as Node)
            ) {
                setShowColumnMenu(false);
            }
        };

        if (showColumnMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showColumnMenu]);

    const handleDownloadCSV = () => {
        if (!data.length) return;
        const escapeCSV = (value: any) => `"${String(value).replace(/"/g, '""')}"`;
        const csv = [
            Object.keys(data[0]).map(escapeCSV).join(','),
            ...data.map(row => Object.values(row).map(escapeCSV).join(','))
        ].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'claims_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredData = data.filter(row =>
        Object.values(row).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Box
            sx={{
                position: isFullscreen ? 'fixed' : 'relative',
                top: isFullscreen ? 0 : 'auto',
                left: isFullscreen ? 0 : 'auto',
                width: isFullscreen ? '100vw' : 'auto',
                height: isFullscreen ? '100vh' : 'auto',
                backgroundColor: isFullscreen ? 'white' : 'transparent',
                zIndex: isFullscreen ? 1300 : 'auto',
                padding: isFullscreen ? 2 : 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Toolbar */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Tooltip title="Show/Hide Columns">
                        <IconButton size="small" onClick={() => setShowColumnMenu(prev => !prev)}>
                            <ViewColumnIcon />
                        </IconButton>
                    </Tooltip>

                    {showColumnMenu && (
                        <Paper
                            ref={columnMenuRef}
                            sx={{ position: 'absolute', top: 40, right: 0, zIndex: 1400, p: 1 }}
                        >
                            {(Object.keys(visibleColumns) as Array<keyof typeof visibleColumns>).map((col) => (
                                <Box key={col} display="flex" alignItems="center">
                                    <input
                                        type="checkbox"
                                        checked={visibleColumns[col]}
                                        onChange={() =>
                                            setVisibleColumns((prev) => ({
                                                ...prev,
                                                [col]: !prev[col],
                                            }))
                                        }
                                    />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        {columnDefinitions[col]}
                                    </Typography>
                                </Box>
                            ))}
                        </Paper>
                    )}

                    <Tooltip title="Download as CSV">
                        <IconButton size="small" onClick={handleDownloadCSV}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isFullscreen ? "Exit Full Screen" : "Full Screen"}>
                        <IconButton size="small" onClick={() => setIsFullscreen(prev => !prev)}>
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </Tooltip>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            py: 0.5,
                            border: '1px solid #ccc',
                            borderRadius: 1,
                        }}
                    >
                        <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                        <InputBase
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ fontSize: '0.875rem' }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: isFullscreen ? 'calc(100vh - 150px)' : 400,
                    overflowY: 'auto',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {(Object.keys(visibleColumns) as Array<keyof typeof visibleColumns>).map(
                                (col) =>
                                    visibleColumns[col] && (
                                        <TableCell key={col}>
                                            <strong>{columnDefinitions[col]}</strong>
                                        </TableCell>
                                    )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={index}>
                                {(Object.keys(visibleColumns) as Array<keyof typeof visibleColumns>).map(
                                    (col) =>
                                        visibleColumns[col] && (
                                            <TableCell key={col}>{row[col]}</TableCell>
                                        )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Message */}
            <Typography variant="body2" sx={{ mt: 2, color: 'green' }}>
                {message}
            </Typography>
        </Box>
    );
};

export default ClaimsTable;
