import agentApi from './agentApi';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatResponse = {
  success: boolean;
  session_id: string;
  response: string;
  updated_chat_history: ChatMessage[];
};

const AgentService = {
  // Sync Analysis – POST /analyze-sync
  runAnalysisSync: async (payload: {
    first_name: string;
    last_name: string;
    ssn: string;
    date_of_birth: string;
    gender: 'M' | 'F';
    zip_code: string;
  }) => {
    try {
      const response = await agentApi.post('/analyze-sync', payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Sync analysis failed:', error);
      if (error.response?.data?.detail) {
        return { success: false, errors: error.response.data.detail };
      }
      return { success: false, errors: [{ msg: 'Unknown error occurred' }] };
    }
  },

  // Chat With Analysis – POST /chat
  sendChatMessage: async (
    sessionId: string,
    question: string,
    chatHistory: ChatMessage[] = []
  ): Promise<ChatResponse> => {
    try {
      const response = await agentApi.post('/chat', {
        session_id: sessionId,
        question,
        chat_history: chatHistory,
      });

      return {
        success: true,
        session_id: response.data.session_id,
        response: response.data.response,
        updated_chat_history: response.data.updated_chat_history,
      };
    } catch (error: any) {
      console.error('Chat request failed:', error);

      if (error.response?.status === 404) {
        return {
          success: false,
          session_id: sessionId,
          response: 'Session not found',
          updated_chat_history: [],
        };
      }

      if (error.response?.data?.detail) {
        return {
          success: false,
          session_id: sessionId,
          response: error.response.data.detail,
          updated_chat_history: [],
        };
      }

      return {
        success: false,
        session_id: sessionId,
        response: 'Unexpected error occurred',
        updated_chat_history: [],
      };
    }
  },
};

export default AgentService;
