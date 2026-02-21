import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ConversionResult {
  from: string;
  to: string;
  rate: number;
  amount: number;
  result: number;
  timestamp: string;
  success: boolean;
  error?: string;
}

export async function convertCurrency(
  from: string,
  to: string,
  amount: number
): Promise<ConversionResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/convert`, {
      from_currency: from,
      to_currency: to,
      amount: amount
    });

    return {
      from: response.data.from_currency,
      to: response.data.to_currency,
      rate: response.data.exchange_rate,
      amount: response.data.amount,
      result: response.data.converted_amount,
      timestamp: response.data.timestamp,
      success: response.data.success,
      error: response.data.error
    };
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Failed to fetch exchange rate');
  }
}

export async function getSupportedCurrencies(): Promise<string[][]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/currencies`);
    return response.data.supported_codes || [];
  } catch (error: any) {
    console.error('Failed to fetch supported currencies:', error);
    return [];
  }
}
