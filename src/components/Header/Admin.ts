const AdminHeader = {
    render: () => {
        return /* html */ `
            <div class="flex bg-[#00b0d7] justify-between items-center">
                <img class="w-[64px] p-2" src="/public/images/logo (1).png" alt="" /> <span class="inline-block ml-[-600px] text-white text-[18px]">Dashboard</span>
                <input class="h-[30px] pl-4 pr-20 rounded-md" type="text" placeholder="Tìm kiếm..."/>
                <a class="p-2 text-white text-xl" href="#">Xin chào, Nguyễn Xuân Phúc</a>
            </div>
        `
    }
}
export default AdminHeader;