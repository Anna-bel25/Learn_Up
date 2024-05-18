export interface VideoListModel {
  page:       number;
  perPage:    number;
  totalPages: number;
  totalItems: number;
  items:      VideoModel[];
}

export interface VideoModel {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  titulo:         string;
  url:            string;
  descripcion:    string;
  materia_id:     number;
  materia:        string;
  nivel:          string;
}
