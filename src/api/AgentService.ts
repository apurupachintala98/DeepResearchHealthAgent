"use client";
import agentApi from './agentApi';

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export type JsonGraphData = {
  categories: string[];
  data: number[];
  graph_type: string;
  title: string;
};

export type ChatResponse = {
  success: boolean;
  session_id?: string;
  response: string;
  updated_chat_history: ChatMessage[];
  graph_present?: number;
  json_graph_data?: JsonGraphData;
};

let activeSessionId: string | null = null; // 🔐 Session ID cache

const AgentService = {
  // ✅ Sync Analysis – POST /analyze-sync
  runAnalysisSync: async (payload: {
    first_name: string;
    last_name: string;
    ssn: string;
    date_of_birth: string;
    gender: 'M' | 'F';
    zip_code: string;
  }): Promise<{ success: boolean; session_id?: string; data?: any; errors?: any }> => {
    try {
      const response = await agentApi.post('/analyze-sync', payload);

      const sessionId = response.data.session_id;
      if (sessionId) {
        activeSessionId = sessionId; // ✅ Cache session ID
      }

      return {
        success: true,
        session_id: sessionId,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Sync analysis failed:', error);
      if (error.response?.data?.detail) {
        return { success: false, errors: error.response.data.detail };
      }
      return { success: false, errors: [{ msg: 'Unknown error occurred' }] };
    }
  },

  // ✅ Chat With Analysis – POST /chat
  sendChatMessage: async ({
    sessionId,
    question,
    chatHistory = [],
  }: {
    sessionId?: string;
    question: string;
    chatHistory?: ChatMessage[];
  }): Promise<ChatResponse> => {
    const sid = sessionId || activeSessionId;
    if (!sid) {
      return {
        success: false,
        response: 'Session ID is missing. Please run analysis first.',
        updated_chat_history: [],
      };
    }

    try {
      const response = await agentApi.post('/chat', {
        session_id: sid,
        question,
        chat_history: chatHistory,
      });

      return {
        success: true,
        session_id: sid,
        response: response.data.response,
        updated_chat_history: response.data.updated_chat_history,
        graph_present: response.data.graph_present,
        json_graph_data: response.data.json_graph_data,
      };
    } catch (error: any) {
      console.error('Chat request failed:', error);
      return {
        success: false,
        session_id: sid,
        response: error.response?.data?.detail || 'Unexpected error occurred',
        updated_chat_history: [],
      };
    }
  },

  // ✅ Chat Graph Test – POST /chat/graph-test
  sendGraphTestMessage: async ({
    sessionId,
    question,
    chatHistory = [],
  }: {
    sessionId?: string;
    question: string;
    chatHistory?: ChatMessage[];
  }): Promise<ChatResponse> => {
    const sid = sessionId || activeSessionId;
    if (!sid) {
      return {
        success: false,
        response: 'Session ID is missing. Please run analysis first.',
        updated_chat_history: [],
      };
    }

    try {
      const response = await agentApi.post('/chat/graph-test', {
        session_id: sid,
        question,
        chat_history: chatHistory,
      });

      return {
        success: true,
        session_id: sid,
        response: response.data.response,
        updated_chat_history: response.data.updated_chat_history,
      };
    } catch (error: any) {
      console.error('Graph test chat request failed:', error);
      return {
        success: false,
        session_id: sid,
        response: error.response?.data?.detail || 'Unexpected error occurred',
        updated_chat_history: [],
      };
    }
  },

  // ✅ Get cached session ID
  getActiveSessionId: () => activeSessionId,
};

export default AgentService;
