export interface MateriaListModel {
  page:       number;
  perPage:    number;
  totalPages: number;
  totalItems: number;
  items:      MateriaModel[];
}

export interface MateriaModel {
  id:             string;
  collectionId:   string;
  collectionName: string;
  created:        Date;
  updated:        Date;
  materia_id:     number;
  nombre:         string;
  imagen:         string;
  fecha:          Date;
  autor:          string;
  descripcion:    string;
  nivel_id:       number;
}
