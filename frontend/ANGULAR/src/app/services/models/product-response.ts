/* tslint:disable */
/* eslint-disable */
export interface ProductResponse {
  category?: 'ELETTRONICA' | 'FINANZE' | 'INVESTIMENTI' | 'ASSICURAZIONI' | 'IMMOBILIARE' | 'LAVORO' | 'ECOMMERCE' | 'SERVIZI' | 'STARTUP' | 'CONTABILITA' | 'VIAGGI' | 'SPORT' | 'FITNESS' | 'SALUTE' | 'BELLEZZA' | 'MODA' | 'ALIMENTAZIONE' | 'AUTOMOTIVE' | 'CASA' | 'GIOIELLI' | 'LIBRI' | 'MUSICA' | 'FILM' | 'ARTE' | 'MEDITAZIONE' | 'TERAPIA' | 'MOTIVAZIONE' | 'SVILUPPO_PERSONALE' | 'BENESSERE_MENTALE' | 'SCRITTURA' | 'APP' | 'GIOCHI_BAMBINI' | 'EDUCAZIONE' | 'FAMIGLIA' | 'VACANZE' | 'CASA_FAMIGLIA' | 'SALUTE_FAMIGLIA' | 'TEMPO_LIBERO' | 'CUCINA' | 'FESTE';
  description?: string;
  discount?: number;
  finalPrice?: number;
  id?: number;
  image_url?: string;
  link?: string;
  name?: string;
  price?: number;
}
