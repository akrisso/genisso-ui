
import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
 
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;
  private apiKey = 'AIzaSyDM_nVTnWX0yBex8iCx14i6DdGJCOdeql4';
  constructor() {
    // IMPORTANT: This relies on `process.env.API_KEY` being available in the execution environment.
    // Do not hardcode API keys.
    if (!this.apiKey) {
      console.error('API_KEY environment variable not set.');
      // In a real app, you might want to throw an error or handle this more gracefully.
    }
    this.ai = new GoogleGenAI({ apiKey: this.apiKey });
  }

  async summarizeText(textToSummarize: string): Promise<string> {
    try {
      const prompt = `You are a helpful CRM assistant. Your task is to analyze a call transcript. 
      First, provide a concise one-sentence summary of the call.
      Second, list three actionable follow-up steps for the agent.
      
      Transcript:
      "${textToSummarize}"`;
      
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      

      return response.text || '';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to generate summary from Gemini API.');
    }
  }
}
