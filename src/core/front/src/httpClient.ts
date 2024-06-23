import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return from(this.axiosInstance.get<T>(url, config)).pipe(
      map(response => response.data),
      catchError(error => { throw error; })
    );
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    return from(this.axiosInstance.post<T>(url, data, config)).pipe(
      map(response => response.data),
      catchError(error => { throw error; })
    );
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Observable<T> {
    return from(this.axiosInstance.put<T>(url, data, config)).pipe(
      map(response => response.data),
      catchError(error => { throw error; })
    );
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Observable<T> {
    return from(this.axiosInstance.delete<T>(url, config)).pipe(
      map(response => response.data),
      catchError(error => { throw error; })
    );
  }
}

export default HttpClient;
