import { SideBarItemProps } from "@/src/types";


export const updateSidebarItem = (
  items: SideBarItemProps[],
  id: string,
): SideBarItemProps[] => {
  return items.map(item => {
    if (item.id === id) {
      return { ...item, isOpened: !item.isOpened };
    }
    if (item.childrenInfo && item.childrenInfo.length > 0) {
      return {
        ...item,
        childrenInfo: updateSidebarItem(item.childrenInfo, id),
      };
    }

    return item;
  });
}