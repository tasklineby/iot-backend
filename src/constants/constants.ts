import { SchemaType, Schema } from '@google/generative-ai';
import { DetectorEntity } from 'src/detectors/entities/detector.entity';

export const GET_METRICS_ANALYTICS_PROMPT = `You are a powerful analytical model that analyzes sensor data in an enterprise. Your goal is to predict when a specific sensor may exceed permissible limits again or fail.  

Input Data Format:  
You receive an array of JSON objects containing historical sensor readings. Each object includes:  
- name (unique sensor identifier)  
- type (data type: temperature, humidity, noise level, gas concentration, etc.)  
- value (numerical reading)  
- unit (measurement unit)  
- timestamp (date and time of the reading)  
- maxValue (maximum allowed value)
- minValue (minimum allowed value)
- currentMetricsValue (current value of the sensor)

Your Tasks:  
1. Based on the provided data and time series analysis, predict when this sensor is likely to exceed the permissible limits again.  
2. Determine the probability of exceeding the limits in the next 7, 14, and 30 days.  
3. Assess the probability of sensor failure in the future.  
4. If possible, provide recommendations for failure prevention.  

Use trend analysis and time series forecasting to improve failure predictions.
Translate response text to Russian. Provide the response in JSON (but without the \`\`\`json ...\`\`\` wrapping).
`;

export const metricsAnalyticsSchema: Schema = {
  description:
    'Аналитика для предсказания превышений допустимых значений и риска отказа сенсора на основе исторических данных, с учётом допустимых пределов.',
  type: SchemaType.OBJECT,
  properties: {
    sensorAnalysis: {
      type: SchemaType.OBJECT,
      description:
        'Анализ сенсора на основе предоставленных данных, включая прогнозы превышений и рисков отказа.',
      properties: {
        predictions: {
          type: SchemaType.OBJECT,
          description:
            'Прогнозы превышений допустимых значений и риска отказа сенсора.',
          properties: {
            nextExceedance: {
              type: SchemaType.OBJECT,
              description:
                'Прогнозируемая дата, когда сенсор может снова превысить допустимые пределы.',
              properties: {
                date: {
                  type: SchemaType.STRING,
                  format: 'date-time',
                  description:
                    'Дата и время следующего предполагаемого превышения допустимых значений.',
                  nullable: false,
                },
                confidence: {
                  type: SchemaType.NUMBER,
                  description:
                    'Уровень уверенности в этом прогнозе (от 0 до 1).',
                  nullable: false,
                },
              },
              required: ['date', 'confidence'],
            },
            exceedanceProbabilities: {
              type: SchemaType.OBJECT,
              description:
                'Вероятности превышения допустимых значений в ближайшие 7, 14 и 30 дней.',
              properties: {
                '7_days': {
                  type: SchemaType.NUMBER,
                  description:
                    'Вероятность превышения в течение следующих 7 дней.',
                  nullable: false,
                },
                '14_days': {
                  type: SchemaType.NUMBER,
                  description:
                    'Вероятность превышения в течение следующих 14 дней.',
                  nullable: false,
                },
                '30_days': {
                  type: SchemaType.NUMBER,
                  description:
                    'Вероятность превышения в течение следующих 30 дней.',
                  nullable: false,
                },
              },
              required: ['7_days', '14_days', '30_days'],
            },
            failureRisk: {
              type: SchemaType.OBJECT,
              description:
                'Оценка риска отказа сенсора на основе текущих данных.',
              properties: {
                probability: {
                  type: SchemaType.NUMBER,
                  description:
                    'Оценка вероятности отказа сенсора в ближайшем будущем (от 0 до 1).',
                  nullable: false,
                },
                confidence: {
                  type: SchemaType.NUMBER,
                  description:
                    'Уровень уверенности в прогнозе отказа сенсора (от 0 до 1).',
                  nullable: false,
                },
                estimatedFailureDate: {
                  type: SchemaType.STRING,
                  format: 'date-time',
                  description:
                    'Ожидаемая дата отказа сенсора, если текущие тенденции сохранятся.',
                  nullable: true,
                },
              },
              required: ['probability', 'confidence'],
            },
          },
          required: [
            'nextExceedance',
            'exceedanceProbabilities',
            'failureRisk',
          ],
        },
        recommendations: {
          type: SchemaType.ARRAY,
          description:
            'Рекомендации по действиям для предотвращения отказа или превышения допустимых значений.',
          items: {
            type: SchemaType.OBJECT,
            properties: {
              action: {
                type: SchemaType.STRING,
                description:
                  "Рекомендуемое действие для предотвращения проблемы (например, 'Заменить сенсор', 'Калибровать сенсор').",
                nullable: false,
              },
              priority: {
                type: SchemaType.STRING,
                description: "Приоритет действия: 'high', 'medium', 'low'.",
                nullable: false,
              },
              reason: {
                type: SchemaType.STRING,
                description: 'Причина рекомендации данного действия.',
                nullable: false,
              },
            },
            required: ['action', 'priority', 'reason'],
          },
        },
      },
      required: ['predictions', 'recommendations'],
    },
  },
  required: ['sensorAnalysis'],
};

export interface MetricsAnalyticsParameters extends DetectorEntity {}

export interface CompanyMetricsParameters {
  parameters: MetricsAnalyticsParameters[];
}
