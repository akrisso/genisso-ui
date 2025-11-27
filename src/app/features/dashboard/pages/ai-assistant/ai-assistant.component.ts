
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

type AssistantState = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-ai-assistant',
  imports: [FormsModule],
  templateUrl: './ai-assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `textarea::before {
        content: "Patient:";
        font-weight: 900 !important;
      }

    textarea::after {
      content: "Nurse:";
      font-weight: 900 !important;
    }`
  ]
})
export class AiAssistantComponent {
  private geminiService = inject(GeminiService);
  
  callTranscript = signal<string>(`Patient: "Hi, I'm not feeling well. I've tried resting and taking over-the-counter medication, but I'm not getting better. My fever is actually getting worse."

Nurse: "I'm sorry to hear you're feeling so poorly. We'll get you sorted out. To pull up your information, could you please confirm your full name and phone number registered?"

Patient: "It's Subramanya, and my number is 988****144."

Nurse: "Thank you, Mr. Subramanya. I see you in our system. I've just logged your chief complaint as a persistent and worsening fever. I've checked with our triage desk, and due to the high volume of patients we're seeing this evening, there is a bit of a wait. Our clinical team is working diligently to see everyone as quickly as possible. Based on the current queue, we anticipate a physician will be able to assess you within the next two hours. We'll get you feeling better soon.`);
  summary = signal<string>('');
  state = signal<AssistantState>('idle');

  async getSummary() {
    if (!this.callTranscript().trim()) return;

    this.state.set('loading');
    this.summary.set('');

   
    try {
      const result = await this.geminiService.summarizeText(this.callTranscript() + `** Add the Sample next dialog parts as shown above **`);
      this.summary.set(result);
      this.state.set('success');
    } catch (error) {
      console.error('Error getting summary from Gemini API:', error);
      this.summary.set('Sorry, I couldn\'t generate a summary. Please try again.');
      this.state.set('error');
    }
  }
}
