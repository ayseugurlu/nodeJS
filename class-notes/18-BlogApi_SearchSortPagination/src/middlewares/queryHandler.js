'use strict'

module.exports=(req,res,next)=>{

     //* SEARCHING & FILTERING & SORTING  & PAGINATION

        // console.log('line101-->', req.query);
        // ^ Filtering:
        // URL?filter[fieldName1]=value1&filter[fieladName2]=value2
        const filter = req.query?.filter || {}
        // console.log((req.query))

        
        console.log('line108-->', req.query);
        //^ Searching:
        // URL?search[fieldName1]=value1&search[fieldName2]=value2
        // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        const search = req.query?.search || {}

        // { "<field>": { "$regex": "pattern" } }
        for (let key in search)
            search[key] = { $regex: search[key] } // assiging new value 
        //console.log(search[key])

        // console.log(search)

        //^ Sorting:
        //URL?sort[fieldName]=asc&sort[fieldName]=desc

        const sort = req.query?.sort || {}

        //^ Pagination:
        //& Limit:
        //let limit = Number(req.query?.limit) || 20  //tüm veriler bir kerede gitsin istemeyiz
        let limit = Number(req.query?.limit)  //yukardaki gibi yazinca rakam gelmezse veri NaN olmasin diye  böyle yazmak sadece number gelsine kisitlar
        limit = limit >0 ? limit : Number(process.env.PAGE_SIZE || 20)

        //& Page:
        let page = (req.query?.page)
        page = page >0 ? page : 1 

        //& Skip:

        let skip = Number(req.query?.skip)
        skip =skip > 0 ? skip : ((page -1) * limit )

        // console.log(skip);

        res.getModelList = async function(Model,populate=null){

            return  await Model.find({ ...filter, ...search }).sort(sort).limit(limit).skip(skip).populate(populate)
        }

        res.getModelListDetails = async (Model)=>{

            const data = Model.find({...filter,...search})

            const details = {
                filter,
                search,
                sort,
                skip,
                limit,
                page,
                totalRecord: data.length
            }

            return details
        }


        next()
}