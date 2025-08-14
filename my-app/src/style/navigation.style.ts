
const navigationBase = 'w-full flex pl-16 h-12 items-center'
const navigationItemBase = ' pl-2 pr-2 pt-3 h-full mr-2 ml-2 hover:cursor-pointer select-none '
const navigationItem = 'border-b-2 border-transparent hover:border-blue-500 transition-colors duration-300'
const navigationItemClicked = 'border-b-2 border-red-500 transition-colors duration-300'
const navigationDark = ' bg-black/70 text-white '

export const navigationStyle = {
    base: navigationBase,
    item: navigationItem + navigationItemBase,
    itemSelected: navigationItemClicked + navigationItemBase,
    dark: navigationDark,
}