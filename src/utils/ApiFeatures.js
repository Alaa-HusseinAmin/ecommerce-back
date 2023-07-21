export class ApiFeatures{

    constructor(mongooseQuery,queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    ///1- pagination===========
    pagination(req){
  let page = this.queryString.page * 1 || 1
  if(req.query.page <= 0) page = 1
  let skip = (page - 1) * 5
  this.page = page
  this.mongooseQuery.skip(skip).limit(5);
  return this;
    }
    
    ///2- fliter==============
    filter(req){
  let filterObj = {...this.queryString}
  let excludedQuery = ['page','sort','fields','keyword']
  excludedQuery.forEach((q)=>{
delete filterObj[q]
  }) 
  console.log(filterObj);
  filterObj = JSON.stringify(filterObj)
  filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`)
  filterObj = JSON.parse(filterObj)
  this.mongooseQuery.find(filterObj)
  return this;
    }

    ///3- sort================
    sort(req){
  if(this.queryString.sort){
    let sortedBy=this.queryString.sort.split(',').join(' ')
    this.mongooseQuery.sort(sortedBy)
  }
  return this;
    }
 
    ///4- search===============
    search(req){
  if(this.queryString.keyword){
    this.mongooseQuery.find(
        {$or:[
            {title:{$regex:this.queryString.keyword,$option:'i'}},
            {description:{$regex:this.queryString.keyword,$option:'i'}}
        ]
    })
  } 
  return this;
    }
 
     ///selected fields==================
    fields(req){
  if(this.queryString.fields){
    let fields=this.queryString.fields.split(',').join(' ')
    this.mongooseQuery.select(fields)
  }
  return this;
    }

 }