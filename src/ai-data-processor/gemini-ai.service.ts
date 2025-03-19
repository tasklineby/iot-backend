import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GET_METRICS_ANALYTICS_PROMPT,
  MetricsAnalyticsParameters,
  metricsAnalyticsSchema,
} from 'src/constants/constants';

@Injectable()
export class GeminiAIService {
  constructor(private readonly configService: ConfigService) {}

  private readonly ai = new GoogleGenerativeAI(
    this.configService.getOrThrow<string>('GEMINI_API_KEY'),
  );
  private readonly metricsModel = this.ai.getGenerativeModel({
    model: this.configService.getOrThrow<string>('GEMINI_MODEL'),
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: metricsAnalyticsSchema,
    },
  });

  async generateMetricsAnalytics(parameters: MetricsAnalyticsParameters) {
    const prompt: string = this.formatPrompt<MetricsAnalyticsParameters>(
      GET_METRICS_ANALYTICS_PROMPT,
      parameters,
    );

    console.log(prompt);

    const result = await this.metricsModel.generateContent(prompt);

    return JSON.parse(result.response.text());
  }

  private formatPrompt<T>(template: string, values: T) {
    return template.replace(/{([a-zA-Z]+)}/g, (match, key) =>
      values[key] !== undefined ? values[key] : match,
    );
  }
}
