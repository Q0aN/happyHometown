
export interface NavigationItemProps {
    id: string,
    name: string,
}

export interface NavigationProps {
    items?: NavigationItemProps[],
    selected?: string,
    onSelected?: (id: string) => void,
}

export interface VideoProps {
    address?: string,
}
export interface SideBarItemProps {
    id: string,
    name: string,
    isOpened?: boolean,
    childrenInfo?: SideBarItemProps[],
    onPress?: (id: string) => void,
    selected?: string
}
export interface SideBarProps {
    items?: SideBarItemProps[],
    onPress?: (id: string) => void,
    selected?: string,
    onSelected?: (id: string) => void,
}