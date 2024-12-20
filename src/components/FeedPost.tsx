import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { evaluate } from 'mathjs';
import { Warning } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const timeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp.seconds * 1000) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval}y ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}mo ago`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}d ago`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}h ago`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}m ago`;
    return `${seconds}s ago`;
};

const FeedPost = ({ post, math, isCurrentUser = false, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const scope = post.scope || {};
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDelete?.(post.id); // Calls the onDelete function if provided
        handleMenuClose();
    };

    const calculateResult = (expression: string) => {
        try {
            if (expression.includes('=')) {
                const [variable, valueExpr] = expression.split('=').map(part => part.trim());
                if (!variable || !valueExpr) return 'Error: Invalid assignment';
                
                const evaluatedValue = evaluate(valueExpr, scope);
                scope[variable] = evaluatedValue;
                return evaluatedValue.toString();
            } else {
                return evaluate(expression, scope).toString();
            }
        } catch (error) {
            return `Error: ${error.message}`;
        }
    };

    return (
        <Grid item xs={12} key={post.id}>
            <Paper sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }} onClick={() => navigate(`/users/${post.username}`)}>
                        {post.username}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {timeAgo(post.createdAt)}
                    </Typography>
                    {isCurrentUser && (
                        <IconButton onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleDelete} sx={{ color: 'error.main', gap: 2 }}> <Warning/> Delete Post</MenuItem>
                        {/* Additional options can go here */}
                    </Menu>
                    </Box>
                </Box>

                <Typography variant="body1">{post.title}</Typography>

                <Box sx={{ marginTop: 1, backgroundColor: 'background.default', borderRadius: '5px', padding: "10px" }}>
                    {post.content.split('\\n').map((line: string, index: number) => {
                        const trimmedLine = line.trim();
                        const hashtagCount = (trimmedLine.match(/#/g) || []).length;

                        if (!trimmedLine) {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        backgroundColor: 'background',
                                        padding: 1,
                                        marginTop: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    <Typography variant="body2" component="span">
                                        {line}
                                    </Typography>
                                </Box>
                            );
                        }

                        if (hashtagCount > 0) {
                            const HeaderTag = `h${Math.min(hashtagCount + 1, 6)}`;
                            return (
                                <Typography key={index} variant="body2" component={HeaderTag}>
                                    {line}
                                </Typography>
                            );
                        }

                        const result = calculateResult(trimmedLine);

                        return (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    backgroundColor: 'background',
                                    padding: 1,
                                    marginTop: 1,
                                    borderRadius: 1,
                                }}
                            >
                                <Typography variant="body2" component="span">
                                    {line}
                                </Typography>
                                <Typography variant="body2" component="span" color="primary">
                                    = {result}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Paper>
        </Grid>
    );
};

export default FeedPost;

