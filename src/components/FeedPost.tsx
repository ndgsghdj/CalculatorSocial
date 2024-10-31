import React from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box
} from '@mui/material';
import { evaluate } from 'mathjs';

// Helper function to format time ago
const timeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp.seconds * 1000) / 1000);
    let interval = Math.floor(seconds / 31536000); // Years
    if (interval > 1) return `${interval}y ago`;
    interval = Math.floor(seconds / 2592000); // Months
    if (interval > 1) return `${interval}mo ago`;
    interval = Math.floor(seconds / 86400); // Days
    if (interval > 1) return `${interval}d ago`;
    interval = Math.floor(seconds / 3600); // Hours
    if (interval > 1) return `${interval}h ago`;
    interval = Math.floor(seconds / 60); // Minutes
    if (interval > 1) return `${interval}m ago`;
    return `${seconds}s ago`; // Seconds
};

const FeedPost = ({ post, math }) => {
    const scope = post.scope || {}; // Ensure scope is available

    const calculateResult = (expression) => {
        try {
            // Check for assignment
            if (expression.includes('=')) {
                const [variable, valueExpr] = expression.split('=').map(part => part.trim());
                if (!variable || !valueExpr) return 'Error: Invalid assignment';
                
                const evaluatedValue = evaluate(valueExpr, scope);
                scope[variable] = evaluatedValue; // Update scope
                return evaluatedValue.toString();
            } else {
                return evaluate(expression, scope).toString(); // Direct evaluation
            }
        } catch (error) {
            return `Error: ${error.message}`; // More detailed error message
        }
    };

    return (
        <Grid item xs={12} key={post.id}>
            <Paper sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {post.username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {timeAgo(post.createdAt)}  {/* Display time ago */}
                    </Typography>
                </Box>

                <Typography variant="body1">{post.title}</Typography>

                <Box sx={{ marginTop: 1, backgroundColor: 'background.default', borderRadius: '5px', padding: "10px" }}>
                    {post.content.split('\\n').map((line, index) => {
                        const trimmedLine = line.trim();
                        const hashtagCount = (trimmedLine.match(/#/g) || []).length;

                        // Skip evaluation for blank lines
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

                        // Render header if hashtags are present
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

