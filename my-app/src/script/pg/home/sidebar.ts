import { SideBarItemProps } from "@/src/types";


export const updateSidebarItem = (
  items: SideBarItemProps[],
  id: string,
): SideBarItemProps[] => {
  return items.map(item => {
    if (item.id === id) {
      return { ...item, isOpened: !item.isOpened };
    }
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: updateSidebarItem(item.children, id),
      };
    }

    return item;
  });
}