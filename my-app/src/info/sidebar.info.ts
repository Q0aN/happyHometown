import { SideBarItemProps } from "../types";

export const sidebarItems:SideBarItemProps[] = [
    {
        id:'18010001',
        name:'菜单一',
        children:[
            {
                id:'18020101',
                name:'子菜单一',
            },
            {
                id:'18020102',
                name:'子菜单二',
                children:[
                    {
                        id:'18130201',
                        name:'孙菜单一'
                    }
                ]
            }
        ]
    },
    {
        id:'18010002',
        name:'菜单二'
    }
]