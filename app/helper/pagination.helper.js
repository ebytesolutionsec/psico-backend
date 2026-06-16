const paginationHelper = {

    paginate: async ( model, { page, limit, filter = {}, populate = [] }) => {
        const pageNumer = parseInt(page, 10)
        const limitNumer = parseInt(limit, 10)
        const skip = (pageNumer - 1) * limitNumer

        let query = model.find(filter).skip(skip).limit(limitNumer)

        /**
         * Aplicar populate
         */

        if(populate.length){
            populate.forEach( pop => {
                query = query.populate(pop)
            })
        }

        return {
            data,
            tolta,
            page: pageNumer,
            limit : limitNumer,
            totalPages : Math.ceil( total / limitNumer )
        }
    }
}

export default paginationHelper