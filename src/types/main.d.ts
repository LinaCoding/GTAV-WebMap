
export interface IMarker {
    id: number,
    position: IPosition
    image: string
    data: IDataRow[]
}

export interface IPosition {
    x: number,
    y: number
}

export interface IDataRow {
    id: number, 
    name: string,
    type: string, 
    value: string
}

export interface IMenuProps {
    menu: string,
    setMenu: (args0: string) => void
}