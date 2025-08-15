const sidebarBase = 'w-64 bg-gray-50 p-4 border-r border-gray-200 shadow-sm'
const sidebarItemSelected = `
  bg-[linear-gradient(135deg,hsl(0,100%,80%),hsl(30,100%,90%),hsl(330,100%,90%))]
  animate-[hueRotate_15s_linear_infinite,flow_8s_ease_infinite]
`
const sidebarItemBase = 'rounded-md transition-all duration-300 ease-in-out mb-2 last:mb-0 hover:cursor-pointer select-none animate-gradientShift'
const sidebarItem1 = `
  bg-white hover:bg-blue-50 
  p-3 text-gray-800 hover:text-blue-700 
  border-l-4 border-transparent hover:border-blue-400 
  shadow-xs hover:shadow-sm
  transform hover:-translate-x-1
`
const sidebarItem2 = `
  bg-gray-50 hover:bg-gray-100 
  p-2.5 text-gray-700 hover:text-gray-900 
  border-l-2 border-transparent hover:border-gray-300
  transform hover:scale-[1.01]
`
const sidebarItem3 = `
  bg-transparent hover:bg-gray-200 
  p-2 text-gray-600 hover:text-gray-800 
  opacity-90 hover:opacity-100
`
export const sidebarStyle = {
  base: sidebarBase,
  item1: sidebarItem1 + sidebarItemBase,
  item2: sidebarItem2 + sidebarItemBase,
  item3: sidebarItem3 + sidebarItemBase,
  selected: sidebarItemSelected
}