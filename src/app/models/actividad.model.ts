export interface ActividadListModel {
  page:       number;
  perPage:    number;
  totalPages: number;
  totalItems: number;
  items:      ActividadModel[];
}

export interface ActividadModel {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  titulo:         string;
  imagen_url:     string;
  url:            string;
  descripcion:    string;
  materia_id:     number;
  materia:        string;
  nivel:          string;
  pdf:            string;
}
