// components/chatbot/ChatClearButton.tsx
import React from 'react';
import { Box } from '@mui/material';

interface ChatClearButtonProps {
  onClear: () => void;
}

const ChatClearButton: React.FC<ChatClearButtonProps> = ({ onClear }) => (
  <Box sx={{ px: 2, py: 1 }}>
    <Box
      onClick={onClear}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClear();
      }}
      sx={{
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#1355E9',
        cursor: 'pointer',
        textDecoration: 'underline',
        '&:hover': {
          color: '#1E58AA',
        },
      }}
    >
      Clear Chat History
    </Box>
  </Box>
);

export default ChatClearButton;
