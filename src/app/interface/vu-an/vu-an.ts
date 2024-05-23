export interface IVuAn {
  id: number,
  name: string,
  description: string
}

export interface IVuAnOff {
  id: number,
  name: string,
  description: string,
  rootId: number,
  documents: IDocuments[]
}

export interface IDocuments {
  name: string,
  id: number,
  type: string,
  url: string | null,
  parentDocumentId?: number | null
}
