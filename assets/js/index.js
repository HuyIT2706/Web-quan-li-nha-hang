const handdleSearch = () =>{
    const headerSearch = document.getElementById("header__search");
    const headerSearchMobile = document.getElementById("header__search-mobile");
    if (headerSearch || headerSearchMobile) {
        headerSearch.classList.toggle('-filter');
        headerSearchMobile.classList.toggle('-filter');
    }
    
}
const handleFill = () => {
    const filter = document.getElementById("filter-ui");
    const filterMobile = document.getElementById("filter-ui-mb");
    if (filter || filterMobile) {
        filter.classList.toggle('active');
        filterMobile.classList.toggle('active');
    }
}