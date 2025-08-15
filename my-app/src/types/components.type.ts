
export interface NavigationPropsItem {
    id: string,
    name: string,
}

export interface NavigationProps {
    items?: NavigationPropsItem[],
    selected?: string,
    onSelected?: (id: string) => void,
}

export interface VideoProps {
    address?: string,
}