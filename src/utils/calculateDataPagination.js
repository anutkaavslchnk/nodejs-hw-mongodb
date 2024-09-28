export const calculateDataPagination=(count, perPage, page)=>{
    const totalPages=Math.ceil(count/perPage);
    const hasNextPage=Boolean(totalPages-page);
    const hasPrevPage=page!==1;
    return{
      totalItems:count,
      totalPages,
        perPage,
         page,
         hasNextPage,
         hasPrevPage,
    }
}
