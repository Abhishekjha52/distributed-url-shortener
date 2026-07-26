import api from "./api";
import { UrlResponse } from "../types/url";

export async function shortenUrl(originalUrl: string) {
  const response = await api.post<UrlResponse>("/urls", {
    originalUrl,
  });

  return response.data;
}

export async function getUrlDetails(shortCode: string) {
    const response = await api.get<UrlResponse>(
        `/urls/details/${shortCode}`
    );

    return response.data;
}