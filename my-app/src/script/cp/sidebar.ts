import { sidebarStyle } from "@/src/style"
import { SideBarItemProps } from "@/src/types"

export const getStyle = (item: SideBarItemProps) => {
    let style: string = ''
    const key = item.id.charAt(3)
    if (key === '1') {
        style += sidebarStyle.item1
    } else if (key === '2') {
        style += sidebarStyle.item2
    } else if (key === '3') {
        style += sidebarStyle.item3
    }
    if (item.id === item.selected && !item.children) {
        style += sidebarStyle.selected
    }
    return style
}