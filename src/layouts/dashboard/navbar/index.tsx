import RestaurantDropdown from '@dash-lay/navbar/RestaurantDropdown'

const MainNavbar = () => {
  return (
    <div
      className="w-full h-[60px] min-h-[60px] bg-white border-b border-gray-100 flex justify-end items-center px-4">
      <div className="flex items-center gap-2">
        <RestaurantDropdown/>
      </div>
    </div>
  )
}

export default MainNavbar