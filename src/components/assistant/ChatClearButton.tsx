// // components/chatbot/ChatClearButton.tsx
// import React from 'react';
// import { Box } from '@mui/material';

// interface ChatClearButtonProps {
//   onClear: () => void;
// }

// const ChatClearButton: React.FC<ChatClearButtonProps> = ({ onClear }) => (
//   <Box sx={{ px: 2, py: 1 }}>
//     <Box
//       onClick={onClear}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') onClear();
//       }}
//       sx={{
//         textAlign: 'center',
//         fontSize: '0.85rem',
//         color: '#1355E9',
//         cursor: 'pointer',
//         textDecoration: 'underline',
//         '&:hover': {
//           color: '#1E58AA',
//         },
//       }}
//     >
//       Clear Chat History
//     </Box>

//   </Box>
// );

// export default ChatClearButton;


"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

type ChatClearButtonProps = {
  onClear: () => void
}

export default function ChatClearButton({ onClear }: ChatClearButtonProps) {
  return (
    <div className="mt-3 flex justify-center">
      <Button
        onClick={onClear}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClear();
        }}
        variant="outline"
        size="sm"
        className="rounded-full border-slate-200 text-slate-600 hover:bg-slate-100 bg-transparent"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Clear Chat
      </Button>
    </div>
  )
}
